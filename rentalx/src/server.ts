import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import { createConnection } from "./database/connection";
import { AppErros } from "./errors/AppErros";
import { routers } from "./routers";
import "./shared/container";
import swaggerJson from "./swagger.json";

createConnection();

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use(routers);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppErros) {
    return res.status(err.code).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "Error",
    message: `Internal error ${err.message}`,
  });
});

app.listen(3333, () => console.log("Inicialização concluída!"));
