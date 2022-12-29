import { db } from "../config/db";
import { Brand } from "../interfaces/Brand";

const tableName = "brand";

const BrandService = {
  find: async () => {
    const brands = await db(tableName).select().where({ status: "1" });

    return brands;
  },
  findOneById: async (id: string | number) => {
    const searchBrand = await db(tableName).select().where({
      idbrand: id,
      status: 1,
    });

    return searchBrand;
  },
  findBy: async (brand: Brand) => {
    const searchResult = await db(tableName).select().where(brand);
    return searchResult;
  },
  create: async (brand: Brand) => {
    const createBrand = await db(tableName).insert(brand, "*");
    return createBrand;
  },
  update: async (id: string, data: Brand) => {
    const brand = await db(tableName).select().where({
      idbrand: id,
      status: "1",
    });

    if (!brand) {
      return `Cannot find brand [${id}]`;
    }

    const response = await db(tableName)
      .where({ idbrand: id })
      .update({ ...data, ...{ date_updated: db.fn.now() } });
    return response;
  },
  softDelete: async (id: string) => {
    const brand = await db(tableName).select().where({
      idbrand: id,
      status: "1",
    });

    if (!brand) {
      return `Cannot find brand [${id}]`;
    }

    const response = await db(tableName)
      .where({ idbrand: id })
      .update({ status: "2", date_updated: db.fn.now() });
    return response;
  },
};

export { BrandService };
