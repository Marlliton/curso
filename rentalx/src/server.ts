import express from "express";
import swaggerUI from "swagger-ui-express";
import { routers } from "./routers";
import swaggerJson from "./swagger.json";

const app = express();
app.use(express.json());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));
app.use(routers);

app.listen(3333, () => console.log("Inicializou"));
