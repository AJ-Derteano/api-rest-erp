import { Response } from "express";

const handleHttpResponse = (
  res: Response,
  data: object | string | number | Array<object>,
  code: number = 200,
  message: string = "Success"
) => {
  res.status(code);
  res.send({
    message,
    data,
  });
};

export { handleHttpResponse };
