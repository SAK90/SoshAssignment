const User = require("../models/User.model.js");
const jwt = require("jsonwebtoken");
const ResponseWrapper = require("../helpers/ResponseWrapper.js");

module.exports = {
  Register: async (req, res, next) => {
    try {
      const Name = req.body.Name;
      const Email = req.body.Email;
      const Password = req.body.Password;
      const alreadyExists = await User.findOne({ Email: Email });
      if (alreadyExists) {
        return res
          .status(400)
          .json(
            ResponseWrapper(
              false,
              null,
              "User with given email already exists."
            )
          );
      }
      const user = new User({
        Name: Name,
        Email: Email,
        Password: Password,
        Blogs: [],
        Token: "sample-token",
      });
      const savedUser = await user.save();
      res
        .status(200)
        .json(ResponseWrapper(true, savedUser, "User sucessfully registered."));
    } catch (err) {
      next(err);
    }
  },
  Login: async (req, res, next) => {
    try {
      const Email = req.body.Email;
      const Password = req.body.Password;
      const findUser = await User.findOne({ Email: Email });
      if (!findUser) {
        return res
          .status(400)
          .json(
            ResponseWrapper(false, null, "User with given Email does not exist")
          );
      }
      if (findUser.Password !== Password) {
        return res
          .status(400)
          .json(ResponseWrapper(false, null, "Incorrect password"));
      }
      const accessToken = jwt.sign(Email, process.env.SECRET_KEY);
      await User.findOneAndUpdate({ Email: Email }, { Token: accessToken });
      console.log("here1");
      res
        .status(200)
        .json(
          ResponseWrapper(true, accessToken, "User sucessfully logged in.")
        );
    } catch (err) {
      next(err);
    }
  },

  Logout: async (req, res, next) => {
    try {
      await User.findOneAndUpdate(
        { Email: req.user },
        { Token: "sample-token" }
      );
      res
        .status(200)
        .json(ResponseWrapper(true, null, "User sucessfully logged out."));
    } catch (err) {
      next(err);
    }
  },
};
