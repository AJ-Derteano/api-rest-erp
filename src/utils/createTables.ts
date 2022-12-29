import { db } from "../config/db";
import Table from "cli-table";

import { BrandModel } from "../models/Brand";
import { CategoryModel } from "../models/Category";
import { UnitModel } from "../models/Unit";
import { UnitEquivalenceModel } from "../models/UnitEquivalence";
import { ProductModel } from "../models/Product";

export const loadTables = async () => {
  const shellTable = new Table({
    head: ["Table", "Status"],
    colWidths: [20, 30],
    chars: {
      top: "═",
      "top-mid": "╤",
      "top-left": "╔",
      "top-right": "╗",
      bottom: "═",
      "bottom-mid": "╧",
      "bottom-left": "╚",
      "bottom-right": "╝",
      left: "║",
      "left-mid": "╟",
      mid: "─",
      "mid-mid": "┼",
      right: "║",
      "right-mid": "╢",
      middle: "│",
    },
  });

  const category = await CategoryModel(db);
  const brand = await BrandModel(db);
  const unit = await UnitModel(db);
  const unitEquivalence = await UnitEquivalenceModel(db);
  const product = await ProductModel(db);

  shellTable.push(
    ["category", category],
    ["brand", brand],
    ["unit", unit],
    ["unit_equivalence", unitEquivalence],
    ["product", product]
  );

  console.log(shellTable.toString(), "\n");
};
