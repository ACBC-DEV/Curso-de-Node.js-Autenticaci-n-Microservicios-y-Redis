const db = {
  user: [
    { id: 1, name: "Carlos" },
    { id: 2, name: "Pedro" },
    { id: 3, name: "Jose" },
    { id: 4, name: "Maria" },
  ],
};

async function list(tabla) {
  return db[tabla];
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

async function remove(tabla, id) {
  const table = await list(tabla);
  const index = table.indexOf(id);
  const removed = table.splice(index + 1, 1);
  return {
    removed,
  };
}

module.exports = {
  list,
  get,
  upsert,
  remove,
};
