import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import documentRoutes from "./routes/documents.js";
import approvalRoutes from "./routes/approvals.js";
import notificationRoutes from "./routes/notifications.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/documents", documentRoutes);
app.use("/approvals", approvalRoutes);
app.use("/notifications", notificationRoutes);

app.get("/health", (_, res) => res.json({ ok: true }));

app.listen(process.env.PORT || 3000, () => {
  console.log("API running");
});
