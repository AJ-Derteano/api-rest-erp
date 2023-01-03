import { Knex } from "knex";

const WareHouseModel = async (db: Knex) => {
  const tableName = "warehouse";
  const exists = await db.schema.hasTable(tableName);

  if (!exists) {
    await db.schema.createTable(tableName, (table) => {
      table.charset(process.env.DB_CHARSET || "");
      table.collate(process.env.DB_COLLATION || "");

      table.increments("idwarehouse").primary();
      table.string("warecode", 50).notNullable().unique();
      table.string("description").notNullable().unique();
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

export { WareHouseModel };
