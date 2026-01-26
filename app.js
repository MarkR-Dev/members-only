const express = require("express");
const path = require("path");

const app = express();

// ** TODO: Router imports here **

// Configure ejs for express
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Serving static files
app.use(express.static(path.join(__dirname, "public")));

// Parses form data sent from the client into req.body
app.use(express.urlencoded({ extended: true }));

// ** TODO: Passport config import here?

// ** TODO: Routers here ** app.use("/", indexRouter) etc etc

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

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
