import express from "express";
import { categoryRouter } from "./routers/category.routes";
import { specificationsRouter } from "./routers/specification.routes";

const app = express();
app.use(express.json());
app.use("/categories", categoryRouter);
app.use("/specifications", specificationsRouter);


app.listen(3333, () => console.log("Inicializou"));
