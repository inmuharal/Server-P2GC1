const errorHandler = (err, req, res, next) => {
  console.log(err, 'error euy');

  let status = 500;
  let message = "Internal Server Error";

  if (
    err.name === "SequelizeValidationError" ||
    err.name === "SequelizeUniqueConstraintError"
  ) {
    status = 400;
    message = err.errors[0].message;
  } else if (err.name === "InvalidLogin") {
    status = 401;
    message = "Invalid email/password";
  } else if (
    err.name === "JsonWebTokenError" ||
    err.name === "Unauthorized" ||
    err.name === "Unauthenticated"
  ) {
    status = 401;
    message = "Invalid Token";
  } else if (err.name === "Forbidden") {
    status = 403;
    message = "You are not authorized";
  } else if (
    err.name === "Data Not Found" ||
    err.name === "NotFound" ||
    err.name === "DataNotFound"
  ) {
    status = 404;
    message = err.message || "Data not found";

  } else if (err.name === "BadRequest") {
    status = 400;
    message = err.message;
  }

  res.status(status).json({ message });
};

module.exports = errorHandler