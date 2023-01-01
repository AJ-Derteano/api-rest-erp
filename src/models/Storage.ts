import { Knex } from "knex";

const StorageModel = async (db: Knex) => {
  const tableName = "storage";
  const exists = await db.schema.hasTable(tableName);

  if (!exists) {
    await db.schema.createTable(tableName, (table) => {
      table.charset(process.env.DB_CHARSET || "");
      table.collate(process.env.DB_COLLATION || "");

      table.increments("idstorage").primary();
      table.integer("idorigin").notNullable();
      table.string("origin", 12).notNullable();

      table.string("filename").notNullable().unique();
      table.string("path").notNullable();

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

export { StorageModel };
