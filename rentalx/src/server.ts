import express from "express";
import { categoryRouter } from "./routers/category.routes";

const app = express();
app.use(express.json());
app.use("/categories", categoryRouter);

app.post("/courses", (req, res) => {
  const { name } = req.body;
  console.log(name);
  res.send();
});

app.listen(3333, () => console.log("Inicializou"));
