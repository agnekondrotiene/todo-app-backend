const express = require("express");
const cors = require("cors");
const path = require("path");
const mysql = require("mysql");

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "",
});

connection.connect();

app.use("/", express.static(path.join(__dirname, "../frontend")));

app.post("/api/todos", function (req, res) {
  const query = `INSERT INTO \`todolist\`.\`todos\` (\`item\`, \`date\`) VALUES ("${req.body.item}", CURRENT_TIMESTAMP());`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    }
    console.log(results, fields);
    res.json({ id: results.insertId, ...req.body });
  });
});

app.get("/api/todos", function (req, res) {
  const query = "SELECT id, item, done FROM todolist.todos;";

  connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    }

    res.json(results);
  });
});

app.delete("/api/todos/:id", function (req, res) {
  const query = `DELETE FROM \`todos\` WHERE \`id\` = ${req.params.id};`;

  connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    }

    res.json({ id: req.params.id });
  });
});

app.patch("/api/todos/:id", function (req, res) {
  let fieldsToUpdate = [];

  if (req.body.hasOwnProperty("done")) {
    fieldsToUpdate.push(`done="${req.body.done}"`);
  }

  if (req.body.hasOwnProperty("item")) {
    fieldsToUpdate.push(`item="${req.body.item}"`);
  }

  const query = `UPDATE todos SET ${fieldsToUpdate.join(", ")} WHERE id=${
    req.params.id
  };`;

  console.log(query);

  connection.query(query, function (error, results, fields) {
    if (error) {
      throw error;
    }

    console.log(results);
    console.log(fields);

    const query = `SELECT * FROM todolist.todos WHERE id=${req.params.id};`;

    connection.query(query, function (error, results, fields) {
      if (error) {
        throw error;
      }
      res.json(results[0]);
    });
  });
});

app.listen(3001);
