import { Knex } from "knex";

const createTableCategory = async (db: Knex) => {
  let exists = await db.schema.hasTable("category");

  if (!exists) {
    await db.schema.createTable("category", (table) => {
      table.increments("idcategory").primary();
      table.string("category").notNullable().unique();
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

export { createTableCategory };
