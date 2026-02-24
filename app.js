const path = require("path");
const express = require("express");
const pool = require("./db/pool");
require("dotenv").config();

// Authentication/Session imports
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
require("./config/passportConfig");

const app = express();
const indexRouter = require("./routes/indexRouter");
const messageRouter = require("./routes/messageRouter");

// Configure ejs for express
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Parses form data sent from the client into req.body
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    store: new pgSession({ pool: pool }),
    secret: process.env.MEMBERS_ONLY_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // Set this to persist the cookie in the browser for 1 day, even if the browser or app is shut down
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24,
    // },
  }),
);
app.use(passport.session());

// Middleware to set the currently logged in user to res.locals to avoid having to pass the user into every controller/route/view
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes
app.use("/", indexRouter);
app.use("/message", messageRouter);

// Route to catch all paths that don't exist
app.use("/{*splat}", (req, res) => {
  res
    .status(404)
    .render("error", { title: "Members Only | Error", statusCode: 404 });
});

// Error handler middleware to catch errors throughout the app or from previous middleware function if using next(err)
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res
    .status(statusCode)
    .render("error", { title: "Members Only | Error", statusCode: statusCode });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log(`Server running on port: ${PORT}`);
});
