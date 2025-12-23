const pool = require("./db");

async function init() {
  const sql = `
    CREATE TABLE IF NOT EXISTS prestamos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      docente VARCHAR(100) NOT NULL,
      recurso VARCHAR(100) NOT NULL,
      fecha_retiro DATETIME NOT NULL,
      fecha_prevista DATETIME NOT NULL,
      fecha_devolucion DATETIME,
      estado VARCHAR(50) NOT NULL
    )
  `;
  await pool.query(sql);
  console.log("Tabla prestamos lista");
  process.exit(0);
}

init().catch(err => {
  console.error("Error inicializando DB:", err);
  process.exit(1);
});
