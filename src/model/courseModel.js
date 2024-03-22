const Joi = require("joi");
const { ObjectId } = require("mongodb");
const { GET_DB } = require("../config/mongodb");
const { OBJECT_ID_RULES, OBJECT_ID_MESSAGE } = require("../utils/validators");
const COURSE_COLLECTION_NAME = "course";

const USER_SCHEMA = Joi.object({
  courseId: Joi.string().required().min(6).max(6).pattern(/^[0-9]{6}$/).trim().strict(),
  name: Joi.string().required().min(3).max(50).trim().strict(),
  courseCredits: Joi.number().integer().min(1).max(10),
  preRequireCourse: Joi.string().required().min(6).max(6).allow("no"),
  majorId: Joi.string().required().pattern(OBJECT_ID_RULES).message(OBJECT_ID_MESSAGE),
  createAt: Joi.date().timestamp('javascript').default(Date.now)
})

const findOneById = async (id) => {
  try {
    const course = await GET_DB()
      .collection(COURSE_COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });
    return course;
  } catch (error) {
    throw new Error(error);
  }
};

const createNew = async (data) => {
  try {
    const validData = await USER_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
    const createdCourse = await GET_DB()
      .collection(COURSE_COLLECTION_NAME)
      .insertOne(validData);
    const getNewCourse = await findOneById(createdCourse.insertedId)
    return getNewCourse;
  } catch (error) {
    throw new Error(error);
  }
}

const getCourses = async () => {
  try {

    return await GET_DB().collection(COURSE_COLLECTION_NAME).find().toArray();
    
  } catch (error) {
    throw new Error(error);
  }
}

const courseModel = {
  createNew,
  getCourses
}

module.exports = courseModel