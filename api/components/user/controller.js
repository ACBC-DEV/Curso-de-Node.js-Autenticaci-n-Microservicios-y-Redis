const { nanoid } = require("nanoid");
const auth = require("../auth");
const TABLA = "user";
module.exports = (injectedStore) => {
  let store = injectedStore;
  if (!store) store = require("../../../store/dummy");

  return {
    list: () => store.list(TABLA),
    get: (id) => store.get(TABLA, id),
    upsert: async (data) => {
      const user = {
        name: data.name,
        username: data.username,
      };
      if (data.id) user.id = data.id;
      else user.id = nanoid();

      if (data.password || data.username) {
        await auth.upsert({
          id: user.id,
          username: user.username,
          password: data.password,
        });
      }

      return store.upsert(TABLA, user);
    },
    remove: (id) => store.remove(TABLA, id),
  };
};
