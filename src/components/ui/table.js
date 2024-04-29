import { useParams } from "react-router-dom";
import useCustomQuery from "../../hooks/usecustomquery";
import { GET_STANDINGS } from "../../queries/standingquery";
import { GET_TEAM_INFO } from "../../queries/teamquery";


function Table(){
    const parameters = useParams()
    const {inputValue} = parameters
    const {
        loading: loadingStandings,
        data: standingsData,
        error: standingsError,
      } = useCustomQuery(GET_STANDINGS, { variables: { competition: inputValue } })
      const {
        loading: loadingTeamInfo,
        data: teamInfoData,
        error: teamInfoError,
      } = useCustomQuery(GET_TEAM_INFO, {
        variables: { competition: inputValue },
      });
      if(loadingStandings||loadingTeamInfo) return <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>;
      if(standingsError||teamInfoError) return <p>error</p>
      const { standings_feed } = standingsData;
return (
    <section>
    {standings_feed && (
      <div className="standings-section" style={{ width: "15cm" }}>
        <table className="table table-white table-hover">
          <thead>
            <tr>
      
              <th scope="col">Team</th>
              <th scope="col">P</th>
              <th scope="col">W</th>
              <th scope="col">D</th>
              <th scope="col">L</th>
              <th scope="col">F</th>
              <th scope="col">A</th>
              <th scope="col">GD</th>
              <th scope="col">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standingsData.standings_feed[0].Standings.slice(
              0,
              19
            ).map((standing, index) => {
              const item = teamInfoData && teamInfoData.teamInfo[0];
              const itemFind = item.Teams.find(
                (team) => team.TeamId == standing.TeamId
              );

              return (
                <tr key={index}>
                 
                  <td>
                    <img
                      src={itemFind ? itemFind.WikipediaLogoUrl : ""}
                      style={{ width: "15px" }}
                      alt=""
                    />
                    {standing.ShortName}
                  </td>
                  <td>{standing.Points}</td>
                  <td>{standing.Wins}</td>
                  <td>{standing.Draws}</td>
                  <td>{standing.Losses}</td>
                  <td>{standing.GoalsScored}</td>
                  <td>{standing.GoalsAgainst}</td>
                  <td>{standing.GoalsDifferential}</td>
                  <td>{standing.Points}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )}
  </section>
)
}

export default Table;