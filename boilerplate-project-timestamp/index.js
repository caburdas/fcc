// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", (req, res) => {
  //console.log("--------------------");
  //console.log(req.params.date);
  if (req.params.date === undefined || req.params.date === "") {
    //empty
    const date = new Date(Date.now());
    const mseconds = Date.now();
    const ret = { unix: mseconds, utc: date.toUTCString() };
    //console.log(ret);
    return res.json(ret);
  }
  let msecondsDate = null;
  if (isNaN(req.params.date)) {
    msecondsDate = new Date(req.params.date);
  } else {
    const mseconds = parseInt(req.params.date, 10);
    msecondsDate = new Date(mseconds);
  }

  //console.log(msecondsDate);
  if (isNaN(msecondsDate)) {
    //invalid
    const ret = { error: "Invalid Date" };
    //console.log(ret);
    return res.json(ret);
  }
  const ret = {
    unix: msecondsDate.getTime(),
    utc: msecondsDate.toUTCString(),
  };
  //console.log(ret);
  res.json(ret);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
