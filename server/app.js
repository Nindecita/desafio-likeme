//importar express
const express = require("express");
const app = express();
const { enVariables } = require("./src/config/envs");
// db
const { pool } = require("./src/config/database");

//importar cors
const cors = require("cors");
const serverPort = enVariables.port;

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

// todo
// crear la ruta put
// buscar en la base datos si la cancion existe (buscar por id)
// si la cancion existe haces el update (modificando el registro)
// si no existe no hacer nada (return)
// devolver un status 204

app.put("/posts/like/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const modifyRegister = {
      text: "UPDATE posts SET likes = likes + 1 WHERE id = $1",
      values: [id],
    };
    await pool.query(modifyRegister);
    res.status(200).json({ message: "registro modificado con éxito" });
  } catch (error) {
    console.log(error);
  }
});

// todo
// crear la ruta delete
// buscar en la base datos si la cancion existe (buscar por id)
// si la cancion existe haces el deleteeliminando el registro)
// si no existe no hacer nada (return)
// devolver un status 204

app.delete("/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteRegister = {
      text: "DELETE FROM posts WHERE id = $1",
      values: [id],
    };
    await pool.query(deleteRegister);
    res.status(204).json({ message: "registro eliminado" });
  } catch (error) {
    console.log(error);
  }
});

app.listen(serverPort, () => {
  console.log(`servidor corriendo en el puerto ${serverPort}`);
});
