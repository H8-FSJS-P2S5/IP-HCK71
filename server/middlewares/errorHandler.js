function errorHandler(error, req, res, next) {
  console.log(error);
  switch (error.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: error.errors[0].message });
      return;
    case "EmailEmpty":
      res.status(400).json({ message: "Validation error" });
      return;
    case "PassEmpty":
      res.status(400).json({ message: "Validation error" });
      return;
    case "InvalidLogin":
      res.status(401).json({ message: "Error authentication" });
      return;
    case "CuisineNotFound":
      res.status(404).json({ message: `Cuisine with ID ${error.id} not found` });
      return;
    case "CategoryNotFound":
      res.status(404).json({ message: `Category with ID ${error.id} not found` });
      return;
    case "FileNotFound":
      res.status(404).json({ message: `File not found` });
      return;
    case "InvalidToken":
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid token" });
      return;
    case "AdminOnly":
      res.status(403).json({ message: "Restricted to admin" });
      return;
    case "OwnerRestricted":
      res.status(403).json({ message: "Restricted to owner" });
      return;
    default:
      res.status(500).json({ message: "Internal server error" });
      return;
  }
}

module.exports = { errorHandler };
