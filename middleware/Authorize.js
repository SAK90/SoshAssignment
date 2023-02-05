const ResponseWrapper = require("../helpers/ResponseWrapper.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model.js");

const verifyToken = async (req, res, next) => {
  const accessToken = req.headers["authorization"];
  if (!accessToken) {
    return res
      .status(400)
      .json(
        ResponseWrapper(
          false,
          null,
          "You are not authorized to access this page"
        )
      );
  }
  let email = null;
  jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      return res
        .status(400)
        .json(
          ResponseWrapper(
            false,
            err,
            "You are not authorized to access this page"
          )
        );
    }
    req.user = user;
    email = user;
  });

  const user = await User.findOne({ Email: email });
  if (user) {
    if (user.Token === "sample-token") {
      return res
        .status(400)
        .json(
          ResponseWrapper(
            false,
            null,
            "You are not authorized to access this page"
          )
        );
    }
  }
  next();
};

module.exports = verifyToken;
