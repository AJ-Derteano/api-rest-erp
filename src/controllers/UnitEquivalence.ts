import { Request, Response } from "express";
import { ServiceUnitEquivalence } from "../services/UnitEquivalence";
import { handleHttpError } from "../utils/handleHttpError";
import { handleHttpResponse } from "../utils/handleHttpResponse";

const ControllerUnitEquivalence = {
  get: async (_req: Request, res: Response) => {
    try {
      const response = await ServiceUnitEquivalence.find();
      const data = response ? response : "NOT_FOUND";

      handleHttpResponse(res, data);
    } catch (err) {
      handleHttpError(res, `ERROR_GET`, 500, err);
    }
  },
  getById: async ({ params }: Request, res: Response) => {
    const { id } = params;

    try {
      const response = await ServiceUnitEquivalence.findOneById(id);
      const data = response ? response : "NOT_FOUND";

      handleHttpResponse(res, data);
    } catch (err) {
      handleHttpError(res, `ERROR_GET_BY_ID [${id}]`, 500, err);
    }
  },
  searchBy: async ({ body }: Request, res: Response) => {
    try {
      const response = await ServiceUnitEquivalence.findBy(body);
      const data = response ? response : "NOT_FOUND";

      handleHttpResponse(res, data);
    } catch (err) {
      handleHttpError(res, `ERROR_SEARCH_BY [${body}]`, 500, err);
    }
  },
  create: async ({ body }: Request, res: Response) => {
    try {
      const response = await ServiceUnitEquivalence.create(body);
      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_CREATE`, 500, err);
    }
  },
  update: async ({ params, body }: Request, res: Response) => {
    try {
      const response = await ServiceUnitEquivalence.update(params.id, body);
      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_UPDATE [${params.id}]`, 500, err);
    }
  },
  delete: async ({ params }: Request, res: Response) => {
    try {
      const response = await ServiceUnitEquivalence.softDelete(params.id);
      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_DELETE [${params.id}]`, 500, err);
    }
  },
  getConversion: async ({ body }: Request, res: Response) => {
    const { quantity, base_unit, des_unit } = body;
    try {
      const response = await ServiceUnitEquivalence.getConversion(quantity, {
        base_unit,
        des_unit,
      });
      
      const conversion = response;

      handleHttpResponse(res, conversion);
    } catch (err) {
      handleHttpError(res, `ERROR_GET_CONVERSION`, 500, err);
    }
  },
};

export { ControllerUnitEquivalence };
