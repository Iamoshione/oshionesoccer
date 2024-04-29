import { gql } from "@apollo/client";

export const GET_TEAM_INFO = gql`
  query GetTeamInfo($competition: String!) {
    teamInfo(competition: $competition) {
      Key
      Name
      Teams {
        Name
        WikipediaLogoUrl
        FullName
        TeamId
        ClubColor1
        ClubColor2
       Players{
        ShortName
        Position
        BirthDate
        Height
        Weight
        Nationality
        Jersey
      PhotoUrl
      PlayerId
       }
      }
      Games {
        AwayTeamId
        AwayTeamKey
        AwayTeamName
        AwayTeamScore
        DateTime
        Day
        GameId
        HomeTeamId
        HomeTeamKey
        HomeTeamName
        HomeTeamScore
        Season
      }
    }
  }
`;

export const GET_TEAM_STATS = gql`
  query GetTeamStats($competition: String!) {
    teamSeasonStats(competition: $competition) {
      TeamSeasons {
        Assists
        OpponentScore
        Shots
        Goals
        TeamId
        Fouled
        Fouls
      }
    }
  }
`;