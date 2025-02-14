const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token!" });
  }

  if (!decodedToken) {
    return res.status(401).json({ message: "Not authenticated." });
  }

  req.userId = decodedToken.userId;
  next();
};
