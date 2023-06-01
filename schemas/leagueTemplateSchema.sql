CREATE TABLE sqlite_stat1(tbl,idx,stat);
CREATE TABLE [t_team_types] (
  [teamType] INTEGER NOT NULL PRIMARY KEY, 
  [typeName] TEXT);
CREATE TABLE [t_leagues] (
  [GUID] BLOB NOT NULL, 
  [originalGUID] BLOB CONSTRAINT [fk_t_leagues_historical_link] REFERENCES [t_leagues]([GUID]) ON DELETE CASCADE DEFAULT NULL, 
  [name] TEXT NOT NULL, 
  [allowedTeamType] INTEGER NOT NULL CONSTRAINT [fk_t_leagues_t_team_types] REFERENCES [t_team_types]([teamType]), [leagueIcon] INTEGER NOT NULL DEFAULT 0, [hasEditedAvailablePlayer] BOOL NOT NULL DEFAULT 0, 
  CONSTRAINT [sqlite_autoindex_t_leagues_1] PRIMARY KEY ([GUID]));
CREATE TABLE [t_divisions] (
  [GUID] BLOB NOT NULL, 
  [conferenceGUID] BLOB NOT NULL CONSTRAINT [fk_conference] REFERENCES [t_conferences]([GUID]) ON DELETE CASCADE, 
  [name] TEXT, 
  CONSTRAINT [sqlite_autoindex_t_divisions_1] PRIMARY KEY ([GUID]));
CREATE TABLE [t_division_teams] (
  [divisionGUID] BLOB NOT NULL CONSTRAINT [fk_division] REFERENCES [t_divisions]([GUID]) ON DELETE CASCADE, 
  [teamGUID] BLOB NOT NULL CONSTRAINT [fk_team] REFERENCES [t_teams]([GUID]) ON DELETE RESTRICT);
CREATE TABLE [t_pitching_rotations] (
  [lineupGUID] BLOB NOT NULL CONSTRAINT [fk_t_pitching_rotations_t_lineups] REFERENCES [t_lineups]([GUID]) ON DELETE CASCADE, 
  [pitchingRotation] INTEGER NOT NULL, 
  [pitcherGUID] BLOB NOT NULL CONSTRAINT [fk_t_pitching_rotations_t_baseball_players] REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE, 
  CONSTRAINT [sqlite_autoindex_t_pitching_rotations_1] PRIMARY KEY ([lineupGUID], [pitchingRotation]));
CREATE TABLE [t_playoffs] (
  [GUID] BLOB NOT NULL, 
  [seasonGUID] BLOB NOT NULL CONSTRAINT [fk_t_playoffs_t_seasons] REFERENCES [t_seasons]([GUID]) ON DELETE CASCADE, 
  [seriesLength] INTEGER NOT NULL DEFAULT 1, 
  [rounds] INTEGER NOT NULL DEFAULT 1, 
  CONSTRAINT [cnst_series_length_nonnegative] CHECK(seriesLength > 0), 
  CONSTRAINT [sqlite_autoindex_t_playoffs_1] PRIMARY KEY ([GUID]));
CREATE TABLE [t_playoff_series] (
  [playoffGUID] BLOB NOT NULL CONSTRAINT [fk_t_playoff_series_t_playoffs] REFERENCES [t_playoffs]([GUID]) ON DELETE CASCADE, 
  [seriesNumber] INTEGER NOT NULL, 
  [team1GUID] BLOB NOT NULL CONSTRAINT [fk_t_playoff_series_t_teams_1] REFERENCES [t_teams]([GUID]), 
  [team2GUID] BLOB NOT NULL CONSTRAINT [fk_t_playoff_series_t_teams_2] REFERENCES [t_teams]([GUID]), 
  [team1Standing] INTEGER NOT NULL, 
  [team2Standing] INTEGER NOT NULL, 
  CONSTRAINT [sqlite_autoindex_t_playoff_series_1] PRIMARY KEY ([playoffGUID], [seriesNumber]));
CREATE TABLE [t_team_logo_element_types] (
  [logoElementType] INTEGER NOT NULL PRIMARY KEY, 
  [typeName] TEXT);
CREATE TABLE [t_team_logo_types] (
  [logoType] INTEGER NOT NULL PRIMARY KEY, 
  [typeName] TEXT);
CREATE TABLE [t_season_pitch_counts] (
  [seasonGUID] BLOB NOT NULL CONSTRAINT [fk_t_season_pitch_counts_t_seasons] REFERENCES [t_seasons]([GUID]) ON DELETE CASCADE, 
  [pitcherGUID] BLOB NOT NULL CONSTRAINT [fk_t_season_pitch_counts_t_baseball_players] REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE, 
  [prevGamePitchCount0] INTEGER NOT NULL DEFAULT 0, 
  [prevGamePitchCount1] INTEGER NOT NULL DEFAULT 0, 
  [prevGamePitchCount2] INTEGER NOT NULL DEFAULT 0, 
  CONSTRAINT [sqlite_autoindex_t_season_pitch_counts_1] PRIMARY KEY ([seasonGUID], [pitcherGUID])) WITHOUT ROWID;
CREATE TABLE [t_team_logo_attributes] (
  [teamLogoGUID] BLOB NOT NULL CONSTRAINT [fk_team_logo] REFERENCES [t_team_logos]([GUID]) ON DELETE CASCADE, 
  [optionKey] INTEGER, 
  [colorKey] INTEGER, 
  [optionValueInt] INTEGER, 
  [optionValueFloat] FLOAT, 
  [optionValueText] TEXT, 
  [optionType] INTEGER NOT NULL);
CREATE TABLE [t_team_local_ids] (
  [localID] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  [GUID] BLOB NOT NULL CONSTRAINT [fk_t_team_local_ids_t_teams] REFERENCES [t_teams]([GUID]) ON DELETE CASCADE);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE [t_baseball_player_local_ids] (
  [localID] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  [GUID] BLOB NOT NULL CONSTRAINT [fk_t_baseball_player_local_ids_t_baseball_players] REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE);
CREATE TABLE [t_team_attributes] (
  [teamLocalID] INTEGER NOT NULL CONSTRAINT [fk_team] REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED, 
  [optionKey] INTEGER, 
  [colorKey] INTEGER, 
  [optionValueInt] INTEGER, 
  [optionValueFloat] FLOAT, 
  [optionValueText] TEXT, 
  [optionType] INTEGER NOT NULL);
CREATE TABLE [t_baseball_player_options] (
  [baseballPlayerLocalID] INTEGER NOT NULL CONSTRAINT [fk_t_baseball_player_options_t_baseball_player_local_ids] REFERENCES [t_baseball_player_local_ids]([localID]) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED, 
  [optionKey] INTEGER NOT NULL, 
  [optionValue] OPTIONVALUE NOT NULL, 
  [optionType] INTEGER NOT NULL, 
  CONSTRAINT [sqlite_autoindex_t_baseball_player_integer_attributes_1] PRIMARY KEY ([baseballPlayerLocalID], [optionKey])) WITHOUT ROWID;
CREATE TABLE [t_baseball_player_colors] (
  [baseballPlayerLocalID] INTEGER NOT NULL CONSTRAINT [fk_t_baseball_player_colors_t_baseball_player_local_ids] REFERENCES [t_baseball_player_local_ids]([localID]) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED, 
  [colorKey] INTEGER NOT NULL, 
  [colorValue] COLORVALUE NOT NULL, 
  [colorType] INTEGER NOT NULL, 
  CONSTRAINT [sqlite_autoindex_t_baseball_player_colors_1] PRIMARY KEY ([baseballPlayerLocalID], [colorKey])) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS "t_standard_edited_teams" (  [teamGUID] BLOB NOT NULL CONSTRAINT [fk_t_standard_edited_teams_t_teams] REFERENCES [t_teams]([GUID]) ON DELETE CASCADE,  [edited] BOOL NOT NULL,  CONSTRAINT [sqlite_autoindex_t_standard_edited_teams_1] PRIMARY KEY ([teamGUID]));
CREATE TABLE [t_conferences](
  [GUID] BLOB CONSTRAINT [sqlite_autoindex_t_conferences_1] PRIMARY KEY NOT NULL, 
  [leagueGUID] BLOB NOT NULL CONSTRAINT [fk_league] REFERENCES [t_leagues]([GUID]) ON DELETE CASCADE, 
  [name] TEXT, 
  [usesDesignatedHitter] BOOLEAN NOT NULL);
CREATE TABLE [t_franchise_seasons](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE, 
  [seasonGUID] BLOB NOT NULL UNIQUE REFERENCES [t_seasons]([GUID]), 
  PRIMARY KEY([franchiseGUID], [seasonGUID])) WITHOUT ROWID;
CREATE TABLE [t_starting_lineups](
  [startingLineupID] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [lineupGUID] BLOB NOT NULL REFERENCES [t_lineups]([GUID]) ON DELETE CASCADE, 
  [usesDesignatedHitter] BOOL NOT NULL);
CREATE TABLE IF NOT EXISTS "t_batting_orders" (
  [startingLineupID] INTEGER NOT NULL CONSTRAINT [fk_t_batting_orders_t_starting_lineups] REFERENCES [t_starting_lineups]([startingLineupID]) ON DELETE CASCADE, 
  [battingOrder] INTEGER NOT NULL, 
  [baseballPlayerGUID] BLOB NOT NULL CONSTRAINT [fk_t_batting_orders_t_baseball_players] REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE, 
  CONSTRAINT [sqlite_autoindex_t_batting_orders_1] PRIMARY KEY ([startingLineupID], [battingOrder]));
CREATE TABLE IF NOT EXISTS "t_defensive_positions" (
  [startingLineupID] INTEGER NOT NULL CONSTRAINT [fk_t_defensive_positions_t_lineups] REFERENCES [t_starting_lineups]([startingLineupID]) ON DELETE CASCADE, 
  [defensivePosition] INTEGER NOT NULL, 
  [baseballPlayerGUID] BLOB NOT NULL CONSTRAINT [fk_t_defensive_positions_t_baseball_players] REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE, 
  CONSTRAINT [sqlite_autoindex_t_defensive_positions_1] PRIMARY KEY ([startingLineupID], [defensivePosition]));
CREATE TABLE [t_franchise_season_creation_params](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE, 
  [seasonLength] INTEGER NOT NULL, 
  [innings] INTEGER NOT NULL, 
  [playoffSeriesLength] INTEGER NOT NULL, 
  [playoffRounds] INTEGER NOT NULL, [zombieRunnerStartInning] INTEGER NOT NULL DEFAULT 0);
CREATE TABLE [t_save_data_validity](
  [lock] BOOL PRIMARY KEY NOT NULL DEFAULT 1, 
  [isUserModified] BOOL NOT NULL DEFAULT 0, 
  CHECK(lock = 1));
CREATE TABLE [t_salary](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE, 
  [baseballPlayerGUID] BLOB NOT NULL REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE, 
  [salary] INTEGER NOT NULL DEFAULT 0, 
  PRIMARY KEY([franchiseGUID], [baseballPlayerGUID]));
CREATE TABLE [t_franchise_available_players](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE, 
  [baseballPlayerGUID] BLOB NOT NULL REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE, ticksSinceAdded INTEGER NOT NULL DEFAULT 0, ticksSinceLastSalaryDrop INTEGER NOT NULL DEFAULT 0, [watched] BOOL NOT NULL DEFAULT 0, 
  PRIMARY KEY([franchiseGUID], [baseballPlayerGUID]));
