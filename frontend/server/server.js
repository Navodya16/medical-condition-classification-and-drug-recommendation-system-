import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

//const bodyParser = require("body-parser");
//const joblib = require('joblib');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "culture",
});

app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, result) => {
    if (err) return res.json({ Message: "error inside server" });
    return res.json(result);
  });
});

app.post("/register", (req, res) => {
  const sql = "INSERT INTO users (email, password) VALUES (?)";
  console.log(req.body);
  const values = [req.body.email, req.body.password];
  db.query(sql, [values], (err, result) => {
    if (err) return res.json(err);
    return res.json(result);
  });
});

app.post("/login", (req, res) => {
  // Assuming you have a "users" table in your database with "email" and "password" columns.
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  const values = [email, password];

  db.query(sql, values, (err, results) => {
    console.log("Results:", results);
    if (err) {
      console.error(err);
      return res.json({ message: "Error during login" });
    }

    if (results.length === 1) {
      // User with matching email and password found, authentication successful.
      return res.json({ message: "Login successful", user: results[0] });
    } else {
      // No matching user found, authentication failed.
      return res.json({ message: "Login failed. Invalid email or password." });
    }
  });
});

app.post("/saveReview", (req, res) => {
  const comment = req.body.comment;
  console.log("Received comment:", comment);
  res.status(200).send("Comment received successfully");
});

app.listen(8081, () => {
  console.log("listeneing");
});
