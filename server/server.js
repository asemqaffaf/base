const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const DB = require("./db");
const app = express();

app.use(express.json());
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json(`SERVER ON`);
});

//---------------------------------------------------show--------------------------------------
app.get("/data", (req, res) => {
  DB.getRepos(data => {
    res.json(data);
  });
});

//--------------------------------------------Add--------------------------------------------------

app.post("/add", (req, res) => {
  console.log("REQ.BODY", req.body);
  let box = req.body;
  DB.addData(todo => {
    res.json(todo);
  }, box);
});

//--------------------------------------------------DELETE------------------------------------

app.delete("/delete/:id", (req, res) => {
  console.log("array.params", req.params);
  console.log("array.params", req.params.id);

  DB.remove(result => {
    res.json(result);
  }, req.params.id);
});
//------------------------------------------Edit------------------
app.put("/edit/:id", (req, res) => {
  DB.edit(data => {
    res.json(data);
  }, req.params.id);
});

const PORT = 9000;
app.listen(PORT, () => console.log(`Server listening to ${PORT}`));

let array = [
  {
    id: uuid(),
    title: "Array",
    status: "Private",
    language: "HTML"
  },
  {
    id: uuid(),
    title: "Array",
    status: "Private",
    language: "HTML"
  },
  {
    id: uuid(),
    title: "Array",
    status: "Private",
    language: "HTML"
  }
];

/*
  // app.use(express.json());


  const PORT = process.env.PORT || 9000;
  */
