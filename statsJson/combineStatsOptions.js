const fs = require("fs");

const traitDescriptions = require("./traitsDescription.json");

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
    // options
    const gender = options["0"]?.value;
    const throws = options["4"]?.value;
    const bats = options["5"]?.value;
    const secondaryPosition = options["55"]?.value;
    const rating = options["53"]?.value;

    // Pitcher stuff
    const fourSeamFastball = options["58"]?.value;
    const twoSeamFastball = options["59"]?.value;
    const screwball = options["60"]?.value;
    const changeup = options["61"]?.value;
    const forkball = options["62"]?.value;
    const curveball = options["63"]?.value;
    const slider = options["64"]?.value;
    const cutFastball = options["65"]?.value;

    const windup = options["48"]?.value;
    const pitchAngle = options["49"]?.value;

    return {
      ...s,
      secondaryPosition,
      gender,
      throws,
      bats,
      fourSeamFastball,
      twoSeamFastball,
      screwball,
      changeup,
      forkball,
      curveball,
      slider,
      cutFastball,
      windup,
      pitchAngle,
      rating,
      league: item.league,
    };
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
combineStats(); // stats only for CSV output
