import express from "express";
import jwt from "jsonwebtoken";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  // TODO: verify password from DB
  const user = { id: "uuid", role: "admin" };

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "8h"
  });

  res.json({ token, user });
});

router.get("/me", requireAuth, (req, res) => {
  res.json(req.user);
});

export default router;
