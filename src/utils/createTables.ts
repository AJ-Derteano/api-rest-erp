import { db } from "../config/db";
import Table from "cli-table";

import { createTableBrand } from "../models/brand";
import { createTableCategory } from "../models/category";

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

  let category = await createTableCategory(db);
  let brand = await createTableBrand(db);

  shellTable.push(["category", category], ["brand", brand]);

  console.log(shellTable.toString(), "\n");
};
