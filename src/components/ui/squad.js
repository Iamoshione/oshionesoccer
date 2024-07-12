import { GET_TEAM_INFO } from "../../queries/teamquery";
import { GET_PLAYER_STATS } from "../../queries/playerstatquery";
import { useParams } from "react-router-dom";
import useCustomQuery from "../../hooks/usecustomquery";
import { useEffect } from "react";

function Squad() {
  const parameter = useParams();
  const { inputValue, clubId } = parameter;
  const {
    loading: loadingTeamInfo,
    error: teamInfoError,
    data: teamInfoData,
    refetch: refetchTeamData,
  } = useCustomQuery(GET_TEAM_INFO, { variables: { competition: inputValue } });

  const {
    loading: loadingPlayerStats,
    error: playerStatsError,
    data: playerStatsData,
    refetch: refetchStatsData,
  } = useCustomQuery(GET_PLAYER_STATS, {
    variables: { competition: inputValue, year: 2024 },
  });
  useEffect(() => {
    refetchStatsData();
    refetchTeamData();
  }, [clubId]);
  if (loadingTeamInfo || loadingPlayerStats)
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>;
  if (teamInfoError || playerStatsError) <p>Error fetching data...</p>;

  console.log(playerStatsData);
  console.log("teaminfo", teamInfoData);

  const goalkeeper =
    teamInfoData &&
    teamInfoData.teamInfo &&
    teamInfoData.teamInfo[0].Teams.map((team) => (
      <>
        {team.Players.filter((player) => team?.TeamId == clubId)
          .filter((player) => player?.Position == "GK")
          .map((player) => {
            const playerStats =
              playerStatsData &&
              playerStatsData.playerSeasonStats &&
              playerStatsData.playerSeasonStats[0].PlayerSeasons.find(
                (players) => players?.ShortName == player?.ShortName
              );
            console.log("playerStats", playerStats);
            return (
              <tr>
                <td scope="row">{player?.ShortName}</td>
                <td>{player?.Position}</td>
                <td>{player?.Height}</td>
                <td>{player?.Weight}</td>
                <td>{player?.Nationality}</td>
                <td>{playerStats?.Games}</td>
                <td>{playerStats?.GoalkeeperSaves}</td>
                <td>{playerStats?.Assists}</td>
                <td>{playerStats?.Fouls}</td>
                <td>{playerStats?.Fouled}</td>
                <td>{playerStats?.YellowRedCards}</td>
                <td>{playerStats?.RedCards}</td>
              </tr>
            );
          })}
      </>
    ));
  const outfieldPlayers =
    teamInfoData &&
    teamInfoData.teamInfo &&
    teamInfoData.teamInfo[0].Teams.map((team) => (
      <>
        {team.Players.filter((player) => team.TeamId == clubId)
          .filter((players) => players?.Position !== "GK")
          .map((players) => {
            const playerStats =
              playerStatsData &&
              playerStatsData.playerSeasonStats &&
              playerStatsData.playerSeasonStats[0].PlayerSeasons.find(
                (players) => players?.ShortName == players?.ShortName
              );

            return (
              <tr>
                <td scope="row">{players?.ShortName}</td>
                <td>{players?.Position}</td>
                <td>{players?.Height}</td>
                <td>{players?.Weight}</td>
                <td>{players?.Nationality}</td>
                <td>{playerStats?.Games}</td>
                <td>{playerStats?.GoalkeeperSaves}</td>
                <td>{playerStats?.Assists}</td>
                <td>{playerStats?.Fouls}</td>
                <td>{playerStats?.Fouled}</td>
                <td>{playerStats?.YellowRedCards}</td>
                <td>{playerStats?.RedCards}</td>
              </tr>
            );
          })}
      </>
    ));

  return (
    <>
      <table className="table">
        <thead>
          <h2 className="pligc" style={{marginTop:'18px'}}>GOALKEEPERS</h2>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">P</th>
            <th scope="col">HT</th>
            <th scope="col">WT</th>
            <th scope="col">NAT</th>
            <th scope="col">APP</th>
            <th scope="col">GS</th>
            <th scope="col">A</th>
            <th scope="col">FC</th>
            <th scope="col">FA</th>
            <th scope="col">YC</th>
            <th scope="col">RC</th>
          </tr>
        </thead>
        <tbody> {goalkeeper}</tbody>
        <h2 className="pligc"  style={{marginTop:'18px',marginBottom:'18px'}}>OUTFIELD PLAYERS</h2>
        <tbody>{outfieldPlayers}</tbody>
      </table>
    </>
  );
}

export default Squad;
