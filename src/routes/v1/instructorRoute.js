const express = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  createNewInstructor,
  getInstructor,
} = require("../../controller/instructorController");
const { verifyToken } = require("../../middlewares/verifyAccesToken");
const instructorRouter = express.Router();
instructorRouter
  .route("/")
  .post(verifyToken, createNewInstructor)
  .get(verifyToken, getInstructor);

module.exports = {
  instructorRouter,
};
