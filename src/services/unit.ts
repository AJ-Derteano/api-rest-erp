import { db } from "../config/db";
import { Unit } from "../interfaces/unit";

const tableName = "unit";

const ServiceUnit = {
  find: async () => {
    const brands = await db(tableName).select().where({ status: "1" });

    return brands;
  },
  findOneById: async (id: string | number) => {
    const searchBrand = await db(tableName).select().where({
      idunit: id,
      status: 1,
    });

    return searchBrand;
  },
  findBy: async (unit: Unit) => {
    const searchResult = await db(tableName).select().where(unit);
    return searchResult;
  },
  create: async (unit: Unit) => {
    const createBrand = await db(tableName).insert(unit, "*");
    return createBrand;
  },
  update: async (id: string, data: Unit) => {
    const unit = await db(tableName).select().where({
      idunit: id,
      status: "1",
    });

    if (!unit) {
      return `Cannot find unit [${id}]`;
    }

    const response = await db(tableName)
      .where({ idunit: id })
      .update({ ...data, ...{ date_updated: db.fn.now() } });
    return response;
  },
  softDelete: async (id: string) => {
    const unit = await db(tableName).select().where({
      idunit: id,
      status: "1",
    });

    if (!unit) {
      return `Cannot find unit [${id}]`;
    }

    const response = await db(tableName)
      .where({ idunit: id })
      .update({ status: "2", date_updated: db.fn.now() });
    return response;
  },
};

export { ServiceUnit };