CREATE TABLE [t_franchise_team_cash](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE, 
  [teamGUID] BLOB NOT NULL REFERENCES [t_teams]([GUID]) ON DELETE CASCADE,
  [cash] INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS "t_baseball_players"(
  [GUID] BLOB CONSTRAINT [sqlite_autoindex_t_baseball_players_1] PRIMARY KEY NOT NULL,
  [originalGUID] BLOB DEFAULT NULL CONSTRAINT [fk_baseball_players_historical_link] REFERENCES [t_baseball_players]([GUID]) ON DELETE SET NULL,
  [teamGUID] BLOB CONSTRAINT [fk_team] REFERENCES [t_teams]([GUID]) ON DELETE CASCADE,
  [power] INTEGER NOT NULL,
  [contact] INTEGER NOT NULL,
  [speed] INTEGER NOT NULL,
  [fielding] INTEGER NOT NULL,
  [arm] INTEGER,
  [velocity] INTEGER,
  [junk] INTEGER,
  [accuracy] INTEGER,
  [age] INTEGER NOT NULL DEFAULT 18);
CREATE TABLE [t_team_logos](
  [GUID] BLOB CONSTRAINT [sqlite_autoindex_t_team_logos_1] PRIMARY KEY NOT NULL, 
  [teamGUID] BLOB NOT NULL CONSTRAINT [fk_team] REFERENCES [t_teams]([GUID]) ON DELETE CASCADE, 
  [logoType] INTEGER NOT NULL CONSTRAINT [fk_logo_type] REFERENCES [t_team_logo_types]([logoType]), 
  [logoElementType] INTEGER NOT NULL CONSTRAINT [fk_logo_element_type] REFERENCES [t_team_logo_element_types]([logoElementType]), 
  [logoComponentName] TEXT, 
  [positionX] FLOAT, 
  [positionY] FLOAT, 
  [rotation] FLOAT, 
  [scale] FLOAT, 
  [mirrored] BOOL, 
  [font] INTEGER, 
  [fontStyle] INTEGER, 
  [fontStyleAmount] INTEGER, 
  [fontStyleOffset] INTEGER, 
  [fontSpacing] INTEGER, 
  [outlineWidth] INTEGER, 
  [ordering] INTEGER NOT NULL DEFAULT 0);
CREATE TABLE [t_franchise_training](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE,
  [baseballPlayerGUID] BLOB NOT NULL REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE,
  [slot] INTEGER,
  [trainingProgram] INTEGER NOT NULL,
  [cost] INTEGER NOT NULL,
  [purchased] BOOL NOT NULL DEFAULT 0,
  [ticksSinceBirth] INTEGER NOT NULL DEFAULT 0, [trait] INTEGER DEFAULT NULL, [traitSubType] INTEGER DEFAULT NULL, minimumLifetimeTicks INTEGER NOT NULL DEFAULT 0, [pitchType] INTEGER DEFAULT NULL, [secondaryPosition] INTEGER DEFAULT NULL);
CREATE TABLE [t_season_user_controlled_teams](
  [seasonGUID] BLOB NOT NULL REFERENCES [t_seasons]([GUID]) ON DELETE CASCADE, 
  [teamGUID] BLOB NOT NULL REFERENCES [t_teams]([GUID]) ON DELETE CASCADE, 
  PRIMARY KEY([seasonGUID], [teamGUID]));
CREATE TABLE [t_franchise_local_ids] (
  [localID] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  [GUID] BLOB NOT NULL CONSTRAINT [fk_t_franchise_local_ids_t_franchise] REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE);
CREATE TABLE [t_franchise_news_trait_changes](
  [trainingOutcomeID] INTEGER NOT NULL REFERENCES [t_franchise_news_training_outcome]([trainingOutcomeID]) ON DELETE CASCADE, 
  [traitID] INTEGER NOT NULL, 
  [subType] INTEGER,
  [acquired] BOOLEAN NOT NULL);
CREATE TABLE [t_franchise_news](
  [newsEntryID] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, 
  [franchiseLocalID] INTEGER NOT NULL REFERENCES [t_franchise_local_ids]([localID]) ON DELETE CASCADE, 
  [newsType] INTEGER NOT NULL, 
  [loreVariant] INTEGER NOT NULL, 
  [leftSide] BOOLEAN NOT NULL);
CREATE TABLE [t_franchise_news_skill_changes](
  [trainingOutcomeID] INTEGER NOT NULL REFERENCES [t_franchise_news_training_outcome]([trainingOutcomeID]) ON DELETE CASCADE, 
  [skillType] INTEGER NOT NULL, 
  [skillDelta] INTEGER NOT NULL);
CREATE TABLE [t_franchise_news_players](
  [newsPlayerID] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, 
  [franchiseLocalID] INTEGER NOT NULL REFERENCES [t_franchise_local_ids]([localID]) ON DELETE CASCADE, 
  [playerLocalID] INTEGER REFERENCES [t_baseball_player_local_ids]([localID]) ON DELETE SET NULL, 
  [firstName] TEXT DEFAULT NULL, 
  [lastName] TEXT DEFAULT NULL);
CREATE TABLE [t_franchise_news_championship](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE, 
  [teamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]));
CREATE TABLE [t_franchise_retired_players](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE, 
  [baseballPlayerGUID] BLOB NOT NULL UNIQUE REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE);
CREATE TABLE [t_franchise_resigned_players](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE, 
  [baseballPlayerGUID] BLOB NOT NULL UNIQUE REFERENCES [t_franchise_available_players]([baseballPlayerGUID]) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS "t_franchise"(
  [GUID] BLOB PRIMARY KEY NOT NULL, 
  [leagueGUID] BLOB NOT NULL UNIQUE REFERENCES [t_leagues]([GUID]) ON DELETE CASCADE, 
  [playerTeamGUID] BLOB NOT NULL REFERENCES [t_teams]([GUID]), 
  [completionDate] DATETIME,
  [inOffSeason] BOOLEAN NOT NULL DEFAULT 0,
  [offSeasonTicksCompleted] INTEGER NOT NULL DEFAULT 0,
  [incomePerTick] INTEGER NOT NULL, ticksUntilTrainingRespawn INTEGER, [containsUGC] BOOL NOT NULL DEFAULT 0);
CREATE TABLE [t_achievement_completed_games_won](
  [seasonGUID] BLOB PRIMARY KEY NOT NULL REFERENCES [t_seasons]([GUID]) ON DELETE CASCADE, 
  [completeGameWins] INTEGER NOT NULL DEFAULT 0);
CREATE TABLE [t_franchise_players_leaving_player_team](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE, 
  [baseballPlayerGUID] BLOB PRIMARY KEY NOT NULL REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE, 
  [playerSalaryAtTimeOfLeaving] INTEGER NOT NULL, 
  [reasonForLeaving] INTEGER NOT NULL);
CREATE TABLE [t_franchise_news_roster_acquisition](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE,
  [teamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]),
  [playerSnapshot] INTEGER NOT NULL UNIQUE REFERENCES [t_franchise_news_player_snapshot]([snapshotID]),
  [salaryWhenAcquired] INTEGER NOT NULL, playerWatched BOOLEAN NOT NULL DEFAULT 0);
CREATE TABLE [t_franchise_news_resigned](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE,
  [teamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]),
  [playerSnapshot] INTEGER NOT NULL REFERENCES [t_franchise_news_player_snapshot]([snapshotID]),
  [salaryWhenReleased] INTEGER NOT NULL,
  [newAskingSalary] INTEGER NOT NULL);
CREATE TABLE [t_franchise_news_income](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE,
  [teamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]),
  [cashIncome] INTEGER NOT NULL);
CREATE TABLE [t_franchise_news_traded](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE, 
  [teamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]), 
  [signedPlayerSnapshot] INTEGER NOT NULL REFERENCES [t_franchise_news_player_snapshot]([snapshotID]), 
  [signedPlayerSalary] INTEGER NOT NULL, 
  [releasedPlayerSnapshot] INTEGER NOT NULL REFERENCES [t_franchise_news_player_snapshot]([snapshotID]), 
  [releasedPlayerSalary] INTEGER NOT NULL, signedPlayerWatched BOOLEAN NOT NULL DEFAULT 0);
CREATE TABLE [t_franchise_news_training_available](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE,
  [teamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]),
  [playerSnapshot] INTEGER NOT NULL REFERENCES [t_franchise_news_player_snapshot]([snapshotID]),
  [trainingProgram] INTEGER NOT NULL,
  [cost] INTEGER NOT NULL,
  [trait] INTEGER,
  [traitSubType] INTEGER,
  [gainTrait] BOOLEAN, [pitchType] INTEGER DEFAULT NULL, [secondaryPosition] INTEGER DEFAULT NULL);
CREATE TABLE [t_franchise_news_training_outcome](
  [trainingOutcomeID] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL UNIQUE, 
  [newsEntryID] INTEGER NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE,
  [playerSnapshot] INTEGER NOT NULL REFERENCES [t_franchise_news_player_snapshot]([snapshotID]),
  [trainingProgram] INTEGER NOT NULL,
  [cost] INTEGER NOT NULL,
  [trait] INTEGER,
  [traitSubType] INTEGER,
  [gainTrait] BOOLEAN,
  [teamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]), [acquiredPitchType] BOOL NOT NULL DEFAULT 0, [acquiredSecondaryPosition] BOOL NOT NULL DEFAULT 0, [pitchType] INTEGER DEFAULT NULL, [secondaryPosition] INTEGER DEFAULT NULL);
CREATE TABLE [t_franchise_news_salary_change](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE,
  [playerSnapshot] INTEGER NOT NULL REFERENCES [t_franchise_news_player_snapshot]([snapshotID]),
  [oldSalary] INTEGER NOT NULL,
  [newSalary] INTEGER NOT NULL);
CREATE TABLE [t_franchise_news_retired](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE, 
  [teamLocalID] INTEGER REFERENCES [t_team_local_ids]([localID]), 
  [playerSnapshot] INTEGER NOT NULL REFERENCES [t_franchise_news_player_snapshot]([snapshotID]));
CREATE TABLE [t_franchise_news_game_result](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE, 
  [homeTeamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]), 
  [awayTeamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]), 
  [homeTeamScore] INTEGER NOT NULL, 
  [awayTeamScore] INTEGER NOT NULL,
  [gameNumber] INTEGER NOT NULL,
  [seriesOrSeasonLength] INTEGER NOT NULL,
  [round] INTEGER,
  [conferences] INTEGER);
CREATE TABLE [t_franchise_news_negotiation_round_result](
  [newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE, 
  [round] INTEGER NOT NULL,
  [playersPickedUpByAITeams] INTEGER NOT NULL);
CREATE TABLE [t_franchise_news_resigned_group_player](
  [newsEntryID] INTEGER NOT NULL REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE,
  [teamLocalID] INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]),
  [playerSnapshot] INTEGER NOT NULL REFERENCES [t_franchise_news_player_snapshot]([snapshotID]),
  [salaryWhenReleased] INTEGER NOT NULL,
  [newAskingSalary] INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS "t_franchise_news_player_snapshot"(
  [snapshotID] INTEGER PRIMARY KEY,
  [newsEntryID] INTEGER NOT NULL REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE,
  [newsPlayerID] INTEGER NOT NULL REFERENCES [t_franchise_news_players]([newsPlayerID]) ON DELETE CASCADE,
  [primaryPos] INTEGER NOT NULL,
  [secondaryPos] INTEGER,
  [pitcherRole] INTEGER,
  [age] INTEGER NOT NULL,
  [overallSkill] INTEGER NOT NULL,
  [power] INTEGER NOT NULL,
  [contact] INTEGER NOT NULL,
  [speed] INTEGER NOT NULL,
  [fielding] INTEGER NOT NULL,
  [arm] INTEGER,
  [velocity] INTEGER, 
  [junk] INTEGER,
  [accuracy] INTEGER,
  [trait1ID] INTEGER,
  [trait1Subtype] INTEGER,
  [trait2ID] INTEGER,
  [trait2Subtype] INTEGER,
  [bakedHash] INTEGER,
  UNIQUE([newsEntryID], [newsPlayerID]));
CREATE TABLE IF NOT EXISTS "t_season_player_condition" (
  [seasonGUID] BLOB NOT NULL CONSTRAINT [fk_t_season_player_condition_t_seasons] REFERENCES [t_seasons]([GUID]) ON DELETE CASCADE, 
  [baseballPlayerGUID] BLOB NOT NULL CONSTRAINT [fk_t_season_player_condition_t_baseball_players] REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE, 
  [mojoOffset] FLOAT NOT NULL, 
  [fitnessOffset] FLOAT NOT NULL,
  PRIMARY KEY ([seasonGUID], [baseballPlayerGUID])) WITHOUT ROWID;
CREATE TABLE IF NOT EXISTS "t_lineups" (
       [GUID] BLOB NOT NULL,
       [teamGUID] BLOB NOT NULL CONSTRAINT [fk_t_lineups_t_teams] REFERENCES [t_teams]([GUID]) ON DELETE CASCADE,
       [lineupType] INTEGER NOT NULL DEFAULT 0,
       CONSTRAINT [sqlite_autoindex_t_lineups_1] PRIMARY KEY ([GUID])
);
CREATE TABLE IF NOT EXISTS "t_seasons"(
  [ID] INTEGER PRIMARY KEY AUTOINCREMENT,
  [GUID] BLOB NOT NULL UNIQUE,
  [historicalLeagueGUID] BLOB NOT NULL CONSTRAINT [fk_league] REFERENCES [t_leagues]([GUID]) ON DELETE CASCADE, 
  [completionDate] DATETIME,
  [innings] INTEGER NOT NULL DEFAULT 9,
  [elimination] BOOL NOT NULL DEFAULT 0, [zombieRunnerStartInning] INTEGER NOT NULL DEFAULT 0, [containsUGC] BOOL NOT NULL DEFAULT 0);
