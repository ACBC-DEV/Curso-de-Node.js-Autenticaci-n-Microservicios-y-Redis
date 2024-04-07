const auth = require("../../../auth");
module.exports = function checkAuht(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        const owner = req.body.id;
        auth.check.own(req, owner);
        if (req.user.id === owner) {
          next();
        } else {
          res
            .status(403)
            .send({ error: "No tienes permisos para realizar esta acción" });
        }
        break;
      default:
        next();
    }
  }
  return middleware;
};
