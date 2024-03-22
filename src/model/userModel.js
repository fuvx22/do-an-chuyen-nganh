const Joi = require("joi");
const { GET_DB } = require("../config/mongodb");
const { OBJECT_ID_RULES, OBJECT_ID_MESSAGE } = require("../utils/validators");
const USER_COLLECTION_NAME = "user";
const USER_SCHEMA = Joi.object({
  userId: Joi.string().required().min(5).max(10).trim().strict(),
  name: Joi.string().required().min(5).max(30).trim().strict(),
  image: Joi.string().required().min(5).max(50).trim().strict(),
  password: Joi.string().required().min(10).trim().strict(),
  phoneNumber: Joi.string().required().min(10).max(10).trim().strict(),
  ethnic: Joi.string().default("Kinh").trim().strict(),
  religion: Joi.string().default("Không").trim().strict(),
  address: Joi.string().required().trim().min(5).strict(),
  class: Joi.string().required().trim().min(5).strict(),
  majorId: Joi.string().pattern(OBJECT_ID_RULES).message(OBJECT_ID_MESSAGE),
  specializedMajor: Joi.string().required().min(5).trim().strict(),
  academicYear: Joi.string()
    .required()
    .min(9)
    .trim()
    .strict()
    .message("Sai định dạng niên khóa!"),
});

const createNew = async (data) => {
  try {
    const validData = await USER_SCHEMA.validateAsync(data, {
      abortEarly: false,
    });
    const createdUser = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .insertOne(validData);
    return createdUser;
  } catch (error) {
    throw new Error(error);
  }
};
const findUserById = async (userId) => {
  try {
    const userID = await GET_DB()
      .collection(USER_COLLECTION_NAME)
      .findOne({ userId: userId });
    return userID;
  } catch {
    throw new Error("Invalid UserId");
  }
};

module.exports = {
  createNew,
  findUserById,
};
