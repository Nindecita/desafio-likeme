require("dotenv").config();

const enVariables = {
  host: process.env.HOST,
  user: process.env.USER,
  passwordDb: process.env.PASSWORD,
  databaseName: process.env.DATABASE_NAME,
  port: Number(process.env.PORT)
};

module.exports = { enVariables };
