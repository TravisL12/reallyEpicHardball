const transformPlayer = (player) => {
  const { team, league, trait1, trait2 } = player;
  return {
    ...player,
    team: team?.name,
    league: league?.name,
    trait1: trait1?.type,
    trait2: trait2?.type,
  };
};

module.exports = { transformPlayer };
