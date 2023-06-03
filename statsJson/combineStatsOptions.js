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

const addLeague = (item) => {
  return item.stats.map((s) => {
    const options = item.options[s.localID];
    const secondaryPosition = options["55"]?.value;
    return { ...s, secondaryPosition, league: item.league };
  });
};
const combineStats = () => {
  fs.writeFile(
    "./playerStatsOut.json",
    JSON.stringify([
      ...addLeague(superMega),
      ...addLeague(creators),
      ...addLeague(legends),
    ]),
    (err) => {
      err;
    }
  );
};
// combineStats(); // stats only for CSV output

const combineStatsOptionsData = (item) => {
  return Object.keys(item.options).map((localId) => {
    const playerStats = item.stats.find((stat) => {
      return +stat.localID === +localId;
    });

    if (!playerStats) {
      console.log(localId, "NO STATS!!!!!!");
      return null;
    }
    const secondaryPosition = item.options[localId]["55"]?.value;
    return {
      ...playerStats,
      secondaryPosition,
      league: item.league,
      options: item.options[localId],
    };
  });
};

const smb = combineStatsOptionsData(superMega);
const creat = combineStatsOptionsData(creators);
const leg = combineStatsOptionsData(legends);

// // uncomment to create file // not sure what I'm doing with this output file yet
// fs.writeFile(
//   "./playerWithOptionsOut.json",
//   JSON.stringify([...smb, ...creat, ...leg]),
//   (err) => {
//     err;
//   }
// );
