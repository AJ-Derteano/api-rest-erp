import { db } from "../config/db";
import { UnitEquivalence } from "../interfaces/UnitEquivalence";

const tableName = "unit_equivalence";

const UnitEquivalenceService = {
  find: async () => {
    const search = await db(tableName).select().where({ status: "1" });

    return search;
  },
  findOneById: async (id: string | number) => {
    const search = await db(tableName).select().where({
      idunit_equivalence: id,
      status: 1,
    });

    return search;
  },
  findBy: async (unitEquivalence: UnitEquivalence) => {
    const searchResult = await db(tableName).select().where(unitEquivalence);
    return searchResult;
  },
  create: async (unitEquivalence: UnitEquivalence) => {
    const create = await db(tableName).insert(unitEquivalence, "*");
    return create;
  },
  update: async (id: string, data: UnitEquivalence) => {
    const unitEquivalence = await db(tableName).select().where({
      idunit_equivalence: id,
      status: "1",
    });

    if (!unitEquivalence) {
      return `Cannot find unit equivalence [${id}]`;
    }

    const response = await db(tableName)
      .where({ idunit_equivalence: id })
      .update({ ...data, ...{ date_updated: db.fn.now() } });
    return response;
  },
  softDelete: async (id: string) => {
    const search = await db(tableName).select().where({
      idunit_equivalence: id,
      status: "1",
    });

    if (!search) {
      return `Cannot find unit equivalence [${id}]`;
    }

    const response = await db(tableName)
      .where({ idunit_equivalence: id })
      .update({ status: "2", date_updated: db.fn.now() });
    return response;
  },
  getConversion: async (
    quantity: number,
    { base_unit, des_unit }: UnitEquivalence
  ) => {
    type UnitEquivalenceExt = UnitEquivalence & {
      unit_code_bas: string;
      unit_name_bas: string;
      unit_code_des: string;
      unit_name_des: string;
    };

    const unitEquivalence: Array<UnitEquivalenceExt> = await db(tableName)
      .select(
        `unit_equivalence.idunit_equivalence`,
        `unit_equivalence.multiple_quantity`,
        `unit_bas.unit_code as unit_code_bas`,
        `unit_bas.unit_name as unit_name_bas`,
        `unit_des.unit_code as unit_code_des`,
        `unit_des.unit_name as unit_name_des`
      )
      .whereRaw(
        `     unit_equivalence.base_unit = ?
          AND unit_equivalence.des_unit = ?
          AND unit_equivalence.status = "1"
          AND (unit_equivalence.end_validity >= ?
           OR  unit_equivalence.end_validity IS NULL)`,
        [base_unit, des_unit, db.fn.now()]
      )

      // Join unit (unit base) with unit_equivalence
      .join("unit as unit_bas", {
        "unit_bas.unit_code": "unit_equivalence.base_unit",
      })
      // Join unit (unit destination) with unit_equivalence
      .join("unit as unit_des", {
        "unit_des.unit_code": "unit_equivalence.des_unit",
      })
      .where({
        "unit_bas.status": "1",
        "unit_des.status": "1",
      });

    if (unitEquivalence.length === 0) {
      return "Conversion not found";
    }

    return {
      unit_code_bas: unitEquivalence[0].unit_code_bas,
      unit_name_bas: unitEquivalence[0].unit_name_bas,
      quantity,
      unit_code_des: unitEquivalence[0].unit_code_des,
      unit_name_des: unitEquivalence[0].unit_name_des,
      multiple: unitEquivalence[0].multiple_quantity,
      conversion: quantity * (unitEquivalence[0].multiple_quantity || 1),
    };
  },
};

export { UnitEquivalenceService };
