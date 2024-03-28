var express = require("express");
const { StatusCodes } = require("http-status-codes");
const courseController = require("../../controller/courseController");
const { verifyToken } = require("../../middlewares/verifyAccesToken");
const courseRouter = express.Router();

courseRouter
  .route("/")
  .post(verifyToken, courseController.createNew)
  .get(verifyToken, courseController.getCourses);

module.exports = {
  courseRouter,
};
