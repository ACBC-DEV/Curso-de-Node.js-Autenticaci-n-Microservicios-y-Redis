const TABLA = "user";
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) store = require("../../../store/dummy");

  return {
    list: () => store.list(TABLA),
    get: (id) => store.get(TABLA, id),
    upsert: (data) => store.upsert(TABLA, data),
  };
};
