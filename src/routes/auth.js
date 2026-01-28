import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  // TODO: verify password from DB
  const user = { id: "uuid", role: "admin" };

  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "8h"
  });

  res.json({ token, user });
});

router.get("/me", (req, res) => {
  res.json({ status: "use JWT middleware here" });
});

export default router;
