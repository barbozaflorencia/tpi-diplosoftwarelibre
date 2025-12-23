const express = require("express");
const db = require("./src/db");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "API de Préstamos funcionando correctamente"
  });
});

app.get("/prestamos", (req, res) => {
  db.query(
    "SELECT * FROM prestamos",
    [],
    (err, results) => {
      if (err) {
        console.error("❌ Error SQL:", err);
        return res.status(500).json({ error: "Error en la base de datos" });
      }
      res.json(results);
    }
  );
});

// Marcar un préstamo como devuelto
app.put("/prestamos/:id/devolver", (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE prestamos
    SET 
      fecha_devolucion = NOW(),
      estado = 'DEVUELTO'
    WHERE id = ?
  `;

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error al devolver préstamo:", err);
      return res.status(500).json({ error: "Error al devolver préstamo" });
    }

    res.json({ message: "Préstamo devuelto correctamente" });
  });
});

app.post("/prestamos", (req, res) => {
  const { usuario, recurso } = req.body;

  if (!usuario || !recurso) {
    return res.status(400).json({ error: "Faltan datos" });
  }

  const sql = `
    INSERT INTO prestamos (usuario, recurso, fecha_retiro, estado)
    VALUES (?, ?, NOW(), 'EN_USO')
  `;

  db.query(sql, [usuario, recurso], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al crear préstamo" });
    }

    res.json({ message: "Préstamo creado correctamente" });
  });
});


app.listen(3000, () => {
  console.log("Servidor backend escuchando en puerto 3000");
});


app.get("/prestamos", (req, res) => {
  const query = `
    SELECT usuario, servicio, fecha_inicio
    FROM prestamos
    WHERE fecha_fin IS NULL
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json(results);
  });
});
