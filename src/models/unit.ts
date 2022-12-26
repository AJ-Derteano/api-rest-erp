import { Knex } from "knex";

const createTableUnit = async (db: Knex) => {
  const tableName = "unit";
  let exists = await db.schema.hasTable(tableName);

  if (!exists) {
    await db.schema.createTable(tableName, (table) => {
      table.increments("idunit").primary();
      table.string("unit_code").notNullable().unique();
      table.string("unit_name").notNullable().unique();
      table.string("description").nullable();
      table.string("status").notNullable().defaultTo("1");
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
