const { StatusCodes } = require("http-status-codes");
var jwt = require("jsonwebtoken");
const { createNewUser, loginUser } = require("../../controller/userController");
var express = require("express");

const userRouter = express.Router();

userRouter.route("/").post(createNewUser);

userRouter.route("/login").post(loginUser);
// userRouter.route("/login").post(async (req, res) => {
//   const users = [
//     {
//       userId: "admin",
//       password: "123456",
//     },
//     {
//       userId: "user",
//       password: "password",
//     },
//   ];

//   // Tìm kiếm user trong database
//   const user = users.find((u) => u.userId === userId);

//   // Kiểm tra mật khẩu
//   if (!user || user.password != password) {
//     res
//       .status(StatusCodes.UNAUTHORIZED)
//       .send({ message: "Sai tên đăng nhập hoặc mật khẩu!" });
//     return;
//   }

//   const token = jwt.sign({ userId }, "secret", { expiresIn: "1h" });

//   res
//     .status(StatusCodes.OK)
//     .json({ token: token, message: "Đăng nhập thành công" });
// });

module.exports = {
  userRouter,
};
