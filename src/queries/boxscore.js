import { gql } from "@apollo/client";

export const GET_BOX_SCORE = gql `
query($competition: String!, $gameid: Int!){
    boxscore(competition: $competition, gameid: $gameid) {
      AwayTeamCoach {
        ShortName
        Nationality
      }
      Bookings {
        Name
        PlayerId
        Type
        GameMinute
  
      } 
      Goals{
    
        Name

        GameMinute
        TeamId
          }
      Game {
        Attendance
        AwayTeamFormation
        AwayTeamId
        AwayTeamKey
        AwayTeamName
        AwayTeamScore
        DateTime
        Day
        GameId
        HomeTeamFormation
        HomeTeamId
        HomeTeamKey
        HomeTeamName
        HomeTeamScore
        RoundId
    
      }
      TeamGames {
        Crosses
        DateTime
        Day
        Fouled
        Fouls
        GoalkeeperCleanSheets
        GoalkeeperGoalsAgainst
        GoalkeeperSaves
        Goals
        Name
        Opponent
        Passes
        PassesCompleted
        Possession
        Score
        RedCards
        Shots
        Touches
        TeamId
  
      }
     PlayerGames{
        Assists
        Captain
        ShortName
        TeamId
        Shots
        Position
        ShotsOnGoal
        Passes
        PassesCompleted
        Interceptions
        GoalkeeperSaves
        Fouls
        Fouled
        Goals 
        YellowCards
        DefenderCleanSheets
        RedCards
        PlayerId
        Tackles
        TacklesWon
      }
      HomeTeamCoach {
        ShortName
        Nationality
      }
      Lineups {
        Name
        GameMinute
        LineupId
        PlayerId
        Position
        ReplacedPlayerId
        ReplacedPlayerName
        TeamId
        Type
      }
    }
  }
`