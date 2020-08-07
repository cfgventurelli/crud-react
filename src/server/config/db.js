const mysql = require("mysql");

const config = {
  mysql: {
    host: "mysql.vsisolucoes.com.br",
    port: 3306,
    user: "vsisolucoes74",
    password: "V123456",
    database: "vsisolucoes74",
  }
}

const Connection = mysql.createConnection(config.mysql);

Connection.connect((err) => {
  if (err) console.log(err);
  console.log("Conectou ao banco")
});

module.exports = Connection;