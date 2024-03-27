var express = require("express");
const { StatusCodes } = require('http-status-codes')
const courseController = require("../../controller/courseController")

const courseRouter = express.Router()

courseRouter.route("/")
  .post(courseController.createNew)
  .get(courseController.getCourses)

courseRouter.route("/edit")
  .put( (req,res) => courseController.editCourse(req,res))

courseRouter.route("/delete")
  .delete( (req,res) => courseController.deleteCourse(req,res))

module.exports = {
  courseRouter
}