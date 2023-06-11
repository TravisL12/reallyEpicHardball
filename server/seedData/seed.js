const { db } = require("../db");
const playerJson = require("./playersComplete.json");

const main = async () => {
  // make all attributes strings (probably should just migrate db and change this)
  const formatted = playerJson.map((player) => {
    return Object.keys(player)
    .reduce((acc, key) => {
      acc[key] = String(player[key]);
      return acc;
    }, {});
  });
  const count = await db.player.createMany({
    data: formatted,
  });
  return count;
};

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
