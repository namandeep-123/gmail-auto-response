import dotenv from "dotenv";
dotenv.config();
import express from "express";

//db

import db from "./db.js";

const app = express();
const port = process.env.PORT;

// Configurations
app.set("view engine", "ejs");

// Middlewares
app.use(express.json());
app.use(express.static("static"));

app.get("/login", (req, res) => {});

app.listen(port, () => {
  console.log(`Server started on ${port}`);
  console.log(`http://localhost:${port}/login for login page`);
});
