const express = require("express");
const courseRegisController = require("../../controller/courseRegisController");
const { verifyToken } = require("../../middlewares/verifyAccesToken");

const courseRegisRouter = express.Router();

courseRegisRouter.use(verifyToken);

courseRegisRouter
  .route("/")
  .post(courseRegisController.createNewCourseRegis)
  .delete(courseRegisController.deleteCourseRegis);
courseRegisRouter
  .route("/:userId")
  .get(courseRegisController.getCourseRegisByUserId);
courseRegisRouter
  .route("/time/:userId/:semesterId")
  .get(courseRegisController.getTimeSchedule);

module.exports = {
  courseRegisRouter,
};
