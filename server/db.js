const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
  ],
});

// db.$on("query", (e) => {
//   console.log("Query: " + e.query);
// });

module.exports = { db };
