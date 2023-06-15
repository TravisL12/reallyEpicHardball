const players = require("./statsJson/playerOut.json");

// how do you figure out arsenal???
function findPitcherOptions() {
  return players
    .filter((p) => {
      return p?.pitcherRole > 0 && p?.teamName === "Moose";
    })
    .map((p) => {
      return p.options;
      // const opt = p.options;
      // console.log(p.firstName);
      // return Object.keys(opt).filter((key) => {
      //   const o = opt[key];
      //   return o.value === 0;
      // });
    });
}

console.log(findPitcherOptions());

// const [t, s] = process.argv.slice(2);

// function findTraits(trait, subType) {
//   return players
//     .filter((p) => {
//       const isTrait = +p?.trait === +trait;
//       if (subType) {
//         const isSub = +p?.subType === +subType;
//         return isTrait && isSub;
//       }
//       return isTrait;
//     })
//     .map((p) => `${p.firstName} ${p.lastName} - ${p.teamName}`);
// }

// console.log(t, s, findTraits(t, s));

// const combos = [
//   [null, null],
//   [0, 0],
//   [0, 1],
//   [1, 1],
//   [1, 0],
//   [2, 7],
//   [2, 6],
//   [3, 4],
//   [3, 5],
//   [3, 3],
//   [3, 2],
//   [4, 6],
//   [4, 7],
//   [5, 13],
//   [5, 12],
//   [6, 6],
//   [6, 7],
//   [7, 7],
//   [7, 6],
//   [8, 6],
//   [8, 7],
//   [9, 6],
//   [10, 8],
//   [10, 9],
//   [11, 6],
//   [12, 10],
//   [12, 11],
//   [13, 6],
//   [14, 7],
//   [14, 6],
//   [15, 6],
//   [16, 6],
//   [17, 7],
//   [17, 6],
//   [18, 6],
//   [18, 7],
//   [19, 6],
//   [19, 7],
//   [20, 7],
//   [20, 6],
//   [21, 7],
//   [22, 16],
//   [22, 19],
//   [22, 17],
//   [22, 20],
//   [22, 14],
//   [22, 15],
//   [22, 18],
//   [22, 21],
//   [23, 6],
//   [24, 22],
//   [24, 23],
//   [25, 6],
//   [26, 7],
//   [26, 6],
//   [27, 7],
//   [27, 6],
//   [28, 6],
//   [29, 6],
//   [29, 7],
//   [30, 7],
//   [31, 7],
//   [32, 7],
//   [32, 6],
//   [33, 25],
//   [33, 26],
//   [34, 7],
//   [34, 6],
//   [35, 6],
//   [36, 7],
//   [36, 6],
//   [37, 6],
//   [38, 6],
//   [39, 7],
//   [40, 6],
// ];

// combos.forEach(([t, s]) => {
//   console.log(t, s, findTraits(t, s));
// });