CREATE TABLE [t_league_local_ids] (
  [localID] INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, 
  [GUID] BLOB NOT NULL CONSTRAINT [fk_t_league_local_ids_t_leagues] REFERENCES [t_leagues]([GUID]) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS "t_stats"(
  [aggregatorID] INTEGER PRIMARY KEY AUTOINCREMENT,
  [aggregatorGUID] BLOB NOT NULL UNIQUE, 
  [statsPlayerID] INTEGER NOT NULL REFERENCES [t_stats_players]([statsPlayerID]) ON DELETE CASCADE,
  [currentTeamLocalID] INTEGER REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE,
  [mostRecentlyPlayedTeamLocalID] INTEGER REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE,
  [previousRecentlyPlayedTeamLocalID] INTEGER REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS "t_stats_batting"(
  [aggregatorID] INTEGER CONSTRAINT [sqlite_autoindex_t_stats_batting_1] PRIMARY KEY NOT NULL REFERENCES [t_stats]([aggregatorID]) ON DELETE CASCADE, 
  [gamesBatting] INTEGER NOT NULL DEFAULT 0, 
  [gamesPlayed] INTEGER NOT NULL DEFAULT 0, 
  [atBats] INTEGER NOT NULL DEFAULT 0, 
  [runs] INTEGER NOT NULL DEFAULT 0, 
  [hits] INTEGER NOT NULL DEFAULT 0, 
  [doubles] INTEGER NOT NULL DEFAULT 0, 
  [triples] INTEGER NOT NULL DEFAULT 0, 
  [homeruns] INTEGER NOT NULL DEFAULT 0, 
  [rbi] INTEGER NOT NULL DEFAULT 0, 
  [stolenBases] INTEGER NOT NULL DEFAULT 0, 
  [caughtStealing] INTEGER NOT NULL DEFAULT 0, 
  [baseOnBalls] INTEGER NOT NULL DEFAULT 0, 
  [strikeOuts] INTEGER NOT NULL DEFAULT 0, 
  [hitByPitch] INTEGER NOT NULL DEFAULT 0, 
  [sacrificeHits] INTEGER NOT NULL DEFAULT 0, 
  [sacrificeFlies] INTEGER NOT NULL DEFAULT 0, 
  [errors] INTEGER NOT NULL DEFAULT 0, 
  [passedBalls] INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS "t_stats_pitching"(
  [aggregatorID] INTEGER CONSTRAINT [sqlite_autoindex_t_stats_pitching_1] PRIMARY KEY NOT NULL REFERENCES [t_stats]([aggregatorID]) ON DELETE CASCADE, 
  [wins] INTEGER NOT NULL DEFAULT 0, 
  [losses] INTEGER NOT NULL DEFAULT 0, 
  [games] INTEGER NOT NULL DEFAULT 0, 
  [gamesStarted] INTEGER NOT NULL DEFAULT 0, 
  [completeGames] INTEGER NOT NULL DEFAULT 0, 
  [totalPitches] INTEGER NOT NULL DEFAULT 0, 
  [gamesPlayed] INTEGER NOT NULL DEFAULT 0, 
  [shutouts] INTEGER NOT NULL DEFAULT 0, 
  [saves] INTEGER NOT NULL DEFAULT 0, 
  [outsPitched] INTEGER NOT NULL DEFAULT 0, 
  [hits] INTEGER NOT NULL DEFAULT 0, 
  [earnedRuns] INTEGER NOT NULL DEFAULT 0, 
  [homeRuns] INTEGER NOT NULL DEFAULT 0, 
  [baseOnBalls] INTEGER NOT NULL DEFAULT 0, 
  [strikeOuts] INTEGER NOT NULL DEFAULT 0, 
  [battersHitByPitch] INTEGER NOT NULL DEFAULT 0, 
  [battersFaced] INTEGER NOT NULL DEFAULT 0, 
  [gamesFinished] INTEGER NOT NULL DEFAULT 0, 
  [runsAllowed] INTEGER NOT NULL DEFAULT 0, 
  [wildPitches] INTEGER NOT NULL DEFAULT 0);
CREATE TABLE IF NOT EXISTS "t_season_stats"(
  [seasonID] INTEGER NOT NULL CONSTRAINT [fk_t_season_stats_t_seasons] REFERENCES [t_seasons]([ID]) ON DELETE CASCADE, 
  [aggregatorID] INTEGER NOT NULL REFERENCES [t_stats]([aggregatorID]) ON DELETE CASCADE, 
  UNIQUE([seasonID], [aggregatorID]));
CREATE TABLE IF NOT EXISTS "t_playoff_stats"(
  [seasonID] INTEGER NOT NULL CONSTRAINT [fk_t_playoff_stats_t_seasons] REFERENCES [t_seasons]([ID]) ON DELETE CASCADE, 
  [aggregatorID] INTEGER NOT NULL REFERENCES [t_stats]([aggregatorID]) ON DELETE CASCADE, 
  UNIQUE([seasonID], [aggregatorID]));
CREATE TABLE [t_career_season_stats](
  [franchiseID] INTEGER NOT NULL CONSTRAINT [fk_t_career_season_stats_t_franchise_local_ids] REFERENCES [t_franchise_local_ids]([localID]) ON DELETE CASCADE, 
  [aggregatorID] INTEGER NOT NULL REFERENCES [t_stats]([aggregatorID]) ON DELETE CASCADE, 
  UNIQUE([franchiseID], [aggregatorID]));
CREATE TABLE [t_career_playoff_stats](
  [franchiseID] INTEGER NOT NULL CONSTRAINT [fk_t_career_playoff_stats_t_franchise_local_ids] REFERENCES [t_franchise_local_ids]([localID]) ON DELETE CASCADE, 
  [aggregatorID] INTEGER NOT NULL REFERENCES [t_stats]([aggregatorID]) ON DELETE CASCADE, 
  UNIQUE([franchiseID], [aggregatorID]));
CREATE TABLE [t_stats_players](
  [statsPlayerID] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [leagueLocalID] INTEGER NOT NULL CONSTRAINT [fk_t_stats_players_t_leagues_local_ids] REFERENCES [t_league_local_ids]([localID]) ON DELETE CASCADE, 
  [baseballPlayerLocalID] INTEGER CONSTRAINT [fk_t_stats_players_t_baseball_player_local_ids] REFERENCES [t_baseball_player_local_ids]([localID]) ON DELETE SET NULL, 
  [firstName] TEXT, 
  [lastName] TEXT, 
  [primaryPos] INTEGER, 
  [secondaryPos] INTEGER, 
  [pitcherRole] INTEGER, 
  [age] INTEGER, 
  [salary] INTEGER, 
  [retirementSeason] INTEGER, 
  [bakedHash] INTEGER);
CREATE TABLE IF NOT EXISTS "t_game_results" (
  [ID] INTEGER PRIMARY KEY AUTOINCREMENT, 
  [homeTeamLocalID] INTEGER CONSTRAINT [fk_t_game_results_t_team_local_ids_home] REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE NOT NULL, 
  [awayTeamLocalID] INTEGER CONSTRAINT [fk_t_game_results_t_team_local_ids_away] REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE NOT NULL, 
  [homeRunsScored] INTEGER NOT NULL, 
  [awayRunsScored] INTEGER NOT NULL, 
  [homePitcherLocalID] INTEGER CONSTRAINT [fk_t_game_results_t_baseball_player_local_ids_home] REFERENCES [t_baseball_player_local_ids]([localID]) ON DELETE SET NULL DEFAULT NULL, 
  [awayPitcherLocalID] INTEGER CONSTRAINT [fk_t_game_results_t_baseball_player_local_ids_away] REFERENCES [t_baseball_player_local_ids]([localID]) ON DELETE SET NULL DEFAULT NULL, 
  [minEgo] INTEGER NOT NULL, 
  [starPoints] INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS "t_game_participants" (
  [gameID] INTEGER NOT NULL CONSTRAINT [fk_t_game_results_t_game_participants] REFERENCES [t_game_results]([ID]) ON DELETE CASCADE, 
  [playerID] BLOB NOT NULL);
CREATE TABLE IF NOT EXISTS "t_season_schedule" (
  [seasonID] INTEGER NOT NULL CONSTRAINT [fk_t_season_schedule_t_seasons] REFERENCES [t_seasons]([ID]) ON DELETE CASCADE, 
  [homeTeamID] INTEGER NOT NULL CONSTRAINT [fk_t_season_schedule_t_teams_home] REFERENCES [t_team_local_ids]([localID]), 
  [awayTeamID] INTEGER NOT NULL CONSTRAINT [fk_t_season_schedule_t_teams_away] REFERENCES [t_team_local_ids]([localID]));
CREATE TABLE IF NOT EXISTS "t_season_games"(
  [seasonID] INTEGER NOT NULL CONSTRAINT [fk_t_season_games_t_seasons] REFERENCES [t_seasons]([ID]) ON DELETE CASCADE, 
  [gameID] INTEGER NOT NULL CONSTRAINT [fk_t_season_games_t_games] REFERENCES [t_game_results]([ID]) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS "t_playoff_games" (
  [playoffGUID] BLOB NOT NULL, 
  [seriesNumber] INTEGER NOT NULL, 
  [gameID] INTEGER NOT NULL CONSTRAINT [fk_t_playoff_series_games_t_game_results] REFERENCES [t_game_results]([ID]) ON DELETE CASCADE, 
  CONSTRAINT [fk_t_playoff_games_t_playoff_series] FOREIGN KEY([playoffGUID], [seriesNumber]) REFERENCES [t_playoff_series]([playoffGUID], [seriesNumber]) ON DELETE CASCADE);
CREATE TABLE t_season_games_played_snapshot (
       seasonID INTEGER NOT NULL REFERENCES [t_seasons]([ID]) ON DELETE CASCADE,
       teamID INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE,
       gamesPlayed INTEGER NOT NULL
);
CREATE TABLE t_season_games_won_lost_snapshot (
       seasonID INTEGER NOT NULL REFERENCES [t_seasons]([ID]) ON DELETE CASCADE,
       teamID INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE,
       gamesWon INTEGER NOT NULL,
       gamesLost INTEGER NOT NULL,
       runsFor INTEGER NOT NULL,
       runsAgainst INTEGER NOT NULL);
CREATE TABLE t_playoff_games_played_snapshot (
       seasonID INTEGER NOT NULL REFERENCES [t_seasons]([ID]) ON DELETE CASCADE,
       teamID INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE,
       gamesPlayed INTEGER NOT NULL
);
CREATE TABLE t_playoff_games_won_lost_snapshot (
       seasonID INTEGER NOT NULL REFERENCES [t_seasons]([ID]) ON DELETE CASCADE,
       teamID INTEGER NOT NULL REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE,
       gamesWon INTEGER NOT NULL,
       gamesLost INTEGER NOT NULL,
       runsFor INTEGER NOT NULL,
       runsAgainst INTEGER NOT NULL);
CREATE TABLE [t_season_summary_snapshot](
  [seasonID] INTEGER PRIMARY KEY REFERENCES [t_seasons]([ID]) ON DELETE CASCADE, 
  [playerTeamID] INTEGER REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE, 
  [minEgo] INTEGER, 
  [maxEgo] INTEGER, 
  [avgEgo] FLOAT, 
  [starPoints] INTEGER, 
  [regularWins] INTEGER, 
  [regularLosses] INTEGER, 
  [playoffWins] INTEGER, 
  [playoffLosses] INTEGER, 
  [seasonGamesPlayed] INTEGER, 
  [seasonLength] INTEGER);
CREATE TABLE [t_fantasy_draft_generated_players](
  [baseballPlayerLocalID] INTEGER NOT NULL REFERENCES [t_baseball_player_local_ids]([localID]) ON DELETE CASCADE,
  PRIMARY KEY([baseballPlayerLocalID]));
CREATE TABLE [t_franchise_pending_available_players](
  [franchiseLocalID] INTEGER NOT NULL REFERENCES [t_franchise_local_ids]([localID]) ON DELETE CASCADE,
  [baseballPlayerLocalID] INTEGER NOT NULL REFERENCES [t_baseball_player_local_ids]([localID]) ON DELETE CASCADE,
  PRIMARY KEY([franchiseLocalID], [baseballPlayerLocalID]));
CREATE TABLE IF NOT EXISTS "t_league_available_players"(
  [leagueLocalID] INTEGER NOT NULL REFERENCES [t_league_local_ids]([localID]) ON DELETE CASCADE, 
  [baseballPlayerLocalID] INTEGER NOT NULL REFERENCES [t_baseball_player_local_ids]([localID]) ON DELETE CASCADE,
  PRIMARY KEY([leagueLocalID], [baseballPlayerLocalID]));
CREATE TABLE IF NOT EXISTS "t_baseball_player_traits" (
 [baseballPlayerLocalID] INTEGER NOT NULL REFERENCES[t_baseball_player_local_ids]([localID]) ON DELETE CASCADE,
 [trait] INTEGER NOT NULL,
 [subType] INTEGER NOT NULL,
 PRIMARY KEY([baseballPlayerLocalID], [trait]));
CREATE TABLE IF NOT EXISTS "t_teams" (
  [GUID] BLOB NOT NULL, 
  [originalGUID] BLOB DEFAULT NULL, 
  [teamName] TEXT NOT NULL, 
  [isBuiltIn] BOOL NOT NULL DEFAULT 0, 
  [isGenerated] BOOL NOT NULL DEFAULT 0, 
  [teamType] INTEGER NOT NULL CONSTRAINT [fk_t_teams_t_team_types] REFERENCES [t_team_types]([teamType]) DEFAULT 1, 
  [templateTeamFamily] INTEGER DEFAULT NULL, 
  [isHistorical] BOOL NOT NULL DEFAULT 0, 
  CONSTRAINT [template_teams_specify_variant] CHECK((teamType != 2 AND templateTeamFamily IS NULL) OR (teamType = 2)), 
  CONSTRAINT [sqlite_autoindex_t_teams_1] PRIMARY KEY ([GUID]));
CREATE TABLE [t_franchise_player_extensions](
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE,
  [baseballPlayerGUID] BLOB NOT NULL REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE, 
  [state] INTEGER NOT NULL,
  PRIMARY KEY([franchiseGUID], [baseballPlayerGUID]));
CREATE TABLE IF NOT EXISTS "t_franchise_news_skill_arc_outcome"(
[newsEntryID] INTEGER PRIMARY KEY NOT NULL UNIQUE REFERENCES [t_franchise_news]([newsEntryID]) ON DELETE CASCADE,
[playerSnapshot] INTEGER NOT NULL REFERENCES [t_franchise_news_player_snapshot]([snapshotID]),
[teamLocalID] INTEGER REFERENCES [t_team_local_ids]([localID]),
[resultType] INTEGER NOT NULL,
[skillType] INTEGER, 
[skillDelta] INTEGER,
[newOverallSkill] INTEGER NOT NULL,
[trait] INTEGER,
[traitSubType] INTEGER,
[pitchType] INTEGER,
[secondaryPosition] INTEGER);
CREATE TABLE IF NOT EXISTS "t_franchise_unavailable_players"(
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE, 
  [baseballPlayerGUID] BLOB NOT NULL REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE,
  ticksSinceAvailable INTEGER,
  [fairMarketSalaryAtSeasonStart] INTEGER,
  [loyalty] INTEGER NOT NULL, 
  PRIMARY KEY([franchiseGUID], [baseballPlayerGUID]));
CREATE TABLE IF NOT EXISTS "t_franchise_manager_moment_player_changes"(
  [managerMomentGUID] BLOB NOT NULL REFERENCES [t_franchise_manager_moments_queue]([GUID]) ON DELETE CASCADE,
  [baseballPlayerGUID] BLOB NOT NULL REFERENCES [t_baseball_players]([GUID]) ON DELETE CASCADE,
  [deltaLoyalty] INTEGER NOT NULL,
  [optionIdx] INTEGER NOT NULL,
  PRIMARY KEY([managerMomentGUID], [baseballPlayerGUID], [optionIdx]));
CREATE TABLE [t_franchise_manager_moments_queue](
  [GUID] BLOB PRIMARY KEY NOT NULL,
  [franchiseGUID] BLOB NOT NULL REFERENCES [t_franchise]([GUID]) ON DELETE CASCADE,
  [momentType] INTEGER NOT NULL,
  [variantIdx] INTEGER NOT NULL);
CREATE INDEX [fk_t_divisions_t_conferences] ON [t_divisions] ([conferenceGUID]);
CREATE INDEX [fk_t_division_teams_t_divisions] ON [t_division_teams] ([divisionGUID]);
CREATE INDEX [fk_t_division_teams_t_teams] ON [t_division_teams] ([teamGUID]);
CREATE INDEX [idx_playoff_series_team1] ON [t_playoff_series] ([team1GUID]);
CREATE INDEX [idx_playoff_series_team2] ON [t_playoff_series] ([team2GUID]);
CREATE INDEX [idx_season_pitcher_pitch_counts] ON [t_season_pitch_counts] ([pitcherGUID]);
CREATE INDEX [idx_player_pitch_rotations] ON [t_pitching_rotations] ([pitcherGUID]);
CREATE UNIQUE INDEX [idx_league_name_unique] ON [t_leagues] ([name], [allowedTeamType]) WHERE originalGUID IS NULL;
CREATE UNIQUE INDEX [idx_division_name_unique] ON [t_divisions] ([conferenceGUID], [name]);
CREATE UNIQUE INDEX [unique_season_for_playoffs] ON [t_playoffs] ([seasonGUID]);
CREATE UNIQUE INDEX [idx_team_logo_attributes_unique_key] ON [t_team_logo_attributes] ([teamLogoGUID], [optionKey], [colorKey]);
CREATE UNIQUE INDEX [unique_pitcher_in_rotation] ON [t_pitching_rotations] ([lineupGUID], [pitcherGUID]);
CREATE UNIQUE INDEX [idx_team_local_ids_unique_team] ON [t_team_local_ids] ([GUID]);
CREATE UNIQUE INDEX [idx_baseball_player_local_ids_unique_player] ON [t_baseball_player_local_ids] ([GUID]);
CREATE INDEX [fk_t_conferences_t_leagues]
ON [t_conferences]([leagueGUID]);
CREATE UNIQUE INDEX [idx_conference_name_unique]
ON [t_conferences](
  [leagueGUID], 
  [name]);
CREATE UNIQUE INDEX [unique_starting_lineups]
ON [t_starting_lineups](
  [lineupGUID], 
  [usesDesignatedHitter]);
CREATE INDEX [idx_player_batting_order] ON [t_batting_orders] ([baseballPlayerGUID]);
CREATE UNIQUE INDEX [unique_lineup_players] ON [t_batting_orders] ([startingLineupID], [baseballPlayerGUID]);
CREATE INDEX [idx_player_defensive_position] ON [t_defensive_positions] ([baseballPlayerGUID]);
CREATE UNIQUE INDEX [unique_defensive_players] ON [t_defensive_positions] ([startingLineupID], [baseballPlayerGUID]);
CREATE UNIQUE INDEX [fk_t_franchise_season_creation_params_t_franchise]
ON [t_franchise_season_creation_params]([franchiseGUID]);
CREATE INDEX [fk_t_salary_t_franchise] ON [t_salary]([franchiseGUID]);
CREATE INDEX [fk_t_salary_t_baseball_players]
ON [t_salary]([baseballPlayerGUID]);
CREATE INDEX [fk_t_franchise_available_players_t_franchise]
ON [t_franchise_available_players]([franchiseGUID]);
CREATE UNIQUE INDEX [fk_t_franchise_available_players_t_baseball_players]
ON [t_franchise_available_players]([baseballPlayerGUID]);
CREATE INDEX [fk_t_franchise_team_cash_t_franchise]
ON [t_franchise_team_cash]([franchiseGUID]);
CREATE UNIQUE INDEX [fk_t_franchise_team_cash_t_teams]
ON [t_franchise_team_cash]([teamGUID]);
CREATE INDEX [fk_t_baseball_players_t_teams]
 ON [t_baseball_players]([teamGUID]);
CREATE INDEX [idx_baseball_players_historical_link]
 ON [t_baseball_players]([originalGUID]);
CREATE INDEX [fk_t_team_logos_t_teams]
ON [t_team_logos](
  [teamGUID], 
  [logoType]);
CREATE INDEX [fk_t_franchise_training_t_franchise] ON [t_franchise_training]([franchiseGUID]);
CREATE INDEX [fk_t_season_user_controlled_teams_t_teams]
ON [t_season_user_controlled_teams]([teamGUID]);
CREATE INDEX [fk_t_season_user_controlled_teams_t_seasons]
ON [t_season_user_controlled_teams]([seasonGUID]);
CREATE UNIQUE INDEX [idx_franchise_local_ids_unique_franchise] ON [t_franchise_local_ids] ([GUID]);
CREATE INDEX [fk_t_franchise_news_trait_changes_t_franchise_news_training_outcome]
ON [t_franchise_news_trait_changes]([trainingOutcomeID]);
CREATE INDEX [fk_t_franchise_news_t_franchise_local_ids]
ON [t_franchise_news]([franchiseLocalID]);
CREATE INDEX [fk_t_franchise_news_skill_changes_t_franchise_news_training_outcome]
ON [t_franchise_news_skill_changes]([trainingOutcomeID]);
CREATE UNIQUE INDEX [fk_t_franchise_news_players_t_baseball_player_local_ids]
ON [t_franchise_news_players]([playerLocalID]);
CREATE INDEX [fk_t_franchise_news_players_t_franchise]
ON [t_franchise_news_players]([franchiseLocalID]);
CREATE INDEX [fk_t_franchise_news_championship_t_team_local_ids]
ON [t_franchise_news_championship]([teamLocalID]);
CREATE INDEX [fk_t_franchise_t_leagues] ON [t_franchise]([leagueGUID]);
CREATE INDEX [fk_t_franchise_t_teams] ON [t_franchise]([playerTeamGUID]);
CREATE UNIQUE INDEX [idx_franchise_training_unique_slots] ON [t_franchise_training] ([franchiseGUID], [slot]);
CREATE INDEX [fk_t_franchise_news_roster_acquisition_t_franchise_news_player_snapshot] ON [t_franchise_news_roster_acquisition]([playerSnapshot]);
CREATE INDEX [fk_t_franchise_news_roster_acquisition_t_team_local_ids] ON [t_franchise_news_roster_acquisition]([teamLocalID]);
CREATE INDEX [fk_t_franchise_news_resigned_t_franchise_news_player_snapshot] ON [t_franchise_news_resigned]([playerSnapshot]);
CREATE INDEX [fk_t_franchise_news_resigned_t_team_local_ids] ON [t_franchise_news_resigned]([teamLocalID]);
CREATE INDEX [fk_t_franchise_news_traded_t_team_local_ids]
ON [t_franchise_news_traded]([teamLocalID]);
CREATE INDEX [fk_t_franchise_news_training_available_t_franchise_news_player_snapshot] ON [t_franchise_news_training_available]([playerSnapshot]);
CREATE INDEX [fk_t_franchise_news_training_available_t_team_local_ids] ON [t_franchise_news_training_available]([teamLocalID]);
CREATE UNIQUE INDEX [fk_t_franchise_news_training_outcome_t_franchise_news] ON [t_franchise_news_training_outcome]([newsEntryID]);
CREATE INDEX [fk_t_franchise_news_training_outcome_t_franchise_news_player_snapshot] ON [t_franchise_news_training_outcome]([playerSnapshot]);
CREATE INDEX [fk_t_franchise_news_salary_change_t_franchise_news_player_snapshot] ON [t_franchise_news_salary_change]([playerSnapshot]);
CREATE INDEX [fk_t_franchise_news_retired_t_team_local_ids] ON [t_franchise_news_retired]([teamLocalID]);
CREATE INDEX [fk_t_franchise_news_retired_t_franchise_news_player_snapshot] ON [t_franchise_news_retired]([playerSnapshot]);
CREATE INDEX [fk_t_franchise_news_game_result_t_team_local_ids_away] ON [t_franchise_news_game_result]([awayTeamLocalID]);
CREATE INDEX [fk_t_franchise_news_game_result_t_team_local_ids_home] ON [t_franchise_news_game_result]([homeTeamLocalID]);
CREATE INDEX [fk_t_franchise_news_resigned_group_player_t_franchise_news_player_snapshot] ON [t_franchise_news_resigned_group_player]([playerSnapshot]);
CREATE INDEX [fk_t_franchise_news_resigned_group_player_t_team_local_ids] ON [t_franchise_news_resigned_group_player]([teamLocalID]);
CREATE INDEX [fk_t_franchise_news_player_snapshot_t_franchise_news_players] ON [t_franchise_news_player_snapshot]([newsPlayerID]);
CREATE INDEX [fk_t_franchise_news_player_snapshot_t_franchise_news] ON [t_franchise_news_player_snapshot]([newsEntryID]);
CREATE UNIQUE INDEX [idx_team_attributes_unique_options] ON [t_team_attributes] ([teamLocalID], [optionKey]);
CREATE UNIQUE INDEX [idx_team_attributes_unique_colors] ON [t_team_attributes] ([teamLocalID], [colorKey]);
CREATE INDEX [idx_season_player_condition] ON [t_season_player_condition] ([baseballPlayerGUID]);
CREATE UNIQUE INDEX unique_custom_pennant_lineups
ON t_lineups([teamGUID])
WHERE lineupType = 2;
CREATE UNIQUE INDEX unique_standard_pennant_lineups
ON t_lineups([teamGUID])
WHERE lineupType = 1;
CREATE UNIQUE INDEX unique_default_lineups
ON t_lineups([teamGUID])
WHERE lineupType = 0;
CREATE INDEX [idx_lineup_team] ON [t_lineups] ([teamGUID]);
CREATE INDEX [fk_t_seasons_t_leagues]
ON [t_seasons]([historicalLeagueGUID]);
CREATE UNIQUE INDEX [idx_active_season_unique]
ON [t_seasons](
  [historicalLeagueGUID], 
  [completionDate])
WHERE
  [completionDate] IS NULL;
CREATE UNIQUE INDEX [idx_league_local_ids_unique_league] ON [t_league_local_ids] ([GUID]);
CREATE INDEX [fk_t_stats_t_stats_players]
ON [t_stats]([statsPlayerID]);
CREATE INDEX [fk_t_stats_batting_t_stats]
ON [t_stats_batting]([aggregatorID]);
CREATE INDEX [fk_t_stats_pitching_t_stats]
ON [t_stats_pitching]([aggregatorID]);
CREATE INDEX [fk_t_season_stats_t_seasons]
ON [t_season_stats]([seasonID]);
CREATE INDEX [fk_t_season_stats_t_stats]
ON [t_season_stats]([aggregatorID]);
CREATE INDEX [fk_t_playoff_stats_t_seasons]
ON [t_playoff_stats]([seasonID]);
CREATE INDEX [fk_t_playoff_stats_t_stats]
ON [t_playoff_stats]([aggregatorID]);
CREATE INDEX [fk_t_career_season_stats_t_franchise_local_ids]
ON [t_career_season_stats]([franchiseID]);
CREATE INDEX [fk_t_career_season_stats_t_stats]
ON [t_career_season_stats]([aggregatorID]);
CREATE INDEX [fk_t_career_playoff_stats_t_franchise_local_ids]
ON [t_career_playoff_stats]([franchiseID]);
CREATE INDEX [fk_t_career_playoff_stats_t_stats]
ON [t_career_playoff_stats]([aggregatorID]);
CREATE UNIQUE INDEX [fk_t_stats_players_t_baseball_player_local_ids]
ON [t_stats_players]([baseballPlayerLocalID]);
CREATE INDEX [idx_game_result_home_pitcher] ON [t_game_results] ([homePitcherLocalID]);
CREATE INDEX [idx_game_result_away_pitcher] ON [t_game_results] ([awayPitcherLocalID]);
CREATE INDEX [idx_game_result_home_team] ON [t_game_results] ([homeTeamLocalID]);
CREATE INDEX [idx_game_result_away_team] ON [t_game_results] ([awayTeamLocalID]);
CREATE INDEX [idx_season_schedule_home_team] ON [t_season_schedule] ([homeTeamID]);
CREATE INDEX [idx_season_schedule_away_team] ON [t_season_schedule] ([awayTeamID]);
CREATE UNIQUE INDEX [unique_game_result] ON [t_playoff_games] ([gameID]);
CREATE INDEX [idx_season] ON [t_season_games]([seasonID]);
CREATE UNIQUE INDEX [unique_games] ON [t_season_games]([gameID]);
CREATE INDEX [fk_t_league_available_players_t_baseball_player_local_ids]
ON [t_league_available_players]([baseballPlayerLocalID]);
CREATE INDEX [fk_t_league_available_players_t_league_local_ids]
ON [t_league_available_players]([leagueLocalID]);
CREATE INDEX [fk_t_franchise_news_skill_arc_outcome_t_franchise_news_player_snapshot]
ON [t_franchise_news_skill_arc_outcome]([playerSnapshot]);
CREATE UNIQUE INDEX [fk_t_franchise_unavailable_players_t_baseball_players]
ON [t_franchise_unavailable_players]([baseballPlayerGUID]);
CREATE INDEX [fk_t_franchise_unavailable_players_t_franchise]
ON [t_franchise_unavailable_players]([franchiseGUID]);
CREATE VIEW [v_league_reclaimable_teams] AS 
SELECT leagueGUID, SUM(reclaimableTeams) AS reclaimableTeams
FROM
(
  -- Count up all historical teams in a given league.
  SELECT t_leagues.[originalGUID] AS leagueGUID, COUNT(*) AS reclaimableTeams
  FROM t_leagues
  JOIN t_seasons ON t_seasons.[historicalLeagueGUID] = t_leagues.[GUID]
  JOIN v_season_historical_teams WHERE v_season_historical_teams.[seasonGUID] = t_seasons.[GUID]
  GROUP BY t_leagues.[originalGUID]
  
  UNION ALL
  
  -- Count up all real teams that are autogenerated and exist in exactly one league.
  SELECT leagueGUID, COUNT(*) AS reclaimableTeams
  FROM
    (  
    -- Safe to select from t_leagues here since we're picking out entries that
    -- correspond to exactly one league.
    SELECT t_leagues.[GUID] AS leagueGUID, t_teams.[GUID] AS orphanTeam
    FROM t_leagues
    JOIN t_conferences ON t_conferences.[leagueGUID] = t_leagues.[GUID]
    JOIN t_divisions ON t_divisions.[conferenceGUID] = t_conferences.[GUID]
    JOIN t_division_teams ON t_division_teams.[divisionGUID] = t_divisions.[GUID]
    JOIN t_teams ON t_teams.[GUID] = t_division_teams.[teamGUID]
    WHERE t_leagues.[originalGUID] IS NULL AND t_teams.[isGenerated]
    GROUP BY t_teams.[GUID]
    HAVING COUNT(t_teams.[GUID]) = 1)
  GROUP BY leagueGUID)  
GROUP BY leagueGUID
/* v_league_reclaimable_teams(leagueGUID,reclaimableTeams) */;
CREATE VIEW [v_season_historical_players] AS 
SELECT seasonGUID, t1.[GUID] AS baseballPlayerGUID, t2.[GUID] AS historicalBaseballPlayerGUID
FROM v_season_historical_teams
JOIN t_baseball_players t1 ON t1.[teamGUID] = v_season_historical_teams.[teamGUID]
JOIN t_baseball_players t2 ON t2.[teamGUID] = v_season_historical_teams.[historicalTeamGUID]
WHERE t2.[originalGUID] = t1.[GUID]
/* v_season_historical_players(seasonGUID,baseballPlayerGUID,historicalBaseballPlayerGUID) */;
CREATE TRIGGER [tr_purge_historical_teams]
AFTER DELETE
ON [t_leagues]
FOR EACH ROW
WHEN old.[originalGUID] IS NOT NULL
BEGIN
DELETE FROM t_teams
WHERE GUID IN
  (SELECT GUID  
   FROM t_teams
   LEFT JOIN t_division_teams ON t_teams.[GUID] = t_division_teams.[teamGUID]   
   WHERE t_teams.[originalGUID] IS NOT NULL AND t_division_teams.[teamGUID] IS NULL
  );
END;
CREATE VIEW [v_season_historical_teams] AS 
-- Get all the historical teams used for a season. --
SELECT t_seasons.[GUID] AS seasonGUID, t_teams.[originalGUID] AS teamGUID, t_teams.[GUID] AS historicalTeamGUID
FROM t_seasons
  JOIN t_conferences ON t_seasons.[historicalLeagueGUID] = t_conferences.[leagueGUID]
  JOIN t_divisions ON t_conferences.[GUID] = t_divisions.[conferenceGUID]  
  JOIN t_division_teams ON t_divisions.[GUID] = t_division_teams.[divisionGUID]
  JOIN t_teams ON t_division_teams.[teamGUID] = t_teams.[GUID]
/* v_season_historical_teams(seasonGUID,teamGUID,historicalTeamGUID) */;
CREATE VIEW [v_baseball_player_info] AS 
-- Manually pivot some useful columns for each player.
SELECT t_baseball_player_local_ids.[GUID] AS baseballPlayerGUID,
       CAST(attrFName.[optionValue] AS TEXT) AS firstName,
       CAST(attrLName.[optionValue] AS TEXT) AS lastName,       
       CAST(attrPrimaryPos.[optionValue] AS INTEGER) AS primaryPosition,       
       CAST(attrPitcherRole.[optionValue] AS INTEGER) AS pitcherRole
FROM t_baseball_player_local_ids
JOIN t_baseball_player_options attrFName ON attrFName.[baseballPlayerLocalID] = t_baseball_player_local_ids.[localID] AND attrFName.[optionKey] = 66
JOIN t_baseball_player_options attrLName ON attrLName.[baseballPlayerLocalID] = t_baseball_player_local_ids.[localID] AND attrLName.[optionKey] = 67
JOIN t_baseball_player_options attrPrimaryPos ON attrPrimaryPos.[baseballPlayerLocalID] = t_baseball_player_local_ids.[localID] AND attrPrimaryPos.[optionKey] = 54
LEFT JOIN t_baseball_player_options attrPitcherRole ON attrPitcherRole.[baseballPlayerLocalID] = t_baseball_player_local_ids.[localID] AND attrPitcherRole.[optionKey] = 57
/* v_baseball_player_info(baseballPlayerGUID,firstName,lastName,primaryPosition,pitcherRole) */;
CREATE VIEW v_league_teams
AS
SELECT t_leagues.[GUID] AS leagueGUID, 
       t_leagues.[name] AS leagueName, 
       t_conferences.[GUID] AS conferenceGUID, 
       t_conferences.[name] AS conferenceName, 
       t_conferences.[usesDesignatedHitter] AS usesDesignatedHitter, 
       t_divisions.[GUID] AS divisionGUID, 
       t_divisions.[name] AS divisionName, 
       t_division_teams.[teamGUID] AS teamGUID
FROM t_leagues
JOIN t_conferences ON t_conferences.[leagueGUID] = t_leagues.[GUID]
JOIN t_divisions ON t_divisions.[conferenceGUID] = t_conferences.[GUID]
JOIN t_division_teams ON t_division_teams.[divisionGUID] = t_divisions.[GUID]
/* v_league_teams(leagueGUID,leagueName,conferenceGUID,conferenceName,usesDesignatedHitter,divisionGUID,divisionName,teamGUID) */;
CREATE VIEW v_franchise_teams
AS
SELECT t_franchise.[GUID] AS franchiseGUID, 
       v_league_teams.[teamGUID] AS teamGUID
FROM t_franchise
JOIN v_league_teams ON t_franchise.[leagueGUID] = v_league_teams.[leagueGUID]
/* v_franchise_teams(franchiseGUID,teamGUID) */;
CREATE TRIGGER [tr_delete_franchise_available_players] AFTER DELETE ON [t_franchise_available_players] FOR EACH ROW
BEGIN
  DELETE FROM
    [t_baseball_players]
  WHERE
    [t_baseball_players].[GUID] = [OLD].[baseballPlayerGUID]
  AND [t_baseball_players].[teamGUID] IS NULL;
END;
CREATE VIEW [v_season_single_user_teams] AS
SELECT [seasonGUID], 
       CAST (CASE WHEN COUNT ([teamGUID]) = 1 THEN [teamGUID] ELSE NULL END AS [BLOB]) AS [playerTeamGUID]
FROM [t_season_user_controlled_teams]
GROUP BY [seasonGUID]
/* v_season_single_user_teams(seasonGUID,playerTeamGUID) */;
CREATE VIEW [v_franchise_players]
AS
WITH teamPlayers AS (
  SELECT t_franchise.[GUID] AS franchiseGUID,
         t_baseball_players.[GUID] AS baseballPlayerGUID,
         t_baseball_players.[teamGUID] AS teamGUID
  FROM t_franchise
  JOIN v_league_teams ON t_franchise.[leagueGUID] = v_league_teams.[leagueGUID]
  JOIN t_baseball_players ON v_league_teams.[teamGUID] = t_baseball_players.[teamGUID]
),
availablePlayers AS (
  SELECT franchiseGUID,
         baseballPlayerGUID,
         NULL AS teamGUID
  FROM t_franchise_available_players
),
pendingPlayers AS (
  SELECT baseballPlayerGUID
  FROM t_franchise_retired_players
  UNION ALL
  SELECT baseballPlayerGUID
  FROM t_franchise_resigned_players
)
SELECT * FROM availablePlayers
UNION ALL
SELECT * FROM teamPlayers WHERE teamPlayers.[baseballPlayerGUID] NOT IN (SELECT baseballPlayerGUID FROM pendingPlayers)
/* v_franchise_players(franchiseGUID,baseballPlayerGUID,teamGUID) */;
CREATE VIEW [v_active_historical_teams] AS 
SELECT DISTINCT v_season_historical_teams.[teamGUID] AS teamGUID, v_season_historical_teams.[historicalTeamGUID] AS historicalTeamGUID
FROM v_season_historical_teams
JOIN t_seasons ON v_season_historical_teams.[seasonGUID] = t_seasons.[GUID]
LEFT JOIN t_franchise_seasons ON t_seasons.[GUID] = t_franchise_seasons.[seasonGUID]
WHERE completionDate IS NULL AND franchiseGUID IS NULL
/* v_active_historical_teams(teamGUID,historicalTeamGUID) */;
CREATE VIEW [v_active_historical_players] AS
SELECT DISTINCT v_season_historical_players.[baseballPlayerGUID] AS baseballPlayerGUID,
       v_season_historical_players.[historicalBaseballPlayerGUID] AS historicalBaseballPlayerGUID
FROM v_season_historical_players
JOIN t_seasons ON v_season_historical_players.[seasonGUID] = t_seasons.[GUID]
LEFT JOIN t_franchise_seasons ON t_seasons.[GUID] = t_franchise_seasons.[seasonGUID]
WHERE t_seasons.[completionDate] IS NULL AND franchiseGUID IS NULL
/* v_active_historical_players(baseballPlayerGUID,historicalBaseballPlayerGUID) */;
CREATE VIEW [v_lineups_default] AS
SELECT GUID, teamGUID FROM t_lineups WHERE lineupType = 0
/* v_lineups_default(GUID,teamGUID) */;
CREATE VIEW [v_lineups_pennant] AS
SELECT GUID, teamGUID, lineupType FROM t_lineups WHERE lineupType = 1 OR lineupType = 2
/* v_lineups_pennant(GUID,teamGUID,lineupType) */;
CREATE VIEW [v_stats_batting]
AS
SELECT 
       [stats_common].*, 
       [onBasePct] + [sluggingPct] AS [onBasePlusSlugging], 
       [strikeOuts] / CAST (NULLIF ([plateAppearances], 0) AS [REAL]) AS [strikeoutPct], 
       [baseOnBalls] / CAST (NULLIF ([plateAppearances], 0) AS [REAL]) AS [baseOnBallsPct], 
       [extraBaseHits] / CAST (NULLIF ([PLATEAPPEARANCES], 0) AS [REAL]) AS [extraBaseHitsPct]
FROM   (SELECT 
               [t_stats].[aggregatorID] AS [aggregatorID], 
               [t_stats].[statsPlayerID] AS [statsPlayerID], 
               [t_baseball_player_local_ids].[GUID] AS [baseballPlayerGUIDIfKnown],
               [currentTeam].[GUID] AS [teamGUID], 
               [mostRecentTeam].[GUID] AS [mostRecentlyPlayedTeamGUID], 
               [previouslyRecentTeam].[GUID] AS [previousRecentlyPlayedTeamGUID], 
               CASE WHEN [t_stats_players].[baseballPlayerLocalID] IS NULL THEN [t_stats_players].[firstName] ELSE [v_baseball_player_info].[firstName] END AS firstName, 
               CASE WHEN [t_stats_players].[baseballPlayerLocalID] IS NULL THEN [t_stats_players].[lastName] ELSE [v_baseball_player_info].[lastName] END AS lastName, 
               CASE WHEN [t_stats_players].[baseballPlayerLocalID] IS NULL THEN [t_stats_players].[primaryPos] ELSE [v_baseball_player_info].[primaryPosition] END AS primaryPosition, 
               CASE WHEN [t_stats_players].[baseballPlayerLocalID] IS NULL THEN [t_stats_players].[pitcherRole] ELSE [v_baseball_player_info].[pitcherRole] END AS pitcherRole, 
               [gamesBatting], 
               [atBats], 
               [runs], 
               [hits], 
               [doubles], 
               [triples], 
               [homeruns], 
               [rbi], 
               [stolenBases], 
               [caughtStealing], 
               [baseOnBalls], 
               [strikeOuts], 
               [hitByPitch], 
               [sacrificeHits], 
               [sacrificeFlies], 
               [errors], 
               [passedBalls], 
               ([atBats] + [baseOnBalls] + [sacrificeFlies] + [sacrificeHits] + [hitByPitch]) AS [plateAppearances], 
               ([atBats] + [baseOnBalls] + [sacrificeFlies] + [sacrificeHits] + [hitByPitch]) / CAST ([gamesPlayed] AS [REAL]) AS [plateAppearancesPerGame], 
               ([hits] + [baseOnBalls] + [hitByPitch]) / CAST (NULLIF ([atBats] + [baseOnBalls] + [hitByPitch] + [sacrificeFlies], 0) AS [REAL]) AS [onBasePct], 
               (([hits] - [doubles] - [triples] - [homeruns]) + 2 * [doubles] + 3 * [triples] + 4 * [homeruns]) / CAST (NULLIF ([atBats], 0) AS [REAL]) AS [sluggingPct], 
               ([doubles] + [triples] + [homeruns]) AS [extraBaseHits], 
               [hits] / CAST (NULLIF ([atBats], 0) AS [REAL]) AS [battingAverage], 
               ([hits] - [homeruns]) / CAST (NULLIF ([atBats] - [strikeOuts] - [homeRuns] + [sacrificeFlies], 0) AS [REAL]) AS [babip], 
               (([hits] - [doubles] - [triples] - [homeruns]) + 2 * [doubles] + 3 * [triples] + 4 * [homeruns]) AS [totalBases], 
               [atBats] / CAST (NULLIF ([homeruns], 0) AS [REAL]) AS [atBatsPerHomeRun]
        FROM [t_stats_batting]
        JOIN [t_stats] ON [t_stats_batting].[aggregatorID] = [t_stats].[aggregatorID]
        JOIN [t_stats_players] USING ([statsPlayerID])
        LEFT JOIN [t_team_local_ids] currentTeam ON [t_stats].[currentTeamLocalID] = currentTeam.[localID]
        LEFT JOIN [t_team_local_ids] mostRecentTeam ON [t_stats].[mostRecentlyPlayedTeamLocalID] = mostRecentTeam.[localID]
        LEFT JOIN [t_team_local_ids] previouslyRecentTeam ON [t_stats].[previousRecentlyPlayedTeamLocalID] = previouslyRecentTeam.[localID]
        LEFT JOIN [t_baseball_player_local_ids] ON [t_stats_players].[baseballPlayerLocalID] = [t_baseball_player_local_ids].[localID]
        LEFT JOIN [v_baseball_player_info] ON [t_baseball_player_local_ids].[GUID] = [v_baseball_player_info].[baseballPlayerGUID]) AS stats_common
/* v_stats_batting(aggregatorID,statsPlayerID,baseballPlayerGUIDIfKnown,teamGUID,mostRecentlyPlayedTeamGUID,previousRecentlyPlayedTeamGUID,firstName,lastName,primaryPosition,pitcherRole,gamesBatting,atBats,runs,hits,doubles,triples,homeruns,rbi,stolenBases,caughtStealing,baseOnBalls,strikeOuts,hitByPitch,sacrificeHits,sacrificeFlies,errors,passedBalls,plateAppearances,plateAppearancesPerGame,onBasePct,sluggingPct,extraBaseHits,battingAverage,babip,totalBases,atBatsPerHomeRun,onBasePlusSlugging,strikeoutPct,baseOnBallsPct,extraBaseHitsPct) */;
CREATE VIEW [v_stats_pitching]
AS
SELECT 
       [t_stats].[aggregatorID] AS [aggregatorID], 
       [t_stats].[statsPlayerID] AS [statsPlayerID], 
       [t_baseball_player_local_ids].[GUID] AS [baseballPlayerGUIDIfKnown], 
       [currentTeam].[GUID] AS [teamGUID], 
       [mostRecentTeam].[GUID] AS [mostRecentlyPlayedTeamGUID], 
       [previouslyRecentTeam].[GUID] AS [previousRecentlyPlayedTeamGUID], 
       CASE WHEN [t_stats_players].[baseballPlayerLocalID] IS NULL THEN [t_stats_players].[firstName] ELSE [v_baseball_player_info].[firstName] END AS firstName, 
       CASE WHEN [t_stats_players].[baseballPlayerLocalID] IS NULL THEN [t_stats_players].[lastName] ELSE [v_baseball_player_info].[lastName] END AS lastName, 
       CASE WHEN [t_stats_players].[baseballPlayerLocalID] IS NULL THEN [t_stats_players].[primaryPos] ELSE [v_baseball_player_info].[primaryPosition] END AS primaryPosition, 
       CASE WHEN [t_stats_players].[baseballPlayerLocalID] IS NULL THEN [t_stats_players].[pitcherRole] ELSE [v_baseball_player_info].[pitcherRole] END AS pitcherRole, 
       [wins], 
       [losses], 
       [games], 
       [gamesStarted], 
       [completeGames], 
       [totalPitches], 
       [shutouts], 
       [saves], 
       [outsPitched], 
       [hits], 
       [earnedRuns], 
       [homeRuns], 
       [baseOnBalls], 
       [strikeOuts], 
       [battersHitByPitch], 
       [battersFaced], 
       [gamesFinished], 
       [runsAllowed], 
       [wildPitches], 
       ([outsPitched] / 3.0) AS [inningsPitched], 
       [earnedRuns] / CAST ((NULLIF ([outsPitched], 0) / 27.0) AS [REAL]) AS [ERA], 
       [hits] / CAST (NULLIF ([battersFaced] - [baseOnBalls] - [battersHitByPitch], 0) AS [REAL]) AS [opponent_AVG], 
       ([baseOnBalls] + [hits]) / CAST ((NULLIF ([outsPitched], 0) / 3.0) AS [REAL]) AS [WHIP], 
       [wins] / CAST (NULLIF ([wins] + [losses], 0) AS [REAL]) AS [winPct], 
       ([hits] + [baseOnBalls] + [battersHitByPitch]) / CAST (NULLIF ([battersFaced], 0) AS [REAL]) AS [opponent_OBP], 
       [strikeOuts] / CAST (MAX ([baseOnBalls], 1) AS [REAL]) AS [strikeOutsPerWalk], 
       [strikeOuts] / CAST ((NULLIF ([outsPitched], 0) / 27.0) AS [REAL]) AS [strikeOuts_9], 
       [baseOnBalls] / CAST ((NULLIF ([outsPitched], 0) / 27.0) AS [REAL]) AS [baseOnBalls_9], 
       [hits] / CAST ((NULLIF ([outsPitched], 0) / 27.0) AS [REAL]) AS [hits_9], 
       [totalPitches] / CAST ((NULLIF ([outsPitched], 0) / 3.0) AS [REAL]) AS [pitchesPerInningPitched], 
       ([outsPitched] / 3.0) / [gamesPlayed] AS [inningsPitchedPerGame]
FROM [t_stats_pitching]
JOIN [t_stats] ON [t_stats_pitching].[aggregatorID] = [t_stats].[aggregatorID]
JOIN [t_stats_players] USING ([statsPlayerID])
LEFT JOIN [t_team_local_ids] currentTeam ON [t_stats].[currentTeamLocalID] = currentTeam.[localID]
LEFT JOIN [t_team_local_ids] mostRecentTeam ON [t_stats].[mostRecentlyPlayedTeamLocalID] = mostRecentTeam.[localID]
LEFT JOIN [t_team_local_ids] previouslyRecentTeam ON [t_stats].[previousRecentlyPlayedTeamLocalID] = previouslyRecentTeam.[localID]
LEFT JOIN [t_baseball_player_local_ids] ON [t_stats_players].[baseballPlayerLocalID] = [t_baseball_player_local_ids].[localID]
LEFT JOIN [v_baseball_player_info] ON [t_baseball_player_local_ids].[GUID] = [v_baseball_player_info].[baseballPlayerGUID]
/* v_stats_pitching(aggregatorID,statsPlayerID,baseballPlayerGUIDIfKnown,teamGUID,mostRecentlyPlayedTeamGUID,previousRecentlyPlayedTeamGUID,firstName,lastName,primaryPosition,pitcherRole,wins,losses,games,gamesStarted,completeGames,totalPitches,shutouts,saves,outsPitched,hits,earnedRuns,homeRuns,baseOnBalls,strikeOuts,battersHitByPitch,battersFaced,gamesFinished,runsAllowed,wildPitches,inningsPitched,ERA,opponent_AVG,WHIP,winPct,opponent_OBP,strikeOutsPerWalk,strikeOuts_9,baseOnBalls_9,hits_9,pitchesPerInningPitched,inningsPitchedPerGame) */;
CREATE VIEW [v_franchise_players_including_pending_players]
AS
WITH teamPlayers AS (
  SELECT t_franchise.[GUID] AS franchiseGUID,
         t_baseball_players.[GUID] AS baseballPlayerGUID
  FROM t_franchise
  JOIN v_league_teams ON t_franchise.[leagueGUID] = v_league_teams.[leagueGUID]
  JOIN t_baseball_players ON v_league_teams.[teamGUID] = t_baseball_players.[teamGUID]
),
availablePlayers AS (
  SELECT franchiseGUID, baseballPlayerGUID
  FROM t_franchise_available_players
),
pendingPlayers AS (
  SELECT franchiseGUID, baseballPlayerGUID
  FROM t_franchise_retired_players
  UNION ALL
  SELECT franchiseGUID, baseballPlayerGUID
  FROM t_franchise_resigned_players
)
SELECT * FROM availablePlayers
UNION
SELECT * FROM teamPlayers
UNION
SELECT * FROM pendingPlayers
/* v_franchise_players_including_pending_players(franchiseGUID,baseballPlayerGUID) */;
CREATE TRIGGER tr_record_deleted_franchise_player_information
INSTEAD OF DELETE ON v_franchise_players_including_pending_players
BEGIN
     -- Stash player names for news items when deleting a player.
     UPDATE t_franchise_news_players SET
              firstName = (SELECT firstName
                           FROM v_baseball_player_info
                           JOIN t_baseball_player_local_ids ON t_baseball_player_local_ids.[GUID] = v_baseball_player_info.[baseballPlayerGUID] AND
                                                               t_baseball_player_local_ids.[localID] = t_franchise_news_players.[playerLocalID]
                           WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID]),
              lastName = (SELECT lastName
                          FROM v_baseball_player_info
                          JOIN t_baseball_player_local_ids ON t_baseball_player_local_ids.[GUID] = v_baseball_player_info.[baseballPlayerGUID] AND
                                                              t_baseball_player_local_ids.[localID] = t_franchise_news_players.[playerLocalID]
                          WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID])
      WHERE EXISTS (SELECT *
                    FROM t_baseball_player_local_ids
                    WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID] AND t_franchise_news_players.[playerLocalID] = t_baseball_player_local_ids.[localID]);
     
     -- Stash player information for stats when deleting a player.
     UPDATE t_stats_players SET
              firstName = (SELECT firstName
                           FROM v_baseball_player_info
                           JOIN t_baseball_player_local_ids ON t_baseball_player_local_ids.[GUID] = v_baseball_player_info.[baseballPlayerGUID] AND
                                                               t_baseball_player_local_ids.[localID] = t_stats_players.[baseballPlayerLocalID]
                           WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID]),
              lastName = (SELECT lastName
                          FROM v_baseball_player_info
                          JOIN t_baseball_player_local_ids ON t_baseball_player_local_ids.[GUID] = v_baseball_player_info.[baseballPlayerGUID] AND
                                                              t_baseball_player_local_ids.[localID] = t_stats_players.[baseballPlayerLocalID]
                          WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID]),
              primaryPos = (SELECT primaryPosition
                            FROM v_baseball_player_info
                            JOIN t_baseball_player_local_ids ON t_baseball_player_local_ids.[GUID] = v_baseball_player_info.[baseballPlayerGUID] AND
                                                                t_baseball_player_local_ids.[localID] = t_stats_players.[baseballPlayerLocalID]
                            WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID]),
              secondaryPos = (SELECT CAST(attrSecondaryPos.[optionValue] AS INTEGER) AS secondaryPos
                              FROM t_baseball_player_local_ids
                              JOIN t_baseball_player_options attrSecondaryPos ON attrSecondaryPos.[baseballPlayerLocalID] = t_baseball_player_local_ids.[localID] AND attrSecondaryPos.[optionKey] = 55
                              WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID] AND t_stats_players.[baseballPlayerLocalID] = t_baseball_player_local_ids.[localID]),
              pitcherRole = (SELECT pitcherRole
                             FROM v_baseball_player_info
                             JOIN t_baseball_player_local_ids ON t_baseball_player_local_ids.[GUID] = v_baseball_player_info.[baseballPlayerGUID] AND
                                                                 t_baseball_player_local_ids.[localID] = t_stats_players.[baseballPlayerLocalID]
                             WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID]), 
              age = (SELECT age
                     FROM t_baseball_players
                     JOIN t_baseball_player_local_ids ON t_baseball_player_local_ids.[GUID] = t_baseball_players.[GUID] AND
                                                         t_baseball_player_local_ids.[localID] = t_stats_players.[baseballPlayerLocalID]
                     WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID]),
              salary = (SELECT salary
                        FROM t_salary
                        JOIN t_baseball_player_local_ids ON t_baseball_player_local_ids.[GUID] = t_salary.[baseballPlayerGUID] AND
                                                            t_baseball_player_local_ids.[localID] = t_stats_players.[baseballPlayerLocalID]
                        WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID]),
              retirementSeason = (
                SELECT COUNT(*) AS retirementSeason
                FROM v_franchise_players_including_pending_players
                JOIN t_franchise_seasons ON v_franchise_players_including_pending_players.[franchiseGUID] = t_franchise_seasons.[franchiseGUID]
                JOIN t_baseball_player_local_ids ON t_baseball_player_local_ids.[GUID] = v_franchise_players_including_pending_players.[baseballPlayerGUID] AND
                                                    t_baseball_player_local_ids.[localID] = t_stats_players.[baseballPlayerLocalID]
                WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID]
              )
      WHERE EXISTS (SELECT *
                    FROM t_baseball_player_local_ids
                    WHERE t_baseball_player_local_ids.[GUID] = OLD.[baseballPlayerGUID] AND t_stats_players.[baseballPlayerLocalID] = t_baseball_player_local_ids.[localID]);
      
      -- Actually delete the player.
      DELETE FROM t_baseball_players WHERE GUID = OLD.[baseballPlayerGUID];
