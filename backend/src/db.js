const mysql = require("mysql2");

let connection;

function connectWithRetry() {
  connection = mysql.createConnection({
    host: "mysql",
    user: "flor",
    password: "flor123",
    database: "prestamos"
  });

  connection.connect(err => {
    if (err) {
      console.error("⏳ MySQL no disponible, reintentando en 5s...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("✅ Conectado a MySQL");
    }
  });
}

connectWithRetry();

module.exports = {
  query: (sql, params, callback) => {
    if (!connection) {
      return callback(new Error("DB no inicializada"));
    }
    connection.query(sql, params, callback);
  }
};

connectWithRetry();

