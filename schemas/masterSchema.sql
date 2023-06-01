CREATE TABLE [t_achievements](
  [key] INTEGER PRIMARY KEY NOT NULL, 
  [value] INTEGER);
CREATE TABLE [t_chat_message_prefs](
  [contextID] TEXT PRIMARY KEY, 
  [slot_N_chatID] INTEGER NOT NULL, 
  [slot_NE_chatID] INTEGER NOT NULL, 
  [slot_E_chatID] INTEGER NOT NULL, 
  [slot_SE_chatID] INTEGER NOT NULL, 
  [slot_S_chatID] INTEGER NOT NULL, 
  [slot_SW_chatID] INTEGER NOT NULL, 
  [slot_W_chatID] INTEGER NOT NULL, 
  [slot_NW_chatID] INTEGER NOT NULL);
CREATE TABLE [t_custom_pennant_races](
  [raceGUID] BLOB PRIMARY KEY, 
  [lastSeasonGUID] BLOB NOT NULL, 
  [initialSkillLevel] INTEGER NOT NULL DEFAULT 0);
CREATE TABLE [t_help_stories_seen]([helpStoryID] INTEGER PRIMARY KEY);
CREATE TABLE [t_hidden_item_notifications]([ID] INTEGER PRIMARY KEY NOT NULL);
CREATE TABLE [t_input_mappings](
  [inputActionName] CHAR NOT NULL, 
  [inputType] CHAR NOT NULL, 
  [posSemantic] CHAR NOT NULL, 
  [negSemantic] CHAR NOT NULL, 
  [isInverted] BOOLEAN NOT NULL DEFAULT 0, 
  [scale] FLOAT NOT NULL DEFAULT (1.0));
CREATE TABLE [t_options](
  [ID] INTEGER PRIMARY KEY NOT NULL, 
  [name] CHAR(20) NOT NULL, 
  [value] CHAR(20) NOT NULL);
CREATE TABLE [t_save_data_validity](
  [lock] BOOL PRIMARY KEY NOT NULL DEFAULT 1, 
  [isUserModified] BOOL NOT NULL DEFAULT 0, 
  CHECK([lock] = 1));
CREATE TABLE [t_user_preferences](
  [lock] BOOL CONSTRAINT [sqlite_autoindex_t_user_preferences_1] PRIMARY KEY NOT NULL DEFAULT 1, 
  [advancedEgo] BOOL NOT NULL, 
  [egoBatting] INTEGER NOT NULL, 
  [egoBaserunning] INTEGER NOT NULL, 
  [egoPitching] INTEGER NOT NULL, 
  [egoFielding] INTEGER NOT NULL, 
  [automaticallyGeneratedCustomizableTeams] BOOL NOT NULL, 
  [matchMakingXPlat] BOOL NOT NULL, 
  [matchMakingTeamPreference] BLOB, 
  [matchMakingLastSeasonID] BLOB, 
  [seriesHomeTeamPreference] BLOB, 
  [seriesAwayTeamPreference] BLOB, 
  [customPersistentSeasonsLeaguePreference] BLOB, 
  [customizationTeamPreference] BLOB, 
  [customizationPreferTeamRosterListView] BOOL NOT NULL, 
  [customizationNewLeagueNumConferences] INTEGER NOT NULL, 
  [customizationNewLeagueNumDivisions] INTEGER NOT NULL, 
  [customizationNewLeagueNumTeams] INTEGER NOT NULL, 
  [multiplayerNetworkJoinRestriction] INTEGER NOT NULL, 
  [multiplayerTeamPreference] BLOB, 
  [standardPennantRaceInitialSkillLevel] INTEGER NOT NULL DEFAULT 0, 
  [isChatEnabled] BOOL NOT NULL DEFAULT 1, 
  [matchMakingLastAwardsCheckTime] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelParticipant] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelWinStreak] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelNoSurrender] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelForTheWin] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelOffensiveStatement] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelShutdown] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelComebackWins] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelWalkoffWinner] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelLongballLegacy] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelThrowingChairs] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelBasicThief] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelBusyHands] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelSacrificeToTheOdds] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelOutlawOnTheRuns] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelDerby] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelStruckOutTheSide] INTEGER NOT NULL DEFAULT 0, 
  [awardLevel3rdBaseIsACharm] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelIntercepted] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelSmallBall] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelCompletionist] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelLeggingItOut] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelSqueezed] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelPitchoutYourOut] INTEGER NOT NULL DEFAULT 0, 
  [awardLevelPatient] INTEGER NOT NULL DEFAULT 0, 
  [matchMakingForceDefaultTeams] BOOL NOT NULL DEFAULT 0, 
  [isTextChatEnabled] BOOL NOT NULL DEFAULT 1, 
  [isRumbleEnabled] BOOL NOT NULL DEFAULT 1, 
  [matchMakingOnlineLeaguesTeamPreference] BLOB, 
  CONSTRAINT [check_t_user_preferences_locked] CHECK([lock] = 1));
