import { db } from "../config/db";
import { WareHouse } from "../interfaces/WareHouse";

const tableName = "warehouse";

const WareHouseService = {
  find: async (): Promise<Array<WareHouse>> => {
    const search: Array<WareHouse> = await db(tableName)
      .select()
      .where({ status: "1" });

    return search;
  },
  findOneById: async (
    idwarehouse: string | number
  ): Promise<Array<WareHouse>> => {
    const search: Array<WareHouse> = await db(tableName).select().where({
      idwarehouse,
      status: 1,
    });

    return search;
  },
  findBy: async (warehouse: WareHouse): Promise<Array<WareHouse>> => {
    const search: Array<WareHouse> = await db(tableName)
      .select()
      .where(warehouse);

    return search;
  },
  findByCode: async (code: string): Promise<Array<WareHouse>> => {
    const search: Array<WareHouse> = await db(tableName)
      .select()
      .where({ code });

    return search;
  },
  create: async (warehouse: WareHouse) => {
    const create = await db(tableName).insert(warehouse, "*");
    return create;
  },
  update: async (idwarehouse: string, data: WareHouse) => {
    const brand = await db(tableName).select().where({
      idwarehouse,
      status: "1",
    });

    if (!brand) {
      return `Cannot find brand [${idwarehouse}]`;
    }

    const response = await db(tableName)
      .where({ idwarehouse })
      .update({ ...data, ...{ date_updated: db.fn.now() } });
    return response;
  },
  softDelete: async (idwarehouse: string) => {
    const brand = await db(tableName).select().where({
      idwarehouse,
      status: "1",
    });

    if (!brand) {
      return `Cannot find brand [${idwarehouse}]`;
    }

    const response = await db(tableName)
      .where({ idwarehouse })
      .update({ status: "2", date_updated: db.fn.now() });
    return response;
  },
};

export { WareHouseService };
