const courseScheduleModel = require("../model/courseScheduleModel");
const { StatusCodes } = require("http-status-codes");

const createNewCourseSchedule = async (req, res) => {
  try {
    const newCourseSchedule = req.body;
    const createdCourseSchedule = await courseScheduleModel.createNewCourseSchedule(newCourseSchedule);
    res.status(StatusCodes.CREATED).json(createdCourseSchedule);
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

const getCourseSchedules = async (req, res) => {
  try {
    const courseSchedules = await courseScheduleModel.getCourseSchedule();
    res.status(StatusCodes.OK).json(courseSchedules);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const editCourseSchedule = async (req, res) => {
  try {
    const courseScheduleToEdit = req.body;
    const editedCourseSchedule = await courseScheduleModel.editCourseSchedule(courseScheduleToEdit);
    res.status(StatusCodes.OK).json(editedCourseSchedule);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteCourseSchedule = async (req, res) => {
  try {
    const courseScheduleToDetele = req.body;
    console.log(req.body);
    const result = await courseScheduleModel.deleteCourseSchedule(courseScheduleToDetele);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const courseScheduleController = {
    createNewCourseSchedule,
    getCourseSchedules,
    editCourseSchedule,
    deleteCourseSchedule
};

module.exports = courseScheduleController;
