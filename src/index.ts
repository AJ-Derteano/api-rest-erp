import "dotenv/config";
import { configInitServer } from "./config/server";
import { loadTables } from "./utils/createTables";
import { router } from "./routes";

const PORT = process.env.PORT || 3000;

const app = configInitServer();

(async () => {
  console.log("Status tables");
  await loadTables();

  app.use("/api/v1", router);
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})();
