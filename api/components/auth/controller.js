const auth = require("../../../auth");
const bcrypt = require("bcrypt");
const TABLA = "auth";
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) store = require("../../../store/dummy");

  return {
    login: async (username, password) => {
      const data = await store.query(TABLA, {
        username: username,
      });
      console.log(data.password);
      console.log();
      const isSame = bcrypt.compareSync(password, data.password, 5);
      console.log(isSame);
      if (isSame)
        return {
          token: auth.sign(data.id),
          username,
        };

      throw new Error("Invalid access ");
    },
    upsert: (data) => {
      const authData = {
        id: data.id,
      };
      if (data.username) authData.username = data.username;

      if (data.password) authData.password = bcrypt.hashSync(data.password, 5);

      return store.upsert(TABLA, authData);
    },
  };
};
