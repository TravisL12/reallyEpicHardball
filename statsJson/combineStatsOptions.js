// CONVERT TO CSV:
// npx json2csv -i playersComplete.json -o playersComplete.csv

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

    if (acc[localID] && s.trait && s.subType) {
      acc[localID].trait2 = traitDescriptions[traitId].description;
      acc[localID].chemistry2 = traitDescriptions[traitId].chemistry;
      return acc;
    }

    const options = item.options[localID];
    // options

    acc[localID] = {
      ...s,
      league: item.league,
      gender: options["0"]?.value || "",
      throws: options["4"]?.value || "",
      bats: options["5"]?.value || "",
      secondaryPosition: options["55"]?.value || "",
      rating: options["53"]?.value || "",
      trait1: traitDescriptions[traitId]?.description,
      chemistry1: traitDescriptions[traitId]?.chemistry,
      trait2: "",
      chemistry2: "",
      careerStart: options["112"]?.value || "",
      careerEnd: options["113"]?.value || "",
      // Pitcher stuff
      fourSeamFastball: options["58"]?.value || "",
      twoSeamFastball: options["59"]?.value || "",
      screwball: options["60"]?.value || "",
      changeup: options["61"]?.value || "",
      forkball: options["62"]?.value || "",
      curveball: options["63"]?.value || "",
      slider: options["64"]?.value || "",
      cutFastball: options["65"]?.value || "",
      windup: options["48"]?.value || "",
      pitchAngle: options["49"]?.value || "",
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
