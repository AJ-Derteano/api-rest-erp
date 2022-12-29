import { Knex } from "knex";

const createTableUnit = async (db: Knex) => {
  const tableName = "unit";
  const exists = await db.schema.hasTable(tableName);

  if (!exists) {
    await db.schema.createTable(tableName, (table) => {
      table.charset(process.env.DB_CHARSET || "");
      table.collate(process.env.DB_COLLATION || "");

      table.increments("idunit").primary();
      table.string("unit_code", 5).notNullable().unique();
      table.string("unit_name", 50).notNullable().unique();
      table.string("description").nullable();
      table.string("status", 1).notNullable().defaultTo("1");

      table
        .datetime("date_created", { useTz: true })
        .notNullable()
        .defaultTo(db.fn.now());
      table.string("user_created").notNullable();
      table
        .datetime("date_updated", { useTz: true })
        .notNullable()
        .defaultTo(db.fn.now());
      table.string("user_updated").notNullable();
    });

    return "registered";
  } else {
    return "load";
  }
};

export { createTableUnit };
