import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import clientRoutes from "../routes/clientRoutes";
import petRoutes from "../routes/petRoutes";
import serviceRoutes from "../routes/serviceRoutes";
import productRoutes from "../routes/productRoutes";

const app = express();
const router = Router();

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
router.use("/cliente", clientRoutes);
router.use("/pet", petRoutes);
router.use("/servico", serviceRoutes);
router.use("/produto", productRoutes);
app.use(router);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
