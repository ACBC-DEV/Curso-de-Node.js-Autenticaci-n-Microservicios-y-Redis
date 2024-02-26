const db = {
  user: [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Pedro" },
    { id: 3, name: "Jose" },
    { id: 4, name: "Maria" },
  ],
};

async function list(tabla) {
  return db[tabla] || [];
}
async function get(tabla, id) {
  const idNum = Number(id);
  const col = await list(tabla);
  return col.find((item) => item.id === idNum) || null;
}

async function upsert(tabla, data) {
  if (!db[tabla]) db[tabla] = [];

  await db[tabla].push(data);
  console.log(db);
  return data;
}
async function query(tabla, q) {
  const col = await list(tabla);
  const keys = Object.keys(q);
  const key = keys[0];
  return col.filter((item) => item[key] === q[key])[0] || null;
}
async function remove(tabla, id) {
  const col = await list(tabla);
  const index = col.indexOf(id);
  const removed = col.splice(index + 1, 1);
  return {
    removed,
  };
}

module.exports = {
  list,
  get,
  upsert,
  remove,
  query,
};