END;
CREATE VIEW v_playoff_games_played AS
WITH currentPlayoffs AS (
  -- Add up all the games played for a team in a given playoff tournament.
  SELECT playoffGUID, teamGUID, SUM(gamesPlayed) AS gamesPlayed FROM
  (
    -- Pick out teams that haven't played any games in the current tournament.
    SELECT t_playoffs.[GUID] AS playoffGUID, v_season_historical_teams.[historicalTeamGUID] AS teamGUID, 0 AS gamesPlayed  
      FROM t_playoffs
      JOIN v_season_historical_teams ON t_playoffs.[seasonGUID] = v_season_historical_teams.[seasonGUID]
    UNION ALL 
    -- Count up the games played for the home teams.
    SELECT t_playoff_games.[playoffGUID] AS playoffGUID,
           t_team_local_ids.[GUID] AS teamGUID,
           COUNT(t_game_results.[homeTeamLocalID]) AS gamesPlayed
      FROM t_playoff_games
      JOIN t_game_results ON t_playoff_games.[gameID] = t_game_results.[ID]
      JOIN t_team_local_ids ON t_game_results.[homeTeamLocalID] = t_team_local_ids.[localID]
      GROUP BY t_playoff_games.[playoffGUID], t_team_local_ids.[GUID]    
    UNION ALL   
    -- Count up the games played for the away teams.  
    SELECT t_playoff_games.[playoffGUID] AS playoffGUID,
           t_team_local_ids.[GUID] AS teamGUID,
           COUNT(t_game_results.[awayTeamLocalID]) AS gamesPlayed
      FROM t_playoff_games
      JOIN t_game_results ON t_playoff_games.[gameID] = t_game_results.[ID]
      JOIN t_team_local_ids ON t_game_results.[awayTeamLocalID] = t_team_local_ids.[localID]
      GROUP BY t_playoff_games.[playoffGUID], t_team_local_ids.[GUID] 
  )
  WHERE playoffGUID NOT IN (
        SELECT t_playoffs.[GUID]
        FROM t_playoff_games_played_snapshot
        JOIN t_seasons ON t_playoff_games_played_snapshot.[seasonID] = t_seasons.[ID]
        JOIN t_playoffs ON t_seasons.[GUID] = t_playoffs.[seasonGUID])
  GROUP BY playoffGUID, teamGUID
)
SELECT playoffGUID, teamGUID, gamesPlayed FROM currentPlayoffs
UNION ALL
SELECT t_playoffs.[GUID] AS playoffGUID, t_team_local_ids.[GUID] AS teamGUID, gamesPlayed
FROM t_playoff_games_played_snapshot
JOIN t_seasons ON t_playoff_games_played_snapshot.[seasonID] = t_seasons.[ID]
JOIN t_playoffs ON t_seasons.[GUID] = t_playoffs.[seasonGUID]
JOIN t_team_local_ids ON t_playoff_games_played_snapshot.[teamID] = t_team_local_ids.[localID]
/* v_playoff_games_played(playoffGUID,teamGUID,gamesPlayed) */;
CREATE VIEW [v_playoff_games_won_lost] AS
WITH currentPlayoffs AS (
  SELECT playoffGUID, conferenceGUID, divisionGUID, t_team_local_ids.[GUID] AS teamGUID,
         SUM(gamesWon) AS gamesWon, SUM(gamesLost) AS gamesLost,
         COALESCE(SUM(runsFor), 0) AS runsFor, COALESCE(SUM(runsAgainst), 0) AS runsAgainst
  FROM
  (SELECT t_playoff_games.[playoffGUID], t_game_results.[homeTeamLocalID] AS teamLocalID,
         CASE WHEN homeRunsScored > awayRunsScored THEN 1 ELSE 0 END AS gamesWon,
         CASE WHEN homeRunsScored < awayRunsScored THEN 1 ELSE 0 END AS gamesLost,
         homeRunsScored AS runsFor,       
         awayRunsScored AS runsAgainst
  FROM t_game_results
  JOIN t_playoff_games ON t_game_results.[ID] = t_playoff_games.[gameID]
  UNION ALL
  SELECT t_playoff_games.[playoffGUID], t_game_results.[awayTeamLocalID] AS teamLocalID,
         CASE WHEN homeRunsScored < awayRunsScored THEN 1 ELSE 0 END AS gamesWon,
         CASE WHEN homeRunsScored > awayRunsScored THEN 1 ELSE 0 END AS gamesLost,
         awayRunsScored AS runsFor,
         homeRunsScored AS runsAgainst
  FROM t_game_results
  JOIN t_playoff_games ON t_game_results.[ID] = t_playoff_games.[gameID]
  UNION ALL
  SELECT t_playoffs.[GUID] AS playoffGUID, t_team_local_ids.[localID] AS teamLocalID, 0 AS gamesWon, 0 AS gamesLost, 0 AS runsFor, 0 AS runsAgainst
  FROM v_playoff_games_played
  JOIN t_playoffs ON t_playoffs.[GUID] = v_playoff_games_played.[playoffGUID]
  JOIN t_team_local_ids ON v_playoff_games_played.[teamGUID] = t_team_local_ids.[GUID]
  WHERE gamesPlayed = 0) t
  JOIN t_team_local_ids ON t.[teamLocalID] = t_team_local_ids.[localID]
  JOIN t_division_teams ON t_division_teams.[teamGUID] = t_team_local_ids.[GUID]
  JOIN t_divisions ON t_divisions.[GUID] = t_division_teams.[divisionGUID]
  JOIN t_conferences ON t_conferences.[GUID] = t_divisions.[conferenceGUID]
  WHERE playoffGUID NOT IN (
        SELECT t_playoffs.[GUID]
        FROM t_playoff_games_won_lost_snapshot
        JOIN t_seasons ON t_playoff_games_won_lost_snapshot.[seasonID] = t_seasons.[ID]
        JOIN t_playoffs ON t_seasons.[GUID] = t_playoffs.[seasonGUID])
  GROUP BY playoffGUID, conferenceGUID, divisionGUID, t_team_local_ids.[GUID]
)
SELECT playoffGUID, conferenceGUID, divisionGUID, teamGUID,
       gamesWon, gamesLost, runsFor, runsAgainst
