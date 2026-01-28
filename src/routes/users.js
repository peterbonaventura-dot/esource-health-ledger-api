import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", requireAuth, async (_, res) => {
  res.json([]);
});

router.post("/", requireAuth, async (req, res) => {
  res.json({ created: true });
});

router.post("/:id/documents", requireAuth, async (req, res) => {
  res.json({ assigned: true });
});

export default router;
