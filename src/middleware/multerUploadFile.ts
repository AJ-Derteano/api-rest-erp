import { Request } from "express";
import multer, { diskStorage } from "multer";
import fs from "fs";
import { uuid } from "uuidv4";

const PATH_STORAGE = `${process.cwd()}/storage`;

const storage = diskStorage({
  async destination(_req: Request, _file: Express.Multer.File, cb: any) {
    if (!fs.existsSync(PATH_STORAGE))
      await fs.promises.mkdir(PATH_STORAGE, { recursive: true });

    cb(null, PATH_STORAGE);
  },
  filename(_req: Request, file: Express.Multer.File, cb: any) {
    const ext = file.originalname.split(".").pop();
    const fileName = `${uuid()}.${ext}`;
    cb(null, fileName);
  },
});

const multerMiddleware = multer({ storage });

export default multerMiddleware;
