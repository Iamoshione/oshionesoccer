import { gql } from "@apollo/client";

export const GET_STANDINGS = gql`
  query GetStandings($competition: String!) {
    standings_feed(competition: $competition) {
      Standings {
        Draws
        Games
        GlobalTeamID
        GoalsAgainst
        GoalsDifferential
        GoalsScored
        Losses
        Name
        Order
        Points
        ShortName
        StandingId
        TeamId
        Wins
      }
    }
  }
`;