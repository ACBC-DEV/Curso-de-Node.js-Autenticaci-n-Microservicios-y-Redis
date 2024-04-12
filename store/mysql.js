const mysql = require("mysql");
// https://www.phpmyadmin.co/sql.php?db=sql10697950&goto=db_structure.php&table=user&pos=0
const config = require("../config");

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

// Connection
// vefil22225@evimzo.com
// Tractor-Carnivore1-Extending
let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error("[db err]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("DB Connected!");
    }
  });

  connection.on("error", (err) => {
    console.error("[db err]", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw err;
    }
  });
}

handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}
function upsert(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${tabla} SET ?`, data, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
}
function update(tabla, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${tabla} SET ? WHERE id=?`,
      [data, data.id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}
function query(tabla, query, join) {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join)[0];
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${tabla}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${tabla} ${joinQuery} WHERE ?`,
      query,
      (err, res) => {
        if (err) return reject(err);
        resolve(res[0] || null);
      }
    );
  });
}

module.exports = {
  list,
  get,
  upsert,
  update,
  query,
};
