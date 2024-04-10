const auth = require("../../../auth");
module.exports = function checkAuht(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "update":
        const owner = req.body.id;
        auth.check.own(req, owner);
        console.log("NEXT WORKING", typeof next);
        next();
        break;
      default:
        next();
    }
  }
  return middleware;
};