FROM currentPlayoffs
UNION ALL
SELECT t_playoffs.[GUID] AS playoffGUID, v_league_teams.[conferenceGUID] AS conferenceGUID,
       v_league_teams.[divisionGUID] AS divisionGUID, v_league_teams.[teamGUID] AS teamGUID,
       gamesWon, gamesLost, runsFor, runsAgainst
FROM t_playoff_games_won_lost_snapshot
JOIN t_seasons ON t_playoff_games_won_lost_snapshot.[seasonID] = t_seasons.[ID]
JOIN t_playoffs ON t_seasons.[GUID] = t_playoffs.[seasonGUID]
JOIN t_team_local_ids ON t_playoff_games_won_lost_snapshot.[teamID] = t_team_local_ids.[localID]
JOIN v_league_teams ON t_team_local_ids.[GUID] = v_league_teams.[teamGUID]
/* v_playoff_games_won_lost(playoffGUID,conferenceGUID,divisionGUID,teamGUID,gamesWon,gamesLost,runsFor,runsAgainst) */;
CREATE VIEW v_season_games_played AS
WITH currentSeasons AS (
  -- Add up all the games played for a team in a given season.
  SELECT seasonGUID, teamGUID, SUM(gamesPlayed) AS gamesPlayed FROM
  (
    -- Pick out teams that haven't played any games in the current season.
    SELECT t_seasons.[GUID] AS seasonGUID, v_season_historical_teams.[historicalTeamGUID] AS teamGUID, 0 AS gamesPlayed
      FROM t_seasons    
      JOIN v_season_historical_teams ON t_seasons.[GUID] = v_season_historical_teams.[seasonGUID]  
    UNION ALL 
    -- Count up the games played for the home teams.
    SELECT t_seasons.[GUID] AS seasonGUID,
           t_team_local_ids.[GUID] AS teamGUID,
           COUNT(t_game_results.[homeTeamLocalID]) AS gamesPlayed
      FROM t_season_games
      JOIN t_seasons ON t_season_games.[seasonID] = t_seasons.[ID]
      JOIN t_game_results ON t_season_games.[gameID] = t_game_results.[ID]
      JOIN t_team_local_ids ON t_game_results.[homeTeamLocalID] = t_team_local_ids.[localID]
      GROUP BY t_season_games.[seasonID], t_team_local_ids.[GUID]    
    UNION ALL   
    -- Count up the games played for the away teams.
    SELECT t_seasons.[GUID] AS seasonGUID,
           t_team_local_ids.[GUID] AS teamGUID,
           COUNT(t_game_results.[awayTeamLocalID]) AS gamesPlayed
      FROM t_season_games
      JOIN t_seasons ON t_season_games.[seasonID] = t_seasons.[ID]
      JOIN t_game_results ON t_season_games.[gameID] = t_game_results.[ID]
      JOIN t_team_local_ids ON t_game_results.[awayTeamLocalID] = t_team_local_ids.[localID]
      GROUP BY t_season_games.[seasonID], t_team_local_ids.[GUID]
  )
  WHERE seasonGUID NOT IN (
        SELECT t_seasons.[GUID]
        FROM t_season_games_played_snapshot
        JOIN t_seasons ON t_season_games_played_snapshot.[seasonID] = t_seasons.[ID])
  GROUP BY seasonGUID, teamGUID
)
SELECT seasonGUID, teamGUID, gamesPlayed FROM currentSeasons
UNION ALL
SELECT t_seasons.[GUID] AS seasonGUID, t_team_local_ids.[GUID] AS teamGUID, gamesPlayed
FROM t_season_games_played_snapshot
JOIN t_seasons ON t_season_games_played_snapshot.[seasonID] = t_seasons.[ID]
JOIN t_team_local_ids ON t_season_games_played_snapshot.[teamID] = t_team_local_ids.[localID]
/* v_season_games_played(seasonGUID,teamGUID,gamesPlayed) */;
CREATE VIEW [v_season_games_won_lost] AS
WITH currentSeasons AS (
  SELECT t_seasons.[GUID] AS seasonGUID, conferenceGUID, divisionGUID, t_team_local_ids.[GUID] AS teamGUID,
         SUM(gamesWon) AS gamesWon, SUM(gamesLost) AS gamesLost,
         COALESCE(SUM(runsFor), 0) AS runsFor, COALESCE(SUM(runsAgainst), 0) AS runsAgainst
  FROM
  (SELECT t_season_games.[seasonID], t_game_results.[homeTeamLocalID] AS teamLocalID,
         CASE WHEN homeRunsScored > awayRunsScored THEN 1 ELSE 0 END AS gamesWon,
         CASE WHEN homeRunsScored < awayRunsScored THEN 1 ELSE 0 END AS gamesLost,
         homeRunsScored AS runsFor,
         awayRunsScored AS runsAgainst
  FROM t_game_results
  JOIN t_season_games ON t_game_results.[ID] = t_season_games.[gameID]
  UNION ALL
  SELECT t_season_games.[seasonID], t_game_results.[awayTeamLocalID] AS teamLocalID,
         CASE WHEN homeRunsScored < awayRunsScored THEN 1 ELSE 0 END AS gamesWon,
         CASE WHEN homeRunsScored > awayRunsScored THEN 1 ELSE 0 END AS gamesLost,
         awayRunsScored AS runsFor,
         homeRunsScored AS runsAgainst
  FROM t_game_results
  JOIN t_season_games ON t_game_results.[ID] = t_season_games.[gameID]
  UNION ALL
  SELECT t_seasons.[ID] AS seasonID, t_team_local_ids.[localID] AS teamLocalID, 0 AS gamesWon, 0 AS gamesLost, 0 AS runsFor, 0 AS runsAgainst
  FROM v_season_games_played
  JOIN t_seasons ON v_season_games_played.[seasonGUID] = t_seasons.[GUID]
  JOIN t_team_local_ids ON v_season_games_played.[teamGUID] = t_team_local_ids.[GUID]
  WHERE gamesPlayed = 0) t
  JOIN t_seasons ON t.[seasonID] = t_seasons.[ID]
  JOIN t_team_local_ids ON t.[teamLocalID] = t_team_local_ids.[localID]
  JOIN t_division_teams ON t_division_teams.[teamGUID] = t_team_local_ids.[GUID]
  JOIN t_divisions ON t_divisions.[GUID] = t_division_teams.[divisionGUID]
  JOIN t_conferences ON t_conferences.[GUID] = t_divisions.[conferenceGUID]
  WHERE seasonGUID NOT IN (
        SELECT t_seasons.[GUID]
        FROM t_season_games_won_lost_snapshot
        JOIN t_seasons ON t_season_games_won_lost_snapshot.[seasonID] = t_seasons.[ID])
  GROUP BY seasonGUID, conferenceGUID, divisionGUID, t_team_local_ids.[GUID]
)
SELECT seasonGUID, conferenceGUID, divisionGUID, teamGUID,
       gamesWon, gamesLost, runsFor, runsAgainst
