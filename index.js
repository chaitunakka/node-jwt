const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Welcome"
  });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secret", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post saved",
        authData
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // get fields from ui and fetch from DB
  const user = {
    id: 1,
    name: "chaitu",
    email: "mail@email.com"
  };

  jwt.sign({ user }, "secret", { expiresIn: "30m" }, (err, token) => {
    res.json({ token });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader != "undefined") {
    const bearer = bearerHeader.split(" ")[1];
    req.token = bearer;
    // call next middleware
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(5000, () => console.log("Server started on port 5000"));
