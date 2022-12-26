import { Knex } from "knex";

const createTableBrand = async (db: Knex) => {
  const tableName = "brand";
  const exists = await db.schema.hasTable(tableName);

  if (!exists) {
    await db.schema.createTable(tableName, (table) => {
      table.increments("idbrand").primary();
      table.string("brand").notNullable().unique();
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

export { createTableBrand };
