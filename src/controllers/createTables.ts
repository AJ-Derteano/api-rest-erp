import { db } from "../config/db";
import { createTableCategory } from "../models/category";

export const loadTables = async () => {
  let category = await createTableCategory(db);
  console.log("Category: ", category);
};
