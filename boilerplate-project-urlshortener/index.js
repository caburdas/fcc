require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const dns = require("node:dns");
const { url } = require("node:inspector");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

const short_url_list = {};
let index = 0;
app.post("/api/shorturl", (req, res) => {
  if (
    req.body === undefined ||
    req.body === "" ||
    req.body.url === undefined ||
    req.body.url === ""
  ) {
    return res.status(404);
  }
  let urlOk = URL.canParse(req.body.url);
  if (urlOk === false) {
    return res.json({ error: "invalid url" });
  }

  let url = new URL(req.body.url);
  if (url.protocol !== "http:") {
    return res.json({ error: "invalid url" });
  }
  let i = index++;
  short_url_list[i] = req.body.url;
  const ret = {
    original_url: req.body.url,
    short_url: i,
  };
  //console.log(ret);
  res.json(ret);
});
app.get("/api/shorturl/:short_url", (req, res) => {
  if (req.params.short_url === undefined || req.params.short_url === "") {
    return res.json({ error: "invalid url" });
  }

  let ret = short_url_list[req.params.short_url];
  console.log(ret);
  if (ret === undefined) {
    return res.json({ error: "invalid url" });
  }
  res.redirect(ret);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