FROM currentSeasons
UNION ALL
SELECT t_seasons.[GUID] AS seasonGUID, v_league_teams.[conferenceGUID] AS conferenceGUID,
       v_league_teams.[divisionGUID] AS divisionGUID, v_league_teams.[teamGUID] AS teamGUID,
       gamesWon, gamesLost, runsFor, runsAgainst
FROM t_season_games_won_lost_snapshot
JOIN t_seasons ON t_season_games_won_lost_snapshot.[seasonID] = t_seasons.[ID]
JOIN t_team_local_ids ON t_season_games_won_lost_snapshot.[teamID] = t_team_local_ids.[localID]
JOIN v_league_teams ON t_team_local_ids.[GUID] = v_league_teams.[teamGUID]
/* v_season_games_won_lost(seasonGUID,conferenceGUID,divisionGUID,teamGUID,gamesWon,gamesLost,runsFor,runsAgainst) */;
CREATE VIEW [v_season_standings] AS
SELECT wl1.[seasonGUID], wl1.[conferenceGUID], wl1.[divisionGUID], wl1.[teamGUID],
       gamesWon, gamesLost, runsFor, runsAgainst,
       1.0 * gamesWon / (gamesWon + gamesLost) AS winPct,
       0.5 * (maxGameDiff - (gamesWon - gamesLost)) AS gamesBack
