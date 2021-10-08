const { StatusCodes } = require("http-status-codes");
module.exports = (schema) => {
  return (req, res, next) => {
    const validationErrors = [];
    [("headers", "params", "query", "body", "file")].forEach((key) => {
      if (schema[key]) {
        const valdation = schema[key].validate(req[key]);
        if (valdation.error) {
          validationErrors.push(
            valdation.error.details[0].message.split('"').join("")
          );
        }
      }
    });
    if (validationErrors.length) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: validationErrors.join() });
    } else {
      next();
    }
  };
};
