const auth = require("../../../auth");
const stataments = {
  UPDATE: "update",
  FOLLOW: "follow",
};
module.exports = function checkAuht(action) {
  function middleware(req, res, next) {
    switch (action) {
      case stataments.UPDATE:
        const owner = req.body.id;
        auth.check.own(req, owner);
        next();
        break;
      case stataments.FOLLOW:
        auth.check.logged(req);
        next();
        break;
      default:
        next();
    }
  }
  return middleware;
};
