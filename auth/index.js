const jwt = require("jsonwebtoken");
const config = require("../config");
const error = require("../network/utils/error");

const secret = config.jwt.secret;
function sign(data) {
  return jwt.sign(data, secret);
}
function verify(token) {
  return jwt.verify(token, secret);
}

const check = {
  own: function (req, owner) {
    const decoded = decodeHeader(req);

    if (decoded !== owner) {
      throw error("No puedes hacer esto", 401);
    }
  },
  logged: function (req) {
    const decode = decodeHeader(req);

    return decode;
  },
};
function decodeHeader(req) {
  const authorization = req.headers.authorization || "";
  const token = getToken(authorization);
  const decoded = verify(token);
  req.user = decoded;
  console.log(decoded);
  return decoded;
}
function getToken(auth) {
  if (!auth) {
    throw error("No viene token", 401);
  }
  if (auth.indexOf("Bearer ") === -1) {
    throw error("Formato invalido", 401);
  }
  let token = auth.replace("Bearer ", "");
  return token;
}
module.exports = {
  sign,
  check,
};
