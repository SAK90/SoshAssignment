const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(cors());
require("./helpers/initMongoDB.js");
const AuthRoute = require("./routes/User.routes.js");
app.use("/api/user", AuthRoute);
const BlogRoute = require("./routes/Blog.routes.js");
app.use("/api/blog", BlogRoute);
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
module.exports = server;
