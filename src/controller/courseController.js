const courseModel = require("../model/courseModel");
const { StatusCodes } = require("http-status-codes");


const createNew = async (req, res) => {
  try {
    const newCourse = req.body;
    await courseModel.createNew(newCourse);
    res.status(StatusCodes.CREATED).json(newCourse);
  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({error: error.message});
  }
}

const getCourses = async (req, res) => {
  try {
    
    const courses = await courseModel.getCourses()
    res.status(StatusCodes.OK).json(courses)

  } catch (error) {
    res.status(StatusCodes.NOT_ACCEPTABLE).json({error: error.message});
  }
}

const courseController = {
  createNew,
  getCourses
}

module.exports = courseController;