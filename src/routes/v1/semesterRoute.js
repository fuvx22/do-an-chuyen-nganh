var express = require("express")
const { StatusCodes } = require("http-status-codes")
const semesterController = require("../../controller/semesterController")
const { verifyToken } = require("../../middlewares/verifyAccesToken")
const semesterRouter = express.Router()


semesterRouter
    .route("/")
    .post(verifyToken, semesterController.createSemester)
    .get(verifyToken, semesterController.getSemester)

semesterRouter.route("/edit")
    .put((req, res) => semesterController.editSemester(req, res))

semesterRouter.route("/delete")
    .delete((req, res) => semesterController.deleteSemester(req, res))

module.exports = {
    semesterRouter,
};