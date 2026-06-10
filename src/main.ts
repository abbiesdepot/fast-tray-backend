import express from "express";
import { registerRoutes } from "./routes";
import { errorMiddleware } from "./middlewares/error-middleware";
import { env } from "./utils/env-util";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`\n--- Incoming Request: ${req.method} ${req.url} ---`);
  console.log('Headers:', req.headers);
  console.log('Query:', req.query);
  console.log('Body:', req.body);
  
  const originalSend = res.send;
  res.send = function (body) {
    console.log(`--- Outgoing Response: ${res.statusCode} ---`);
    try {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
      console.log('Body:', parsedBody);
    } catch(e) {
      console.log('Body:', body);
    }
    console.log('---------------------------------------------------\n');
    return originalSend.call(this, body);
  };
  next();
});

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