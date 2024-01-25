import express from "express";
import pool from "./db.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { sign, verify } = jwt;

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get("/todos/:userEmail", async (req, res) => {
  const { userEmail } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/todos", async (req, res) => {
  const { user_email, title, info, date } = req.body;
  console.log(user_email, title, info, date);
  const id = uuidv4();
  try {
    const newNote = await pool.query(
      `INSERT INTO todos(id,user_email,title,info,date) VALUES($1,$2,$3,$4,$5)`,
      [id, user_email, title, info, date]
    );
    res.json(newNote);
  } catch (error) {
    console.log(error);
  }
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { user_email, title, info, date } = req.body;
  try {
    const update = await pool.query(
      "UPDATE todos SET user_email = $1, title = $2, info=$3, date=$4 WHERE id=$5",
      [user_email, title, info, date, id]
    );
    res.json(update);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteNote = await pool.query("DELETE FROM todos WHERE id = $1;", [
      id,
    ]);
    res.json(deleteNote);
  } catch (error) {
    console.log(error);
  }
});

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  if (!email.rows.length) {
    return res.json({ detail: "Please input valid data" });
  }
  if (!password.rows.length) {
    return res.json({ detail: "Please input valid data" });
  }

  try {
    const users = await pool.query(
      `INSERT INTO users (email, hashed_password) VALUES($1,$2)`,
      [email, hashedPassword]
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token });
  } catch (error) {
    console.log(error);
    if (error) {
      res.json({ detail: error.detail });
    }
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (!users.rows.length) return res.json({ detail: "User does not exist" });

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    if (success) {
      res.json({ email: users.rows[0].email, token });
    } else {
      res.json({ detail: "Login failed" });
    }
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
