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
    const { title, amount, category, expense_date } = req.body;

    const user_id = 1;
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

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { title, amount, category, expense_date } = req.body;

    const result = await pool.query(
      `
      UPDATE expenses

      SET
        title = $1,
        amount = $2,
        category = $3,
        expense_date = $4

      WHERE id = $5

      RETURNING *
      `,
      [title, amount, category, expense_date, id],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update expense",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM expenses
      WHERE id = $1
      RETURNING *
      `,
      [id],
    );

    res.json({
      message: "Expense deleted",
      deletedExpense: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
});
export default router;
