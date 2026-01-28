import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/orientation", requireAuth, async (req, res) => {
  res.json({ emailSent: true });
});

export default router;
