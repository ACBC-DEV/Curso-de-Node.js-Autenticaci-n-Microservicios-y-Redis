const auth = require("../../../auth");
const TABLA = "auth";
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) store = require("../../../store/dummy");

  return {
    login: async (username, password) => {
      const data = await store.query(TABLA, {
        username: username,
      });
      if (data.password === password) return auth.sign(data);
      throw new Error("Invalid access ");
    },
    upsert: (data) => {
      const authData = {
        id: data.id,
      };
      if (data.username) authData.username = data.username;

      if (data.password) authData.password = data.password;
      return store.upsert(TABLA, authData);
    },
  };
};
