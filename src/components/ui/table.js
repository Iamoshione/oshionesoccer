import { useParams } from "react-router-dom";
import useCustomQuery from "../../hooks/usecustomquery";
import { GET_STANDINGS } from "../../queries/standingquery";
import { GET_TEAM_INFO } from "../../queries/teamquery";
import "./../../styles/table.css";
function Table() {
  const parameters = useParams();
  const { inputValue } = parameters;
  const {
    loading: loadingStandings,
    data: standingsData,
    error: standingsError,
  } = useCustomQuery(GET_STANDINGS, { variables: { competition: inputValue } });
  const {
    loading: loadingTeamInfo,
    data: teamInfoData,
    error: teamInfoError,
  } = useCustomQuery(GET_TEAM_INFO, {
    variables: { competition: inputValue },
  });
  if (loadingStandings || loadingTeamInfo)
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  if (standingsError || teamInfoError) return <p>Nothing to display...</p>;
  const { standings_feed } = standingsData;
  return (
    <section>
      {standings_feed && (
        <div
          className="standings-section "
          style={{ width: "17cm", padding: "10px" }}
        >
          <table className="table table-white  table-striped">
            <thead>
              <tr className="hdeahead">
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
              {standingsData.standings_feed[0].Standings.slice(0, 19).map(
                (standing, index) => {
                  const item = teamInfoData && teamInfoData.teamInfo[0];
                  const itemFind = item.Teams.find(
                    (team) => team.TeamId == standing.TeamId
                  );

                  return (
                    <tr key={index}>
                      <td>
                        <div className="vtcghj">
                          <div className="wboeimg">
                            {" "}
                            <img
                              src={itemFind ? itemFind.WikipediaLogoUrl : ""}
                              style={{ width: "15px" }}
                              alt=""
                            />
                          </div>

                          {standing.ShortName}
                        </div>
                      </td>

                      <td className="mnmnmnm">{standing.Points}</td>
                      <td  className="mnmnmnm">{standing.Wins}</td>
                      <td  className="mnmnmnm">{standing.Draws}</td>
                      <td  className="mnmnmnm">{standing.Losses}</td>
                      <td  className="mnmnmnm">{standing.GoalsScored}</td>
                      <td  className="mnmnmnm">{standing.GoalsAgainst}</td>
                      <td  className="mnmnmnm" style={{color: standing?.GoalsDifferential>0?'rgb(0, 153, 68)':'rgb(221, 0, 0)'}}>{standing.GoalsDifferential}</td>
                      <td  className="mnmnmnm">{standing.Points}</td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Table;
