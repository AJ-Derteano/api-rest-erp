import { Response } from "express";

const handleHttpError = (
  res: Response,
  error: string,
  code: number = 500,
  errorRaw?: any
) => {
  console.log("Error: ", errorRaw);
  res.status(code);
  res.send({ error });
};

export { handleHttpError };
