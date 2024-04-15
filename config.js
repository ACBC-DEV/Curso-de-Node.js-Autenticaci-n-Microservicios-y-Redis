module.exports = {
  api: {
    port: process.env.API_PORT || 3000,
  },
  jwt: {
    secret: process.env.JWT_SECRET || "weNeedASecretKey",
  },
  mysql: {
    host: process.env.MYSQL_HOST || "sql10.freemysqlhosting.net",
    user: process.env.MYSQL_USER || "sql10697950",
    password: process.env.MYSQL_PASS || "tHn5u3JCzQ",
    database: process.env.MYSQL_DB || "sql10697950",
  },
  mysqlService: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 3001,
  },
  post: {
    port: process.env.POST_PORT || 3002,
  },
};
