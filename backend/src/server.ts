import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./database/postgres";
import expenseRoutes from "./routes/expenseRoutes";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());
app.use("/expenses", expenseRoutes);
app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");

  res.json(result.rows);
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
