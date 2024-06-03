import { useParams } from "react-router-dom";
import useCustomQuery from "../../hooks/usecustomquery";
import { GET_TEAM_INFO } from "../../queries/teamquery";
import { Link } from "react-router-dom";
import "./../../styles/schedule.css";
import UseCustomState from "../../hooks/usecustomstate";
import { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton'

function Schedule() {
  const parameters = useParams();
  const[loaded, setLoaded] = UseCustomState(false)
  const { clubId, inputValue } = parameters;
  const {
    loading: loadingTeamInfo,
    data: teamInfoData,
    error: teamInfoError,
  } = useCustomQuery(GET_TEAM_INFO, {
    variables: { competition: inputValue },
  });
  useEffect(() => {
 
    setLoaded(true);
  }, []);
  if (loadingTeamInfo) return <Skeleton count={5}></Skeleton>


  if (teamInfoError) return <p>error..</p>;
  const leaugeName = teamInfoData && teamInfoData.teamInfo[0].Name;

  return (
    <>
    <div  className={`fade-in ${loaded ? 'loaded' : ''}`}>
    <div className="schedule__schedule_layout">
        <section>
          <div>
            <section className="schedule_section">
              <div className="my_schedule_header">
                <h1 className="header_schedule">Schedule</h1>
              </div>
              <div className="schedule_containerl4">
                {teamInfoData &&
                  teamInfoData.teamInfo.map((item) => (
                    <section className="club-schedule-container">
                      {item?.Games.filter(
                        (game) =>
                          game?.AwayTeamScore !== null &&
                          game?.HomeTeamScore !== null
                      ).map((game) => {
                        if (
                          clubId == game.AwayTeamId ||
                          clubId == game.HomeTeamId
                        ) {
                          const homeTeampic = item.Teams.find(
                            (team) => team.TeamId == game.HomeTeamId
                          );
                          const awayTeamPic = item.Teams.find(
                            (team) => team.TeamId == game.AwayTeamId
                          );
                          return (
                            <Link
                              to={`/soccer/match/${inputValue}/${game.GameId}`}
                              className="schedule_link"
                            >
                              <div className="schedule__game__wrapper">
                                <header className="schedule_header">
                                  <div className="schedule_game_con">
                                    <div className="schedule_game pr2 pl2">
                                      <img
                                        className="schedule_logo"
                                        src={
                                          homeTeampic
                                            ? homeTeampic.WikipediaLogoUrl
                                            : ""
                                        }
                                        alt="Home Team Logo"
                                      />
                                      <div className="schedule__team meatemoh ">
                                        {" "}
                                        {game.HomeTeamKey}
                                      </div>
                                    </div>
                                    <div className="schedule_home_score">
                                      {game.HomeTeamScore}
                                    </div>
                                  </div>
                                  <div className="schedule_time">
                                    <div className="schedule_time_wrapper">
                                      FT
                                    </div>
                                  </div>
                                  <div className="schedule_game_con">
                                    <div className="schedule_home_score">
                                      {game.AwayTeamScore}
                                    </div>
                                    <div className="schedule_game pr2 pl2">
                                      <img
                                        src={
                                          awayTeamPic
                                            ? awayTeamPic.WikipediaLogoUrl
                                            : ""
                                        }
                                        alt="Away Team Logo"
                                        className="schedule_logo"
                                      />
                                      <div className="schedule__team meatemoh ">
                                        {" "}
                                        {game.AwayTeamKey}
                                      </div>
                                    </div>
                                  </div>
                                </header>
                                <div className="Leauge_name_name">
                                  <p>{leaugeName && leaugeName}</p>
                                </div>
                              </div>
                            </Link>
                          );
                        }
                      })}
                    </section>
                  ))}
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
    </>
  );
}

export default Schedule;
