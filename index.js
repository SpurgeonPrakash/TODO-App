const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const todoRoutes = require("./routes/todos");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/views"));

app.get("/", (req,res) => {
  res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(port, () => {
  console.log("Server is Up & Running!!");
})
