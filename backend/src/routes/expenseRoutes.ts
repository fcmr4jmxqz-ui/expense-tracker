import { Router } from "express";
import { pool } from "../database/postgres";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM expenses");

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { user_id, title, amount, category, expense_date } = req.body;

    const result = await pool.query(
      `
      INSERT INTO expenses
      (
        user_id,
        title,
        amount,
        category,
        expense_date
      )

      VALUES
      ($1,$2,$3,$4,$5)

      RETURNING *
      `,
      [user_id, title, amount, category, expense_date],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create expense",
    });
  }
});

export default router;
