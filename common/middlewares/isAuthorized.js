const { StatusCodes } = require('http-status-codes')
const jwt = require("jsonwebtoken");
const rbac = require("../rbac/rbac");
module.exports = (endpoint) => {
  return async (req, res, next) => {
    const auth = req.headers.authorization
    if(!auth) {
      res.status(StatusCodes.BAD_REQUEST).json({message:`Token required`})
    } else {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const isAllowed = await rbac.can(decoded.role, endpoint)
      if(!isAllowed) {
        res.status(StatusCodes.FORBIDDEN).json({message: `You are not allowed to view all users`})
      } else {
        next()
      }
    }
  };
};