CREATE TABLE [t_team_types](
  [teamType] INTEGER PRIMARY KEY NOT NULL, 
  [typeName] TEXT);
CREATE TABLE [t_team_local_ids](
  [localID] INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
  [GUID] BLOB NOT NULL CONSTRAINT [fk_t_team_local_ids_t_teams] REFERENCES [t_teams]([GUID]) ON DELETE CASCADE);
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE [t_team_attributes](
  [teamLocalID] INTEGER NOT NULL CONSTRAINT [fk_team] REFERENCES [t_team_local_ids]([localID]) ON DELETE CASCADE DEFERRABLE INITIALLY DEFERRED, 
  [optionKey] INTEGER, 
  [colorKey] INTEGER, 
  [optionValueInt] INTEGER, 
  [optionValueFloat] FLOAT, 
  [optionValueText] TEXT, 
  [optionType] INTEGER NOT NULL);
CREATE TABLE [t_team_logo_element_types](
  [logoElementType] INTEGER PRIMARY KEY NOT NULL, 
  [typeName] TEXT);
CREATE TABLE [t_team_logo_types](
  [logoType] INTEGER PRIMARY KEY NOT NULL, 
  [typeName] TEXT);
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
CREATE TABLE [t_team_logo_attributes](
  [teamLogoGUID] BLOB NOT NULL CONSTRAINT [fk_team_logo] REFERENCES [t_team_logos]([GUID]) ON DELETE CASCADE, 
  [optionKey] INTEGER, 
  [colorKey] INTEGER, 
  [optionValueInt] INTEGER, 
  [optionValueFloat] FLOAT, 
  [optionValueText] TEXT, 
  [optionType] INTEGER NOT NULL);
CREATE TABLE [t_league_savedatas](
  [GUID] BLOB CONSTRAINT [sqlite_autoindex_t_league_savedatas_1] PRIMARY KEY NOT NULL, [isMissing] BOOL NOT NULL DEFAULT 0);
CREATE TABLE [t_franchise_news_filter](
  [lock] BOOL PRIMARY KEY NOT NULL DEFAULT 1, 
  [rosterAcquisition] BOOL NOT NULL DEFAULT 1, 
  [playerRetired] BOOL NOT NULL DEFAULT 1, 
  [playerResigned] BOOL NOT NULL DEFAULT 1, 
  [playerTraded] BOOL NOT NULL DEFAULT 1, 
  [playerDevelopmentAvailable] BOOL NOT NULL DEFAULT 1, 
  [playerDevelopmentEvent] BOOL NOT NULL DEFAULT 1, 
  [income] BOOL NOT NULL DEFAULT 1, 
  [playerArcEvent] BOOL NOT NULL DEFAULT 1, 
  [salaryExpectationChanged] BOOL NOT NULL DEFAULT 1, 
  [gameResult] BOOL NOT NULL DEFAULT 1, 
  [championshipWon] BOOL NOT NULL DEFAULT 1, 
  CHECK([lock] = 1));
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
CREATE TABLE [t_num_promotional_leagues_seen]([promotionalLeaguesSeen] INTEGER PRIMARY KEY);
CREATE TABLE [t_logo_editor_notification_seen]([hasSeen] BOOLEAN PRIMARY KEY);
CREATE TABLE [t_game_mode_mechanics_seen]([mechanicID] INTEGER PRIMARY KEY);
CREATE UNIQUE INDEX [idx_team_local_ids_unique_team]
ON [t_team_local_ids]([GUID]);
CREATE UNIQUE INDEX [idx_team_attributes_unique_options]
ON [t_team_attributes](
  [teamLocalID], 
  [optionKey]);
CREATE UNIQUE INDEX [idx_team_attributes_unique_colors]
ON [t_team_attributes](
  [teamLocalID], 
  [colorKey]);
CREATE INDEX [fk_t_team_logos_t_teams]
ON [t_team_logos](
  [teamGUID], 
  [logoType]);
CREATE UNIQUE INDEX [idx_team_logo_attributes_unique_key]
ON [t_team_logo_attributes](
  [teamLogoGUID], 
  [optionKey], 
  [colorKey]);