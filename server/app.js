//importar express
const express = require("express");
const app = express();
const {enVariables} = require("./src/config/envs")
// db
const { pool } = require("./src/config/database");

//importar cors
const cors = require("cors");
const serverPort = enVariables.port

app.use(express.json());
app.use(cors());

app.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

app.post("/posts", async (req, res) => {
  try {
    const { titulo, url, descripcion } = req.body;
    const SQLquery = {
      text: "INSERT INTO posts (titulo, img, descripcion) VALUES ($1, $2, $3) RETURNING *",
      values: [titulo, url, descripcion],
    };
    const { rows } = await pool.query(SQLquery);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.listen(serverPort, () => {
  console.log(`servidor corriendo en el puerto ${serverPort}`);
});
