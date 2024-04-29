import { useParams } from "react-router-dom";
import { GET_BOX_SCORE } from "../../queries/boxscore";
import { GET_TEAM_INFO } from "../../queries/teamquery";
import useCustomQuery from "../../hooks/usecustomquery";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./../../styles/versus.css";
import { Accordion,AccordionBody,AccordionItem,AccordionHeader } from "react-bootstrap";
import SoccerLineUp from "react-soccer-lineup";
function Versus() {
  const parameters = useParams();
  const { competition } = parameters;
  const gameId = parseInt(parameters.gameId);
  const {
    loading: loadingBoxScore,
    error: errorBoxScore,
    data: boxScoreData,
    refetch: refetchBoxScore,
  } = useCustomQuery(GET_BOX_SCORE, {
    variables: { competition: competition, gameid: gameId },
  });
  const {
    loading: loadingTeamInfo,
    error: teamInfoError,
    data: teamInfoData,
    refetch: refetchTeamInfo,
  } = useCustomQuery(GET_TEAM_INFO, { variables: { competition: competition } });
  useEffect(() => {
    refetchBoxScore();
    refetchTeamInfo();
  }, [gameId]);
  if (loadingBoxScore || loadingTeamInfo) <p>loading...</p>;
  if (errorBoxScore || teamInfoError) <p>Error fetching data</p>;
  const score = boxScoreData?.boxscore.map((boxItem) => {
    const goals = boxItem?.Goals;
    const games = boxItem.Game;
    const lineup = boxItem.Lineups;
    const playerGame = boxItem.PlayerGames;
    const teamGames = boxItem?.TeamGames;
    const hometeamStatistics = teamGames?.find(
      (club) => club?.TeamId == games.HomeTeamId
    );
    const awayTeamStatistics = teamGames?.find(
      (club) => club?.TeamId == games?.AwayTeamId
    );
    const team = teamInfoData?.teamInfo[0]?.Teams;
    const homeTeam = team?.find((game) => game.TeamId === games?.HomeTeamId);
    const awayTeam = team?.find((game) => game.TeamId === games?.AwayTeamId);

    function isValidColor(color) {
      const s = new Option().style;
      s.color = color;
      return s.color !== "";
    }
    const homeTeamClubColor1 = isValidColor(homeTeam?.ClubColor1)
      ? homeTeam?.ClubColor1
      : isValidColor(homeTeam?.ClubColor2)
      ? homeTeam?.ClubColor2
      : "#000";

    const awayTeamClubColor1 = isValidColor(awayTeam?.ClubColor1)
      ? awayTeam?.ClubColor1
      : isValidColor(awayTeam?.ClubColor2)
      ? awayTeam?.ClubColor2
      : "#000";
    const myDate = new Date(games?.DateTime).toString();
    const thedate = myDate.slice(0, 11);
    const homeTeamLineup = lineup?.filter(
      (player) =>
        player?.TeamId === games?.HomeTeamId && player.Type === "Starter"
    );
    const awayTeamLineup = lineup?.filter(
      (player) =>
        player?.TeamId === games?.AwayTeamId && player.Type === "Starter"
    );
    const homeTeamStatsArray = [];
    const homeTeamLineupmapped = homeTeamLineup.map((player) => {
      const hometeamStats = playerGame.filter(
        (playerStat) => playerStat?.PlayerId == player?.PlayerId
      );
      homeTeamStatsArray.push(...hometeamStats);
    });
    console.log("hometeamstats", homeTeamStatsArray);
    const homeTeamStatsArraymapped = homeTeamStatsArray.map(
      (playerinfo, index) => (
        <>
          <Accordion.Item eventKey={index}>
            <Accordion.Header>{playerinfo.ShortName}</Accordion.Header>
            <Accordion.Body>Goals:{playerinfo.Goals}</Accordion.Body>
          </Accordion.Item>
        </>
      )
    );
    const awayTeamStatsArray = [];
    const awayTeamLineupmapped = awayTeamLineup.map((player) => {
      const awayteamStats = playerGame.filter(
        (playerStat) => playerStat?.PlayerId == player?.PlayerId
      );
      awayTeamStatsArray.push(...awayteamStats);
    });
    console.log("hometeamstats", homeTeamStatsArray);
    const awayTeamStatsArraymapped = awayTeamStatsArray.map(
      (playerinfo, index) => (
        <>
          <Accordion.Item eventKey={index}>
            <Accordion.Header>
              {playerinfo.ShortName}
              {playerinfo.Position}
            </Accordion.Header>
            <Accordion.Body>Goals:{playerinfo.Goals}</Accordion.Body>
          </Accordion.Item>
        </>
      )
    );

    console.log("hometeamLineup:", homeTeamLineup);
    console.log("awayteamLineup:", awayTeamLineup);

    const homeTeamGoal = goals?.filter(
      (score) => score?.TeamId == homeTeam?.TeamId
    );

    const awayTeamGoal = goals?.filter(
      (score) => score?.TeamId == awayTeam?.TeamId
    );
    const homeTeamGoalScore = homeTeamGoal.length;
    const awayTeamGoalScore = awayTeamGoal.length;
    const awayTeamGoalNames = awayTeamGoal?.map((goal) => (
      <span className="ertyuh">
        <i class="fa-regular fa-futbol"></i>
        {goal.Name}
        <span className="time_score_time"> {goal.GameMinute}'</span>
      </span>
    ));
    const homeTeamGoalNames = homeTeamGoal?.map((goal) => (
      <span className="ertyuh">
        {goal.Name}
        <span className="time_score_time"> {goal.GameMinute}'</span>
        <i class="fa-regular fa-futbol"></i>
      </span>
    ));
    console.log("goals", homeTeamGoal);
    const homeSquad = lineup.reduce(
      (acc, player) => {
        if (player.TeamId === games?.HomeTeamId && player.Type === "Starter") {
          if (player.Position === "GK") {
            acc.gk = { name: player.Name };
          } else if (player.Position === "D") {
            acc.df = acc.df || [];
            acc.df.push({ name: player.Name });
          } else if (player.Position === "M") {
            acc.cm = acc.cm || [];
            acc.cm.push({ name: player.Name });
          } else if (player.Position === "A") {
            acc.fw = acc.fw || [];
            acc.fw.push({ name: player.Name });
          }
        }
        return acc;
      },
      { gk: "", df: [], cm: [], fw: [] }
    );
    const awaySquad = lineup.reduce(
      (acc, player) => {
        if (player.TeamId === games?.AwayTeamId && player.Type === "Starter") {
          if (player.Position === "GK") {
            acc.gk = { name: player.Name };
          } else if (player.Position === "D") {
            acc.df = acc.df || [];
            acc.df.push({ name: player.Name });
          } else if (player.Position === "M") {
            acc.cm = acc.cm || [];
            acc.cm.push({ name: player.Name });
          } else if (player.Position === "A") {
            acc.fw = acc.fw || [];
            acc.fw.push({ name: player.Name });
          }
        }
        return acc;
      },
      { gk: "", df: [], cm: [], fw: [] }
    );
    const homeStyle = {
      color: homeTeamClubColor1,
      numberColor: "#ffffff",
      nameColor: "#ffffff",
    };

    const awayStyle = {
      color: awayTeamClubColor1,
      numberColor: "#333333",
      nameColor: "#ffffff",
    };
    return (
      <>
        <div className="versus_versus_container">
          <div className="header__versus">
            <div className="team_team_home">
              <div className="container_home__team">
                <div className="team__home_name">
                  <Link>
                    <div className="name_team_team_home">{homeTeam?.Name}</div>
                  </Link>
                </div>
                <Link>
                  {" "}
                  <div className="image_holder__image">
                    <div className="image__ttysh">
                      <div className="ksijy__image jjui">
                        <span className="span__spann_span">
                          <span className="iijuys_spans iios">
                            <img
                              src={homeTeam?.WikipediaLogoUrl}
                              className="ujsii"
                            ></img>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="time_time__scores">
              <div className="iiop_times__score">
                <div className="astyfi">
                  <div className="home_team_number_team">
                    <div className="team_hhysk_num">{homeTeamGoalScore}</div>
                  </div>
                  <div className="time_num_ijyu">
                    <div className="time__time">
                      <span className="date__span_date">{thedate}</span>
                    </div>
                    <div className="full_time_j">FT</div>
                  </div>
                  <div className="home_team_number_team">
                    <div className="hftyui">{awayTeamGoalScore}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="team_away_away">
              <div className="away_team_team_away">
                <Link>
                  <div className="image_holder__image">
                    <div className="image__ttysh">
                      <div className="ksijy__image jjui">
                        <span className="span__spann_span">
                          <span className="iijuys_spans iios">
                            <img
                              src={awayTeam?.WikipediaLogoUrl}
                              className="ujsii"
                            ></img>
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="kkyju_away_team">
                  <Link>
                    <div className="mmsjik">{awayTeam?.Name}</div>
                  </Link>
                </div>
              </div>
            </div>
            <div className="hhdysi">
              <div className="scorers__con_conn">
                <div className="acyuhr">
                  <div className="ffjjk">
                    <div className="teamgg__gg_con">
                      <div className="ccytb">
                        {" "}
                        {homeTeamGoalNames && homeTeamGoalNames}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="xg_conn"></div>
                <div className="acyuhr">
                  {" "}
                  <div className="awy_tea_content">
                    <div className="ttghsb">
                      <div className="ccytb">
                        {" "}
                        {awayTeamGoalNames && awayTeamGoalNames}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
  return (
    <>
      <div className="versus_ppsij">{score && score}</div>
    </>
  );
}

export default Versus;
