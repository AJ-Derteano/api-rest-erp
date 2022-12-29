import { Knex } from "knex";

const BrandModel = async (db: Knex) => {
  const tableName = "brand";
  const exists = await db.schema.hasTable(tableName);

  if (!exists) {
    await db.schema.createTable(tableName, (table) => {
      table.charset(process.env.DB_CHARSET || "");
      table.collate(process.env.DB_COLLATION || "");

      table.increments("idbrand").primary();
      table.string("brand", 50).notNullable().unique();
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

export { BrandModel };
