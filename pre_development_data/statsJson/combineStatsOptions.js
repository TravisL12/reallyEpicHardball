// CONVERT TO CSV:
// npx json2csv -i playersComplete.json -o playersComplete.csv

const fs = require("fs");

const completePlayers = require("./playersComplete.json");

const salaries = require("./statsOptions/salaries.json");
const traitDescriptions = require("./statsOptions/traitsDescription.json");
const playerChemistry = require("./statsOptions/playerChemistry.json");

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
      jerseyNumber: options["20"]?.value
        ? String(parseInt(options["20"]?.value) - 1)
        : "",
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
      playerChemistry: options["107"]?.value
        ? playerChemistry[options["107"]?.value].name
        : "",
      salary: salaries[localID],
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

const sortTeamsPlayersByJersey = () => {
  const teams = completePlayers.reduce((acc, player) => {
    if (!acc[player.teamName]) {
      acc[player.teamName] = [];
    }

    acc[player.teamName].push(player);

    acc[player.teamName] = acc[player.teamName].sort((a, b) => {
      return +a.jerseyNumber > +b.jerseyNumber ? 1 : -1;
    });

    return acc;
  }, {});

  const teamsPlayerNamesOnly = Object.keys(teams).reduce((acc, team) => {
    acc[team] = teams[team].map((player) => {
      const { localID, firstName, lastName, jerseyNumber } = player;
      return { id: localID, firstName, lastName, jerseyNumber };
    });
    return acc;
  }, {});

  fs.writeFile(
    "./playersSortedByJersey.json",
    JSON.stringify(teamsPlayerNamesOnly),
    (err) => {
      err;
    }
  );
};

combineStats(); // stats only for CSV output
// sortTeamsPlayersByJersey(); // doesn't snake case the team names BEWARE
