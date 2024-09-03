let express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

let app = express();
//const parser = bodyParser.urlencoded({ extended: false });

app.use((req, res, next) => {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
});
app.use("/public", express.static(__dirname + "/public"));

app.get(
  "/now",
  (req, res, next) => {
    req.time = Date.now();
    console.log(req.time);
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);

app.get("/json", (req, res) => {
  let obj = { message: "Hello json" };
  let style = process.env.MESSAGE_STYLE || "";

  if (style !== "" && style.toLowerCase() === "uppercase") {
    obj.message = obj.message.toUpperCase();
  }
  res.json(obj);
});

app.get("/", (req, resp) => {
  let file = __dirname + "/views/index.html";
  resp.sendFile(file);
});

app.get("/:word/echo", (req, res) => {
  res.json({ echo: req.params.word });
});

app.get("/name", (req, res) => {
  // /name/?first=firstname&last=lastname
  res.json({ name: `${req.query.first} ${req.query.last}` });
});

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/name", (req, res) => {
  res.json({ name: `${req.body.first} ${req.body.last}` });
});
module.exports = app;
