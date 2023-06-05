// CONVERT TO CSV: npx json2csv -i playersComplete.json -o playersComplete.csv

const fs = require("fs");

const traitDescriptions = require("./statsOptions/traitsDescription.json");

const creatorsOptions = require("./statsOptions/creatorsOptions.json");
const creatorsStats = require("./statsOptions/creatorsStats.json");

const legendsOptions = require("./statsOptions/legendsOptions.json");
const legendsStats = require("./statsOptions/legendsStats.json");

const superMegaOptions = require("./statsOptions/superMegaOptions.json");
const superMegaStats = require("./statsOptions/superMegaStats.json");

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
  return item.stats.reduce((acc, s) => {
    const localID = s.localID;
    const traitId = `${s.trait}${s.subType}`;

    if (acc[localID]) {
      if (s.trait && s.subType) {
        acc[localID].trait2 = traitDescriptions[traitId].description;
        acc[localID].chemistry2 = traitDescriptions[traitId].chemistry;
      }
      return acc;
    }

    const options = item.options[localID];
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

    acc[localID] = {
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
      trait1: traitDescriptions[traitId]?.description,
      chemistry1: traitDescriptions[traitId]?.chemistry,
      trait2: "",
      chemistry2: "",
    };

    return acc;
  }, {});
};
const combineStats = () => {
  fs.writeFile(
    "./playersComplete.json",
    JSON.stringify([
      ...Object.values(addLeague(superMega)),
      ...Object.values(addLeague(creators)),
      ...Object.values(addLeague(legends)),
    ]),
    (err) => {
      err;
    }
  );
};
combineStats(); // stats only for CSV output
