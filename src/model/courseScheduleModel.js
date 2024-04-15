const Joi = require("joi");
const { ObjectId } = require("mongodb");
const { GET_DB } = require("../config/mongodb");
const { OBJECT_ID_RULES, OBJECT_ID_MESSAGE } = require("../utils/validators");
const COURSE_SCHEDULE_COLLECTION_NAME = "courseSchedule"

const COURSE_SCHEDULE_SCHEMA = Joi.object({
    courseId: Joi.string().required().min(6).max(6).pattern(/^[0-9]{6}$/).trim().strict(),
    instructorId: Joi.string().required().min(5).max(10).trim().strict(),
    semesterId: Joi.string().required().min(5).max(5).trim().strict(),
    dayOfWeek: Joi.string().required().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'),
    periods: Joi.array().items(Joi.number().integer().min(1).max(10)).min(1).max(10).unique().required(), // Lưu số tiết học trong một ngày dưới dạng mảng
    group: Joi.string().min(2).max(2).required(),
    roomNumber: Joi.string().required().min(3).max(15),
    maxQuantity: Joi.number().required().min(1).max(100).integer(),
    createAt: Joi.date().timestamp('javascript').default(Date.now)
})

const findOneById = async (id) => {
    try {
        const courseSchedule = await GET_DB()
            .collection(COURSE_SCHEDULE_COLLECTION_NAME)
            .findOne({_id: new ObjectId(id)});
        return courseSchedule;
    } catch (error) {
        throw new Error(error)
    }
}

const createNewCourseSchedule = async (data) => {
    try {
        const validData = await COURSE_SCHEDULE_SCHEMA.validateAsync(data, {
            abortEarly: false,
        });
        const createdCourseSchedule = await GET_DB()
            .collection(COURSE_SCHEDULE_COLLECTION_NAME)
            .insertOne(validData);

        const getNewCourseSchedule = await findOneById(createdCourseSchedule.insertedId)
        return getNewCourseSchedule;
    } catch (error) {
        throw new Error(error);
    }
}


const getCourseSchedule = async () => {
    try {
        return await GET_DB().collection(COURSE_SCHEDULE_COLLECTION_NAME).find().toArray();
    } catch (error) {
        throw new Error(error);
    }
}

const editCourseSchedule = async (data) => {
    try {
        const { _id, creatAt, ...rest} = data;
        const validData = await COURSE_SCHEDULE_SCHEMA.validateAsync(rest, { abortEarly: false });
        const result = await GET_DB().collection(COURSE_SCHEDULE_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(_id)},
            { $set: validData },
            { returnDocument: "after"}
        );
        return result
    } catch (error) {
        throw new Error(error);
    }
}


const deleteCourseSchedule = async (courseScheduleToDelete) => {
    try{
        const result = await GET_DB().collection(COURSE_SCHEDULE_COLLECTION_NAME).deleteOne(
            { _id: new ObjectId(courseScheduleToDelete._id)},
        )
        return result
    } catch (error) {
        throw new Error(error)
    }
}



const courseScheduleModel = {
    createNewCourseSchedule,
    getCourseSchedule,
    editCourseSchedule,
    deleteCourseSchedule
}

module.exports = courseScheduleModel