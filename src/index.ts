import "dotenv/config";
import { startServer } from "./config/server";
import { loadTables } from "./controllers/createTables";
import { router } from "./routes";

const PORT = process.env.PORT || 3000;

const app = startServer();

(async () => {
  console.log("Status tables");
  console.log("================");
  await loadTables();
  console.log("================");

  app.use("/api/v1", router);
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})();
