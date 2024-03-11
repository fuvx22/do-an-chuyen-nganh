const { StatusCodes } = require('http-status-codes');
var jwt = require('jsonwebtoken');
const { createNew } = require('../../model/userModel');

var express = require('express');

const userRouter =  express.Router();

userRouter.route('/')
  .get( async (req, res) => {
    try {

      const newUser = await createNew(req.body);
      res.status(200).json(newUser)

    } catch (error) {
      res.status(500).json({error: error.message})
    }
  })

userRouter.route('/login')
  .post( async (req, res) => {

    const users = [
    {
      userId: "admin",
      password: "123456",
    },
    {
      userId: "user",
      password: "password",
    },
  ];

    const { userId, password } = req.body;

    // Tìm kiếm user trong database
    const user = users.find(u => u.userId === userId);

    // Kiểm tra mật khẩu
    if (!user || user.password != password) {
      res.status(StatusCodes.UNAUTHORIZED).send({ message: "Sai tên đăng nhập hoặc mật khẩu!" });
      return;
    }

    const token = jwt.sign({ userId }, "secret", { expiresIn: "1h" });  

    res.status(StatusCodes.OK).json({token: token, message: "Đăng nhập thành công"})  
  })

module.exports = {
  userRouter
}

