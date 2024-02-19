const db = {
  user: [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Pedro" },
    { id: 3, name: "Jose" },
    { id: 4, name: "Maria" },
  ],
};

function list(tabla) {
  return db[tabla];
}
function get(tabla, id) {
  const col = list(tabla);
  return col.filter((item) => item.id === id)[0] || null;
}

function upsert(tabla, data) {
  db[collection].push(data);
}

function remove(tabla, id) {
  retu;
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
