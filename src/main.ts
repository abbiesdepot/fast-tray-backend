import express from "express";
import { registerRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/error-middleware";
import { env } from "./utils/env-util";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

registerRoutes(app);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use(errorMiddleware);

export function startServer() {
  return app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
  });
}

if (require.main === module) {
  startServer();
}