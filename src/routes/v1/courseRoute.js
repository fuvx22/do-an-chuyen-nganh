var express = require("express");
const { StatusCodes } = require('http-status-codes')
const courseController = require("../../controller/courseController")

const courseRouter = express.Router()

courseRouter.route("/")
  .post(courseController.createNew)
  .get(courseController.getCourses)

module.exports = {
  courseRouter
}