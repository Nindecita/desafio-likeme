const { enVariables } = require("./envs");

//importamos pool desde pg
const { Pool } = require("pg");
// creamos la instancia de pool con los datos de BD
const pool = new Pool({
  host: enVariables.host,
  user: enVariables.user,
  password: enVariables.passwordDb,
  database: enVariables.databaseName,
  allowExitOnIdle: true,
});

module.exports = { pool };
