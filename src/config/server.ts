import "dotenv/config";
import express from "express";
import cors from "cors";

const configInitServer = () => {
  const app = express();
  app.use(cors());
  app.use(express.json());

  return app;
};

export { configInitServer };
