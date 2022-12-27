import { Knex } from "knex";

const createTableUnitEquivalence = async (db: Knex) => {
  const tableName = "unit_equivalence";
  const exists = await db.schema.hasTable(tableName);

  if (!exists) {
    await db.schema.createTable(tableName, (table) => {
      table.increments("idunit_equivalence").primary();
      table.string("base_unit").notNullable();
      table.string("des_unit").notNullable();
      table.smallint("multiple_quantity").notNullable();
      table.string("description").nullable();
      table.datetime("start_validity").nullable().defaultTo(db.fn.now());
      table.datetime("end_validity").nullable();
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

      table.unique(["base_unit", "des_unit"]);

      table.foreign("base_unit").references("unit.unit_code");
      table.foreign("des_unit").references("unit.unit_code");
    });

    return "registered";
  } else {
    return "load";
  }
};

export { createTableUnitEquivalence };
