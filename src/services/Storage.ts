import { db } from "../config/db";
import { Storage } from "../interfaces/Storage";

const tableName = "storage";

const StorageService = {
  findBy: async (idorigin: number, origin: string) => {
    const searchFile = await db(tableName)
      .select("filename", "path")
      .where({ idorigin, origin });
    return searchFile;
  },
  create: async (storage: Storage) => {
    const create = await db(tableName).insert(storage, "*");
    return create;
  },
};

export { StorageService };
