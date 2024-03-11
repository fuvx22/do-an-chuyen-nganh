const Joi = require('joi');
const { GET_DB } = require('../config/mongodb');

const USER_COLLECTION_NAME = 'user';
const USER_SCHEMA = Joi.object({
    username: Joi.string().required().min(5).max(20).trim().strict(),
    password: Joi.string().required().min(10).max(30).trim().strict()
})

const createNew = async (data) =>{
  try {

    const validData = await USER_SCHEMA.validateAsync(data, { abortEarly:false });
    const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData);
    return createdUser;

  } catch (error) { throw new Error(error) }
}

module.exports = {
  createNew
}
