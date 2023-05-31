const fs = require("fs");

const creatorsOptions = require("./creatorsOptions.json");
const creatorsStats = require("./creatorsStats.json");

const legendsOptions = require("./legendsOptions.json");
const legendsStats = require("./legendsStats.json");

const superMegaOptions = require("./superMegaOptions.json");
const superMegaStats = require("./superMegaStats.json");

const creators = {
  league: "creators",
  options: creatorsOptions,
  stats: creatorsStats,
};

const legends = {
  league: "legends",
  options: legendsOptions,
  stats: legendsStats,
};

const superMega = {
  league: "superMega",
  options: superMegaOptions,
  stats: superMegaStats,
};

const combineData = (item) => {
  return Object.keys(item.options).map((localId) => {
    const playerStats = item.stats.find((stat) => {
      return +stat.localID === +localId;
    });

    if (!playerStats) {
      return null;
    }

    return {
      ...playerStats,
      league: item.league,
      options: item.options[localId],
    };
  });
};

const smb = combineData(superMega);
const creat = combineData(creators);
const leg = combineData(legends);

// // uncomment to create file
// fs.writeFile(
//   "./playerOut.json",
//   JSON.stringify([...smb, ...creat, ...leg]),
//   (err) => {
//     err;
//   }
// );
