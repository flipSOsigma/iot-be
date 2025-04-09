import * as fs from "fs";
import * as path from "path";
import cors from "cors";
import express from "express";
import config from "./config";

const app = express();
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const routesPath = path.resolve(__dirname, "routes");
const routesFolder = fs.readdirSync(routesPath);

(async () => {
  for (const folder of routesFolder) {
    const routeFiles = fs.readdirSync(path.join(routesPath, folder)).filter((file) => file.endsWith(".js"));
    for (const file of routeFiles) {
      const route = await import(path.join(routesPath, folder, file));
      app.use("/", route.default);
    }
  }
})();

app.listen(Number(config.port), () => {
  console.log(`Server listening on port ${config.port}`);
});
