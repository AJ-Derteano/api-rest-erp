import { db } from "../config/db";
import { Product } from "../interfaces/Product";
import { StorageService } from "./Storage";

const tableName = "product";

type ProductImage = Product & {
  images: Array<Storage>;
};

const ProductService = {
  find: async (): Promise<string | Array<Product>> => {
    const products: Array<Product> = await db(tableName)
      .select("product.*", "brand.brand", "category.category")
      // Join product with brand
      .join("brand", { "product.idbrand": "brand.idbrand" })
      // Join product with category
      .join("category", { "product.idcategory": "category.idcategory" })
      // Join product with files
      .where({ "product.status": "1" });

    if (!products) {
      return `NOT_FOUND`;
    }

    return products;
  },
  findWithImages: async (): Promise<string | Array<Product>> => {
    const productImage: Array<ProductImage> = [];

    const products: Array<Product> = await db(tableName)
      .select("product.*", "brand.brand", "category.category")
      // Join product with brand
      .join("brand", { "product.idbrand": "brand.idbrand" })
      // Join product with category
      .join("category", { "product.idcategory": "category.idcategory" })
      // Join product with files
      .where({ "product.status": "1" });

    if (!products) {
      return `NOT_FOUND`;
    }

    for (const product of products) {

      const files = await StorageService.findBy(
        product.idproduct || 0,
        "product"
      );

      productImage.push({
        ...product,
        images: files,
      });
    }

    return productImage;
  },
  findOneById: async (idproduct: string | number) => {
    const searchResult = await db(tableName)
      .select("product.*", "brand.brand", "category.category")
      // Join product with brand
      .join("brand", { "product.idbrand": "brand.idbrand" })
      // Join product with category
      .join("category", { "product.idcategory": "category.idcategory" })
      .where({
        idproduct,
        "product.status": "1",
      });

    if (!searchResult) {
      return `NOT_FOUND [${idproduct}]`;
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
    const create = await db(tableName).insert(product, "*");

    return create;
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