FROM v_season_games_won_lost wl1
JOIN (SELECT seasonGUID, conferenceGUID, divisionGUID, MAX(gamesWon - gamesLost) AS maxGameDiff
      FROM v_season_games_won_lost wl2
      GROUP BY seasonGUID, conferenceGUID, divisionGUID) gameDiff
  ON wl1.[seasonGUID] = gameDiff.[seasonGUID] AND
     wl1.[conferenceGUID] = gameDiff.[conferenceGUID] AND
     wl1.[divisionGUID] = gameDiff.[divisionGUID]
/* v_season_standings(seasonGUID,conferenceGUID,divisionGUID,teamGUID,gamesWon,gamesLost,runsFor,runsAgainst,winPct,gamesBack) */;
CREATE VIEW [v_season_summary] AS
WITH currentSeasons AS (
  SELECT t_seasons.[GUID] AS seasonGUID, t_seasons.[historicalLeagueGUID] AS historicalLeagueGUID, v_season_single_user_teams.[playerTeamGUID] AS playerTeamGUID,
         COUNT(v_season_historical_teams.[historicalTeamGUID]) AS historicalTeamCount,
         t_seasons.[completionDate] AS completionDate, t_seasons.[elimination] AS elimination,
         egosAndStarpoints.[minEgo] AS minEgo, egosAndStarpoints.[maxEgo] AS maxEgo, egosAndStarpoints.[avgEgo] AS avgEgo,       
         COALESCE(egosAndStarpoints.[starPoints], 0) AS starPoints,
         v_season_games_won_lost.[gamesWon] AS regularWins, v_season_games_won_lost.[gamesLost] AS regularLosses,       
         v_playoff_games_won_lost.[gamesWon] AS playoffWins, v_playoff_games_won_lost.[gamesLost] AS playoffLosses,
         playedGames.[numGamesPlayed] AS seasonGamesPlayed, seasonLength.[numGames] AS seasonLength
  FROM t_seasons
  LEFT JOIN v_season_single_user_teams ON t_seasons.[GUID] = v_season_single_user_teams.[seasonGUID]
  LEFT JOIN (
        SELECT seasonGUID, MIN(minEgo) AS minEgo, MAX(minEgo) AS maxEgo, AVG(minEgo) AS avgEgo, SUM(starPoints) AS starPoints
        FROM (SELECT t_seasons.[GUID] AS seasonGUID, t_season_user_controlled_teams.[teamGUID] AS teamGUID, t_game_results.[minEgo] AS minEgo, t_game_results.[starPoints] AS starPoints
              FROM t_seasons
              JOIN t_season_games ON t_season_games.[seasonID] = t_seasons.[ID]
              JOIN t_game_results ON t_game_results.[ID] = t_season_games.[gameID]
              JOIN t_team_local_ids homeTeam ON t_game_results.[homeTeamLocalID] = homeTeam.[localID]
              JOIN t_team_local_ids awayTeam ON t_game_results.[awayTeamLocalID] = awayTeam.[localID]
              JOIN t_season_user_controlled_teams ON homeTeam.[GUID] = t_season_user_controlled_teams.[teamGUID] OR awayTeam.[GUID] = t_season_user_controlled_teams.[teamGUID]   
              UNION ALL      
              SELECT t_seasons.[GUID] AS seasonGUID, t_season_user_controlled_teams.[teamGUID] AS teamGUID, t_game_results.[minEgo] AS minEgo, t_game_results.[starPoints] AS starPoints
              FROM t_playoffs
              JOIN t_seasons ON t_playoffs.[seasonGUID] = t_seasons.[GUID]      
              JOIN t_playoff_games ON t_playoff_games.[playoffGUID] = t_playoffs.[GUID]
              JOIN t_game_results ON t_game_results.[ID] = t_playoff_games.[gameID]
              JOIN t_team_local_ids homeTeam ON t_game_results.[homeTeamLocalID] = homeTeam.[localID]
              JOIN t_team_local_ids awayTeam ON t_game_results.[awayTeamLocalID] = awayTeam.[localID]
              JOIN v_season_single_user_teams ON v_season_single_user_teams.[seasonGUID] = t_seasons.[GUID]
              JOIN t_season_user_controlled_teams ON homeTeam.[GUID] = t_season_user_controlled_teams.[teamGUID] OR awayTeam.[GUID] = t_season_user_controlled_teams.[teamGUID])            
        GROUP BY seasonGUID
  ) egosAndStarpoints ON t_seasons.[GUID] = egosAndStarpoints.[seasonGUID]
  LEFT JOIN v_season_games_won_lost ON v_season_games_won_lost.[seasonGUID] = t_seasons.[GUID] AND
            v_season_games_won_lost.[teamGUID] = v_season_single_user_teams.[playerTeamGUID]
  JOIN t_playoffs ON t_playoffs.[seasonGUID] = t_seasons.[GUID]
  LEFT JOIN v_playoff_games_won_lost ON v_playoff_games_won_lost.[playoffGUID] = t_playoffs.[GUID] AND
            v_playoff_games_won_lost.[teamGUID] = v_season_single_user_teams.[playerTeamGUID]     
  JOIN v_season_historical_teams ON v_season_historical_teams.[seasonGUID] = t_seasons.[GUID]
  LEFT JOIN (
       SELECT t_seasons.[GUID] AS seasonGUID, COUNT(seasonID) AS numGames
       FROM t_season_schedule
       JOIN t_seasons ON t_season_schedule.[seasonID] = t_seasons.[ID]
       GROUP BY seasonID
  ) seasonLength ON seasonLength.[seasonGUID] = t_seasons.[GUID]
  LEFT JOIN (
       SELECT t_seasons.[GUID] AS seasonGUID, COUNT(t_seasons.[GUID]) AS numGamesPlayed
       FROM t_season_games
       JOIN t_seasons ON t_season_games.[seasonID] = t_seasons.[ID]
       GROUP BY t_seasons.[GUID]
  ) playedGames ON playedGames.[seasonGUID] = t_seasons.[GUID]
  WHERE t_seasons.[GUID] NOT IN (
        SELECT t_seasons.[GUID]
        FROM t_season_summary_snapshot
        JOIN t_seasons ON t_season_summary_snapshot.[seasonID] = t_seasons.[ID])
  GROUP BY t_seasons.[GUID], v_season_single_user_teams.[playerTeamGUID]
)
SELECT seasonGUID, historicalLeagueGUID, playerTeamGUID, historicalTeamCount,
       completionDate, elimination, minEgo, maxEgo, avgEgo, starPoints,
       regularWins, regularLosses, playoffWins, playoffLosses,
       seasonGamesPlayed, seasonLength
