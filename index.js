require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const MONGODB_URL = process.env.MONGODB_URI;

const path = require("path");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const { connectDB } = require("./connection");
const debug = require("debug")("dev:server");
const cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
  redirectIfAuthenticated,
  authenticatedUserOnly,
} = require("./middlewares/authentication");
const { userLogoutHandler } = require("./controllers/user");
const { viewBlogHandler } = require("./controllers/blog");

// connecting to the database
connectDB(MONGODB_URL);

// setup middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(checkForAuthenticationCookie("token"));

// setup view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.get("/view/blog/:ID", viewBlogHandler);
app.use("/user", redirectIfAuthenticated, userRouter);
app.use("/blog", authenticatedUserOnly, blogRouter);
app.get("/logout", userLogoutHandler);

app.listen(PORT, () => {
  debug(`Server: http://${HOST}:${PORT}`);
});
