import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/:userId", requireAuth, async (req, res) => {
  res.json({ approved: true });
});

export default router;
