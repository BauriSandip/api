const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://localhost/crud-api", {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
});

// Define a mongoose model and schema
const Todo = mongoose.model("Todo", {
  title: String,
  description: String,
});

// Routes go here

//implementation crud application
app.post("/todos", async (req, res) => {
  try {
    const todo = new Todo(req.body);
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.put("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.delete("/todos/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).send();
    }
    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});
console.log("hello pubg");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
