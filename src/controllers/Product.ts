import { Request, Response } from "express";
import { ServiceProduct } from "../services/Product";
import { handleHttpError } from "../utils/handleHttpError";
import { handleHttpResponse } from "../utils/handleHttpResponse";

const ControllerProduct = {
  get: async (_req: Request, res: Response) => {
    try {
      const response = await ServiceProduct.find();

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_GET`, 500, err);
    }
  },
  getById: async ({ params }: Request, res: Response) => {
    const { id } = params;

    try {
      const response = await ServiceProduct.findOneById(id);

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_GET_BY_ID [${id}]`, 500, err);
    }
  },
  searchBy: async ({ body }: Request, res: Response) => {
    const { field, value } = body;
    try {
      const response = await ServiceProduct.findBy(field, value);

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_SEARCH_BY [${body}]`, 500, err);
    }
  },
  create: async ({ body }: Request, res: Response) => {
    try {
      const response = await ServiceProduct.create(body);

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_CREATE`, 500, err);
    }
  },
  update: async ({ params, body }: Request, res: Response) => {
    try {
      const response = await ServiceProduct.update(params.id, body);

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_UPDATE [${params.id}]`, 500, err);
    }
  },
  delete: async ({ params }: Request, res: Response) => {
    try {
      const response = await ServiceProduct.softDelete(params.id);

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_DELETE [${params.id}]`, 500, err);
    }
  },
};

export { ControllerProduct };
