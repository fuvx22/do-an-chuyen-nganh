const jwt = require("jsonwebtoken");
const env = require("../config/environment");
const md5 = require("md5");
const hashSecretKey = md5(env.SECRET_KEY);
module.exports = {
  verifyToken: async (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Unauthorized " });
      return;
    }
    try {
      const decoded = jwt.verify(token, hashSecretKey, (err, payload) => {
        req.payload = payload;
        next();
      });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};
