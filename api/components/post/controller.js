const TABLA = "post";
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) store = require("../../../store/mysql");
  return {
    list: () => store.list(TABLA),
    get: (id) => store.get(TABLA, id),
    upsert: (data) => store.upsert(TABLA, data),
  };
};
