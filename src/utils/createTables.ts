import { db } from "../config/db";
import Table from "cli-table";

import { createTableBrand } from "../models/brand";
import { createTableCategory } from "../models/category";
import { createTableUnit } from "../models/unit";
import { createTableUnitEquivalence } from "../models/UnitEquivalence";

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

  const category = await createTableCategory(db);
  const brand = await createTableBrand(db);
  const unit = await createTableUnit(db);
  const unitEquivalence = await createTableUnitEquivalence(db);

  shellTable.push(
    ["category", category],
    ["brand", brand],
    ["unit", unit],
    ["unit_equivalence", unitEquivalence]
  );

  console.log(shellTable.toString(), "\n");
};
