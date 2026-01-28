import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const token = header.replace("Bearer ", "");
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
