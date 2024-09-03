const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

const exercise_list = {};
const user_list = {};
let index = 0;
app.post("/api/users", (req, res) => {
  //
  if (
    req.body === undefined ||
    req.body === "" ||
    req.body.username === undefined ||
    req.body.username === ""
  ) {
    res.status(404);
  }
  const id = (index++).toString();
  user_list[id] = req.body.username;
  ret = { username: req.body.username, _id: id };
  res.json(ret);
});

app.get("/api/users", (req, res) => {
  let arr = [];
  for (const [key, value] of Object.entries(user_list)) {
    arr.push({ _id: key, username: value });
  }
  res.json(arr);
});

app.post("/api/users/:_id/exercises", (req, res) => {
  if (
    req.body === undefined ||
    req.body === "" ||
    user_list[req.params._id] === undefined
  ) {
    console.log("error2");
    res.status(404);
  }
  const date = req.body.date
    ? new Date(req.body.date).toDateString()
    : new Date().toDateString();
  const obj = {
    description: req.body.description,
    duration: parseInt(req.body.duration),
    date: date,
  };
  if (exercise_list[req.params._id] === undefined) {
    exercise_list[req.params._id] = [];
  }
  exercise_list[req.params._id].push(obj);
  const ret = {
    _id: req.params._id,
    username: user_list[req.params._id],
    ...obj,
  };

  res.json(ret);
});

app.get("/api/users/:_id/logs", (req, res) => {
  if (user_list[req.params._id] === undefined) {
    return res.status(404);
  }
  let arr = [];
  if (req.query.from !== undefined && req.query.to !== undefined) {
    const from = new Date(req.query.from).getTime();
    const to = new Date(req.query.to).getTime();
    for (let i = 0; i < exercise_list[req.params._id].length; i++) {
      const date = new Date(exercise_list[req.params._id][i].date).getTime();
      if (date > from && date < to) {
        arr.push(exercise_list[req.params._id][i]);
      }
    }
  } else if (req.query.from !== undefined) {
    const from = new Date(req.query.from).getTime();
    for (let i = 0; i < exercise_list[req.params._id].length; i++) {
      const date = new Date(exercise_list[req.params._id][i].date).getTime();
      if (date > from) {
        arr.push(exercise_list[req.params._id][i]);
      }
    }
  } else if (req.query.to !== undefined) {
    const to = new Date(req.query.to).getTime();
    for (let i = 0; i < exercise_list[req.params._id].length; i++) {
      const date = new Date(exercise_list[req.params._id][i].date).getTime();
      if (date < to) {
        arr.push(exercise_list[req.params._id][i]);
      }
    }
  } else {
    arr = [...exercise_list[req.params._id]];
  }

  if (req.query.limit !== undefined) {
    const limit = parseInt(req.query.limit);
    if (limit < arr.length) {
      for (let i = 0; i < arr.length - limit; i++) {
        arr.pop();
      }
    }
  }
  const ret = {
    username: user_list[req.params._id],
    count: arr.length,
    _id: req.params._id,
    log: arr,
  };
  res.json(ret);
});
const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
