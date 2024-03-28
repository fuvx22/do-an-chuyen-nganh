const bcryptjs = require("bcryptjs");
const env = require("../config/environment");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const md5 = require("md5");
const hashSecretKey = md5(env.SECRET_KEY);
const { createNew, findUserById } = require("../model/userModel");
module.exports = {
  createNewUser: async (req, res) => {
    try {
      const { password, ...userData } = req.body;
      const hashPassword = await bcryptjs.hash(password, saltRounds);
      const newUser = {
        ...userData,
        password: hashPassword,
      };
      const registerUser = await createNew(newUser);
      res.status(200).json(registerUser);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { userId, password } = req.body;
      const user = await findUserById(userId);

      if (!user) {
        res.status(401).json({ error: "Mã Số Sinh viên không tồn tại" });
        return;
      }
      const isPasswordMatch = await bcryptjs.compare(password, user.password);
      if (!isPasswordMatch) {
        res.status(401).json({ error: "Sai Mật Khẩu" });
      } else {
        const userJTW = {
          userId: user.userId,
          name: user.name,
          email: user.phone,
        };

        const accessToken = await jwt.sign(userJTW, hashSecretKey);
        res.status(200).send({ accessToken: accessToken });
      }
    } catch {}
  },
  getUserById: async (req, res, next) => {
    try {
      const { userId } = req.payload;
      const user = await findUserById(userId);
      if (user) {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};
