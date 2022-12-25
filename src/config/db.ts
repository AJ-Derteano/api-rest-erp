import knex from "knex";

// const DB_VERSION = process.env.DB_VERSION;
const DB_HOST = process.env.DB_HOST;
const DB_PORT: number = parseInt(process.env.DB_PORT || "3006");
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const db = knex({
  client: "mysql",
  connection: {
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    charset: "utf8",
    timezone: "America/Lima",
  },
  pool: {
    /* afterCreate: function (connection: any, callback: Function) {
      connection.query("SET time_zone = 'America/Lima';", function (err: any) {
        callback(err, connection);
      });
    }, */
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "migrations",
  },
});

export { db };
