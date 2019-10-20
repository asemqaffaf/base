const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/toDoList", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
});
const db = mongoose.connection;
db.on("error", function() {
  console.log("mongoose connection error");
  console.log("____________________________");
});
db.once("open", function() {
  console.log("mongoose connected successfully");
  console.log("____________________________");
});
let tasksSchema = new mongoose.Schema({
  title: String,
  status: String,
  language: String
});
let Todos = mongoose.model("todos", tasksSchema);

let getRepos = cb => {
  console.log("GET TODOS FROM DATABASE");
  Todos.find({}, function(err, docs) {
    if (err) {
      console.log("ERR:", err);
    }
    console.log("DOCS:", docs);
    cb(docs);
  });
};

let addData = (cb, box) => {
  console.log("BOX:", box);

  Todos.insertMany(
    [
      {
        title: box.item.title,
        status: box.item.status,
        language: box.item.language
      }
    ],
    function(err, NewtTodo) {
      if (err) {
        console.log("ERR:", err);
      }
      console.log("NEWTODO:", NewtTodo);
      getRepos(cb);
    }
  );
};

let remove = (cb, id) => {
  console.log("ID", id);
  Todos.deleteOne({ _id: id }, (err, removeTodo) => {
    if (err) {
      console.log("err", err);
    }
    console.log("removeTask", removeTodo);
    getRepos(cb);
  });
};

let edit = (cb, id) => {
  console.log("iddata :", id);
  Todos.findOne({ _id: id }, (err, newdata) => {
    if (err) {
      console.log("ERR:", err);
    } else {
      if (newdata.status === "Public") {
        status = "Private";
      } else {
        status = "Public";
      }
    }

    Todos.updateOne({ _id: id }, { status }, (err, editedTodo) => {
      if (err) {
        console.log("ERR:", err);
      } else {
        console.log(editedTodo);
        getRepos(cb);
      }
    });
  });
};

module.exports = {
  getRepos: getRepos,
  addData: addData,
  remove: remove,
  edit: edit
};
