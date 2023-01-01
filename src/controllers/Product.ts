import { Request, Response } from "express";
import { ProductService } from "../services/Product";
import { StorageService } from "../services/Storage";
import { handleHttpError } from "../utils/handleHttpError";
import { handleHttpResponse } from "../utils/handleHttpResponse";

const ProductController = {
  get: async (_req: Request, res: Response) => {
    try {
      const response = await ProductService.find();

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_GET`, 500, err);
    }
  },
  getById: async ({ params }: Request, res: Response) => {
    const { id } = params;

    try {
      const response = await ProductService.findOneById(id);

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_GET_BY_ID [${id}]`, 500, err);
    }
  },
  searchBy: async ({ body }: Request, res: Response) => {
    const { field, value } = body;
    try {
      const response = await ProductService.findBy(field, value);

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_SEARCH_BY [${body}]`, 500, err);
    }
  },
  create: async ({ body, files }: Request, res: Response) => {
    try {
      const response = await ProductService.create(body);

      if (files) {
        (files as any[]).forEach(async (file) => {
          await StorageService.create({
            idorigin: response,
            origin: "product",
            filename: file.filename,
            path: file.path,
            user_created: body.user_created,
            user_updated: body.user_updated,
          });
        });
      }

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_CREATE`, 500, err);
    }
  },
  update: async ({ params, body }: Request, res: Response) => {
    try {
      const response = await ProductService.update(params.id, body);

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_UPDATE [${params.id}]`, 500, err);
    }
  },
  delete: async ({ params }: Request, res: Response) => {
    try {
      const response = await ProductService.softDelete(params.id);

      handleHttpResponse(res, response);
    } catch (err) {
      handleHttpError(res, `ERROR_DELETE [${params.id}]`, 500, err);
    }
  },
};

export { ProductController };
