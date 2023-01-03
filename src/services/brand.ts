import { db } from "../config/db";
import { Brand } from "../interfaces/Brand";

const tableName = "brand";

const BrandService = {
  find: async () => {
    const search = await db(tableName).select().where({ status: "1" });

    return search;
  },
  findOneById: async (idbrand: string | number) => {
    const search = await db(tableName).select().where({
      idbrand,
      status: 1,
    });

    return search;
  },
  findBy: async (brand: Brand) => {
    const search = await db(tableName).select().where(brand);
    return search;
  },
  create: async (brand: Brand) => {
    const create = await db(tableName).insert(brand, "*");
    return create;
  },
  update: async (idbrand: string, data: Brand) => {
    const brand = await db(tableName).select().where({
      idbrand,
      status: "1",
    });

    if (!brand) {
      return `Cannot find brand [${idbrand}]`;
    }

    const response = await db(tableName)
      .where({ idbrand })
      .update({ ...data, ...{ date_updated: db.fn.now() } });
    return response;
  },
  softDelete: async (idbrand: string) => {
    const brand = await db(tableName).select().where({
      idbrand,
      status: "1",
    });

    if (!brand) {
      return `Cannot find brand [${idbrand}]`;
    }

    const response = await db(tableName)
      .where({ idbrand })
      .update({ status: "2", date_updated: db.fn.now() });
    return response;
  },
};

export { BrandService };
