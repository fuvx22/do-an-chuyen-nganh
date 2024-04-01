const { AddInstructor, getInstructor } = require("../model/instructorModel");
const { StatusCodes } = require("http-status-codes");
module.exports = {
  createNewInstructor: async (req, res, next) => {
    try {
      const instructorBody = req.body;
      const createInstructor = await AddInstructor(instructorBody);
      res.status(StatusCodes.CREATED).json(createInstructor);
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  },
  getInstructor: async (req, res, next) => {
    try {
      const instructor = await getInstructor();
      res.status(StatusCodes.OK).json(instructor);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  },
};
