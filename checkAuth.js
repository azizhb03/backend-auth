const jwt = require("jsonwebtoken");

module.exports = async function checkAuth(req, res, next) {
  try {
    const decoded = jwt.decode(
      Object.assign(req.headers).cookie?.split("=")[1],
      "hjdbsbdqkjdbqksjdbqkjsdbqksdbqksdbjqsdbjqdsb"
    );
    if (decoded == null)
      return res.status(403).json({ message: "bad request" });

    if (decoded) {
      if (decoded.exp < Date.now()) {
       return res.status(403).json({ message: " session expired" });
      }
    }
  } catch (error) {
    res.status(403).json({ message: error });
  }

  next();
};
