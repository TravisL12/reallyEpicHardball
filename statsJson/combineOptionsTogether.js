const fs = require("fs");
// const smbOptionData = require("./SuperMegaOptions.json");

// code to convert the array of json options (...Options.json) into the object file (...OptionsData.json)
function reducePlayers(players) {
  return players.reduce((acc, player) => {
    if (!acc[player.baseballPlayerLocalID]) {
      acc[player.baseballPlayerLocalID] = {};
    }
    acc[player.baseballPlayerLocalID][player.optionKey] = {
      value: player.optionValue,
      type: player.optionType,
    };
    return acc;
  }, {});
}

// fs.writeFile(
//   "./smbOptionsData.json",
//   JSON.stringify(reducePlayers(smbOptionData)),
//   (err) => {
//     err;
//   }
// );