FROM currentSeasons
UNION ALL
SELECT t_seasons.[GUID] AS seasonGUID, historicalLeagueGUID, t_team_local_ids.[GUID] AS playerTeamGUID,
       COUNT(*) AS historicalTeamCount, completionDate, elimination,
       minEgo, maxEgo, avgEgo, starPoints,
       regularWins, regularLosses, playoffWins, playoffLosses,
       seasonGamesPlayed, seasonLength
FROM t_season_summary_snapshot
JOIN t_seasons ON t_season_summary_snapshot.[seasonID] = t_seasons.[ID]
JOIN v_league_teams ON t_seasons.[historicalLeagueGUID] = v_league_teams.[leagueGUID]
LEFT JOIN t_team_local_ids ON t_season_summary_snapshot.[playerTeamID] = t_team_local_ids.[localID]
GROUP BY t_season_summary_snapshot.[seasonID]
/* v_season_summary(seasonGUID,historicalLeagueGUID,playerTeamGUID,historicalTeamCount,completionDate,elimination,minEgo,maxEgo,avgEgo,starPoints,regularWins,regularLosses,playoffWins,playoffLosses,seasonGamesPlayed,seasonLength) */;
CREATE TRIGGER [tr_delete_fantasy_draft_generated_players] AFTER DELETE ON [t_fantasy_draft_generated_players] FOR EACH ROW
BEGIN
  DELETE FROM
    [t_baseball_players]
  WHERE
    [t_baseball_players].[GUID] IN (SELECT GUID FROM t_baseball_player_local_ids WHERE localID = [OLD].[baseballPlayerLocalID]) AND
    [t_baseball_players].[teamGUID] IS NULL;
END;
CREATE VIEW [v_league_players]
AS
WITH teamPlayers AS (
  SELECT v_league_teams.[leagueGUID] AS leagueGUID,
         t_baseball_players.[GUID] AS baseballPlayerGUID,
         t_baseball_players.[teamGUID] AS teamGUID
  FROM v_league_teams
  JOIN t_baseball_players ON v_league_teams.[teamGUID] = t_baseball_players.[teamGUID]
),
availablePlayers AS (
  SELECT t_league_local_ids.[GUID] AS leagueGUID,
         t_baseball_player_local_ids.[GUID] AS baseballPlayerGUID,
         NULL AS teamGUID
  FROM t_league_local_ids
  JOIN t_league_available_players ON t_league_local_ids.[localID] = t_league_available_players.[leagueLocalID]
  JOIN t_baseball_player_local_ids ON t_league_available_players.[baseballPlayerLocalID] = t_baseball_player_local_ids.[localID]
)
SELECT * FROM teamPlayers
UNION ALL
SELECT * FROM availablePlayers
/* v_league_players(leagueGUID,baseballPlayerGUID,teamGUID) */;
CREATE TRIGGER [tr_delete_league_available_players] AFTER DELETE ON [t_league_available_players] FOR EACH ROW
BEGIN
  DELETE FROM
    [t_baseball_players]
  WHERE
    [t_baseball_players].[GUID] IN (SELECT GUID FROM t_baseball_player_local_ids WHERE localID = [OLD].[baseballPlayerLocalID]) AND
    [t_baseball_players].[teamGUID] IS NULL AND
    [t_baseball_players].[GUID] NOT IN (
      SELECT GUID FROM t_baseball_player_local_ids 
      JOIN t_league_available_players ON t_baseball_player_local_ids.[localID] = t_league_available_players.[baseballPlayerLocalID]
      WHERE t_league_available_players.[leagueLocalID] <> [OLD].[leagueLocalID]);
END;