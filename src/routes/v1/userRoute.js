const { StatusCodes } = require("http-status-codes");
var jwt = require("jsonwebtoken");
const {
  createNewUser,
  loginUser,
  getUserById,
} = require("../../controller/userController");
const { verifyToken } = require("../../middlewares/verifyAccesToken");
var express = require("express");

const userRouter = express.Router();

userRouter.route("/").post(createNewUser);

userRouter.route("/login").post(loginUser);
userRouter.route("/userBoard").get(verifyToken, getUserById);
module.exports = {
  userRouter,
};
