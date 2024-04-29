import { gql
} from "@apollo/client";
export const GET_PLAYER_STATS = gql`
 query GetPlayerStats($competition: String!,$year:Int!) {
   playerSeasonStats(competition: $competition , year:$year) {
     PlayerSeasons {
       Assists
       TeamId
       Team
       Name
       Goals
       Position
       YellowRedCards
       RedCards
       Games
       ShortName
       GoalkeeperSaves
       Assists
     }
   }
 }
`;