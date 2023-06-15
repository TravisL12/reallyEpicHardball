# Really Epic Hardball

### A Super Mega Baseball 4 fan site

#### Server notes

##### These commands have to be run inside the docker container:

- Use `npx prisma db seed` to seed the database with player data
- Also `npx prisma migrate reset` will drop the db and re-seed

##### Migration stuff:

- Setting up joins in schema
  - https://stackoverflow.com/questions/68761366/left-joins-and-aggregation-in-a-single-prisma-query

#### Previous SMB data extraction

More notes from the original repo: https://github.com/TravisL12/super_mega_baseball_charts

These are the databases and what they do

##### Legends league DB

`league-1EE40D82-453A-4740-82E5-0827731C22E0.sqlite`

##### Creators league

`league-7CBC32B9-BD7F-48D7-AE01-44C6595CD5A6.sqlite`

##### Super Mega league

`league-99F30082-775B-4547-ADD8-8C7D2C94FCE5.sqlite`

##### Unknown league

`league-template.sqlite`

Appears to be empty?

##### Master Database

`master.sqlite`

Tables:

- **t_achievements**
- **t_chat_message_prefs**
- **t_custom_pennant_races**
- **t_franchise_news_filter**
- **t_game_mode_mechanics_seen**
- **t_help_stories_seen**
- **t_hidden_item_notifications**
- **t_input_mappings**
- **t_league_savedatas**
- **t_logo_editor_notification_seen**
- **t_num_promotional_leagues_seen**
- **t_options**
- **t_save_data_validity**
- **t_team_attributes**
- **t_team_local_ids**
- **t_team_logo_attributes**
- **t_team_logo_element_types**
- **t_team_logo_types**
- **t_team_logos**: Appears to have the coordinates for each logo SVG graphic
- **t_team_types**
- **t_teams**
- **t_user_preferences**

This works to get the trait and subType (and Local ID)

finds 440

```
select count(*) from v_baseball_player_info vbpi
join t_baseball_players tbp
    on vbpi.baseballPlayerGUID = tbp.GUID
left join t_teams team
    on tbp.teamGUID = team.GUID
```

```
select
    team.teamName,
    vbpi.firstName,
    vbpi.lastName,
    vbpi.primaryPosition,
    vbpi.pitcherRole,
    tbp.power,
    tbp.contact,
    tbp.speed,
    tbp.fielding,
    tbp.arm,
    tbp.velocity,
    tbp.junk,
    tbp.accuracy,
    tbp.age
from v_baseball_player_info vbpi
join t_baseball_players tbp
    on vbpi.baseballPlayerGUID = tbp.GUID
left join t_teams team
    on tbp.teamGUID = team.GUID
```

```
select count(*) from v_baseball_player_info vbpi
join t_baseball_players tbp
    on vbpi.baseballPlayerGUID = tbp.GUID
join t_baseball_player_local_ids loc
    on tbp.GUID = loc.GUID
left join t_baseball_player_traits trait
    on loc.localID = trait.baseballPlayerLocalID
left join t_teams team
    on tbp.teamGUID = team.GUID
```

```
select
    loc.localId,
    team.teamName,
    vbpi.firstName,
    vbpi.lastName,
    vbpi.primaryPosition,
    vbpi.pitcherRole,
    tbp.power,
    tbp.contact,
    tbp.speed,
    tbp.fielding,
    tbp.arm,
    tbp.velocity,
    tbp.junk,
    tbp.accuracy,
    tbp.age,
    trait.trait,
    trait.subType
from v_baseball_player_info vbpi
join t_baseball_players tbp
    on vbpi.baseballPlayerGUID = tbp.GUID
join t_baseball_player_local_ids loc
    on tbp.GUID = loc.GUID
left join t_baseball_player_traits trait
    on loc.localID = trait.baseballPlayerLocalID
left join t_teams team
    on tbp.teamGUID = team.GUID
```

#### Player Options

Get player options by last name

```
select
  opt2.*
from t_baseball_player_options opt
join t_baseball_player_options opt2
  on opt.baseballPlayerLocalID = opt2.baseballPlayerLocalID
where opt.optionValue = 'Avery';
```

Option keys as discovered via the `.schema` within a database:

- 0: gender
- 4: throws
- 5: bats

- 20: Jersey number + 1 (not sure why, but you have to subtract 1 from this value to get the correct jersey number)

- 48: Windup type
- 49: pitch angle

- 54: Primary position
- 55: Secondary Position
- 56: empty for all?
- 57: Pitcher role

Pitch Arsenal

- 58: 4F (1 or null)
- 59: 2F
- 60: SB
- 61: CH
- 62: FK
- 63: CB
- 64: SL
- 65: CF

- 66: First name
- 67: Last name

- 107: Player Chemistry (not the same as "trait" chemistry)
- 112: Career Start Year (for Legends only)
- 113: Career End Year
