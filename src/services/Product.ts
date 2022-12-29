import { db } from "../config/db";
import { Product } from "../interfaces/Product";

const tableName = "product";

const ProductService = {
  find: async () => {
    const result = await db(tableName)
      .select("product.*", "brand.brand", "category.category")
      // Join product with brand
      .join("brand", { "product.idbrand": "brand.idbrand" })
      // Join product with category
      .join("category", { "product.idcategory": "category.idcategory" })
      .where({ "product.status": "1" });

    if (!result) {
      return `NOT_FOUND`;
    }

    return result;
  },
  findOneById: async (id: string | number) => {
    const searchResult = await db(tableName)
      .select("product.*", "brand.brand", "category.category")
      // Join product with brand
      .join("brand", { "product.idbrand": "brand.idbrand" })
      // Join product with category
      .join("category", { "product.idcategory": "category.idcategory" })
      .where({
        idproduct: id,
        "product.status": "1",
      });

    if (!searchResult) {
      return `NOT_FOUND [${id}]`;
    }

    return searchResult;
  },
  findBy: async (field: string, value: string | number) => {
    const searchResult = await db(tableName)
      .select("product.*", "brand.brand", "category.category")
      // Join product with brand
      .join("brand", { "product.idbrand": "brand.idbrand" })
      // Join product with category
      .join("category", { "product.idcategory": "category.idcategory" })
      .whereILike(field, `%${value}%`);

    if (!searchResult) {
      return `NOT_FOUND`;
    }

    return searchResult;
  },
  create: async (product: Product) => {
    const createBrand = await db(tableName).insert(product, "*");

    return createBrand;
  },
  update: async (id: string, data: Product) => {
    const product = await db(tableName).select().where({
      idproduct: id,
      status: "1",
    });

    if (!product) {
      return `Cannot find product [${id}] for update`;
    }

    const response = await db(tableName)
      .where({ idproduct: id })
      .update({ ...data, ...{ date_updated: db.fn.now() } });
    return response;
  },
  softDelete: async (id: string) => {
    const product = await db(tableName).select().where({
      idproduct: id,
      status: "1",
    });

    if (!product) {
      return `Cannot find product [${id}] for delete`;
    }

    const response = await db(tableName)
      .where({ idproduct: id })
      .update({ status: "2", date_updated: db.fn.now() });
    return response;
  },
};

export { ProductService };
