import express, { Router } from "express";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const router = Router();
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);

router.get("/clients", (req, res) => {
  res.json([
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
  ]);
});

app.use("/api", router);
