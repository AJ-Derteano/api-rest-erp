import { db } from "../config/db";
import { Category } from "../interfaces/category";

const tableName = "category";

const ServiceCategory = {
  find: async () => {
    const categories = await db(tableName).select().where({ status: "1" });

    return categories;
  },
  findOneById: async (id: string | number) => {
    const searchCategory = await db(tableName).select().where({
      idcategory: id,
      status: 1,
    });

    return searchCategory;
  },
  findBy: async (category: Category) => {
    const searchResult = await db(tableName).select().where(category);
    return searchResult;
  },
  create: async (category: Category) => {
    const createCategory = await db(tableName).insert(category, "*");
    return createCategory;
  },
  update: async (id: string, data: Category) => {
    const category = await db(tableName).select().where({
      idcategory: id,
      status: "1",
    });

    if (!category) {
      return `Cannot find category [${id}]`;
    }

    const response = await db(tableName)
      .where({ idcategory: id })
      .update({ ...data, ...{ date_updated: db.fn.now() } });
    return response;
  },
  softDelete: async (id: string) => {
    const category = await db(tableName).select().where({
      idcategory: id,
      status: "1",
    });

    if (!category) {
      return `Cannot find category [${id}]`;
    }

    const response = await db(tableName)
      .where({ idcategory: id })
      .update({ status: "2", date_updated: db.fn.now() });
    return response;
  },
};

export { ServiceCategory };
