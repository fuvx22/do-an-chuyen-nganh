const Joi = require("joi");
const { ObjectId } = require("mongodb");
const { GET_DB } = require("../config/mongodb");
const { OBJECT_ID_RULES, OBJECT_ID_MESSAGE } = require("../utils/validators");
const COURSE_REGIS_COLLECTION_NAME = "courseRegis";

const COURSE_REGIS_SCHEMA = Joi.object({
  courseScheduleId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULES)
    .message(OBJECT_ID_MESSAGE)
    .trim()
    .strict(),
  userId: Joi.string()
    .required()
    .pattern(OBJECT_ID_RULES)
    .message(OBJECT_ID_MESSAGE)
    .trim()
    .strict(),
  createAt: Joi.date().timestamp("javascript").default(Date.now),
});

const findOneById = async (id) => {
  try {
    return await GET_DB()
      .collection(COURSE_REGIS_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
  } catch (error) {
    throw new Error(error);
  }
};

const createNewCourseRegis = async (data) => {
  try {
    const validData = await COURSE_REGIS_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });

    // check if courseScheduleId maxQuantity > 0
    const courseSchedule = await GET_DB()
      .collection("courseSchedule")
      .findOne({ _id: new ObjectId(validData.courseScheduleId) });

    if (courseSchedule.maxQuantity <= 0) {
      throw new Error("Course is full");
    }

    const createdCourseRegis = await GET_DB()
      .collection(COURSE_REGIS_COLLECTION_NAME)
      .insertOne(validData);

    await GET_DB()
      .collection("courseSchedule")
      .updateOne(
        { _id: new ObjectId(validData.courseScheduleId) },
        { $inc: { maxQuantity: -1 } }
      );

    const getNewCourseRegis = await findOneById(createdCourseRegis.insertedId);
    return getNewCourseRegis;
  } catch (error) {
    throw new Error(error);
  }
};

const getCourseRegisByUserId = async (userId) => {
  try {
    let result = await GET_DB()
      .collection(COURSE_REGIS_COLLECTION_NAME)
      .aggregate([
        { $match: { userId: userId } },
        { $set: { courseScheduleId: { $toObjectId: "$courseScheduleId" } } },
        {
          $lookup: {
            from: "courseSchedule",
            localField: "courseScheduleId",
            foreignField: "_id",
            as: "courseSchedule",
          },
        },
        {
          $unwind: {
            path: "$courseSchedule",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $set: {
            "courseSchedule.courseId": {
              $toObjectId: "$courseSchedule.courseId",
            },
          },
        },
        {
          $lookup: {
            from: "course",
            localField: "courseSchedule.courseId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: {
            path: "$course",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $set: {
            "courseSchedule.instructorId": {
              $toObjectId: "$courseSchedule.instructorId",
            },
          },
        },
        {
          $lookup: {
            from: "instructor",
            localField: "courseSchedule.instructorId",
            foreignField: "_id",
            as: "instructor",
          },
        },
        {
          $unwind: {
            path: "$instructor",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            _id: 1,
            createAt: 1,
            courseSchedule: 1,
            course: 1,
            "instructor.name": 1,
          },
        },
      ])
      .toArray();

    result = result.map((item) => {
      return {
        _id: item.courseSchedule._id,
        courseRegisId: item._id,
        createAt: item.createAt,
        dayOfWeek: item.courseSchedule.dayOfWeek,
        group: item.courseSchedule.group,
        period: item.courseSchedule.period,
        roomNumber: item.courseSchedule.roomNumber,
        semesterId: item.courseSchedule.semesterId,
        course: item.course,
        instructor: item.instructor,
      };
    });

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const deleteCourseRegis = async (courseRegisToDelete) => {
  try {
    const result = await GET_DB()
      .collection(COURSE_REGIS_COLLECTION_NAME)
      .deleteOne({ _id: new ObjectId(courseRegisToDelete._id) });

    await GET_DB()
      .collection("courseSchedule")
      .updateOne(
        { _id: new ObjectId(courseRegisToDelete.courseScheduleId) },
        { $inc: { maxQuantity: +1 } }
      );

    return result;
  } catch (error) {
    throw new Error(error);
  }
};

const courseRegisModel = {
  createNewCourseRegis,
  getCourseRegisByUserId,
  deleteCourseRegis,
};

module.exports = courseRegisModel;
