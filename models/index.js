const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.connect("mongodb://localhost/todo-api", { useUnifiedTopology: true,  useNewUrlParser: true });
mongoose.Promise = Promise;

module.exports.Todo = require("./todo");
