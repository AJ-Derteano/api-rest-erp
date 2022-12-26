import { db } from "../config/db";
import Table from "cli-table";

import { createTableBrand } from "../models/brand";
import { createTableCategory } from "../models/category";
import { createTableUnit } from "../models/unit";

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

  shellTable.push(["category", category], ["brand", brand], ["unit", unit]);

  console.log(shellTable.toString(), "\n");
};
