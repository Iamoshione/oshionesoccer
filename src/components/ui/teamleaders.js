import { Link, useParams } from "react-router-dom";
import UseCustomState from "../../hooks/usecustomstate";
import Jerseyicon from "../../utils/jersyeicon";
import useCustomQuery from "../../hooks/usecustomquery";
import './../../styles/teamleader.css'
import { GET_PLAYER_STATS } from "../../queries/playerstatquery";

function TeamLeader(){
    const [goal, setGoal] = UseCustomState(true)
    const parameters = useParams()
    const {clubId,inputValue,name} = parameters
    const {
        loading: loadingPlayerStats,
        data: playerStatsData,
        error: playerStatsError,
      } = useCustomQuery(GET_PLAYER_STATS, {
        variables: { competition: inputValue, year: 2024 },
      });
      if(loadingPlayerStats) return <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>;
      if(playerStatsError) return (<p>error....</p>)
      const playerSeasonStats = playerStatsData && playerStatsData.playerSeasonStats;
  
 
    const handleOnClick = () => {
        if (goal === true) {
          setGoal(!goal);
        }
      };
      const handleGoalOnClick = () => {
        if (goal === false) {
          setGoal(!goal);
        }
      };
      
      const playerGoals =
    playerStatsData?.playerSeasonStats &&
    playerSeasonStats[0]?.PlayerSeasons.filter(
      (player) => clubId == player?.TeamId
    )
      .sort((a, b) => b.Goals - a.Goals)
      .slice(0, 3)
      .map((player) => {
        return (
          <div key={player.Name} className="player_name_section">
          <div className="player_jersey">
         <Jerseyicon></Jerseyicon>
        </div>
        <div className="athlete_wrapper">
          <h3 className="athlete_name">
            <span className="athlete_player_name"> {player.Name}</span>
            <span className="athlete_player_position">{player.Position}</span>
          </h3>
       <div className="athelte_stats"></div>
       <div className="athlete_matches_ga">
        <div className="athlete_assits">  {parseInt(player.Goals)}</div>
        <div className="athlete_matches">
          <div className="game_games_athlete">Matches
          <span className="athlete_span_game">{player.Games}</span>
          </div>
          <div className="game_games_athlete">Assists
          <span className="athlete_span_game">{parseInt(player.Assists)}</span>
          </div>
        </div>

       </div>
       
        </div>
      </div>
        );
      });
      const playerAssits =
      playerStatsData?.playerSeasonStats &&
      playerSeasonStats[0]?.PlayerSeasons.filter(
        (player) => clubId == player?.TeamId
      )
        .sort((a, b) => b.Assists - a.Assists)
        .slice(0, 3)
        .map((player) => {
          return (
            <div key={player.Name} className="player_name_section">
                <div className="player_jersey">
               <Jerseyicon></Jerseyicon>
              </div>
              <div className="athlete_wrapper">
                <h3 className="athlete_name">
                  <span className="athlete_player_name"> {player.Name}</span>
                  <span className="athlete_player_position">{player.Position}</span>
                </h3>
             <div className="athelte_stats"></div>
             <div className="athlete_matches_ga">
              <div className="athlete_assits">  {parseInt(player.Assists)}</div>
              <div className="athlete_matches">
                <div className="game_games_athlete">Matches
                <span className="athlete_span_game">{player.Games}</span>
                </div>
                <div className="game_games_athlete">Goals
                <span className="athlete_span_game">{parseInt(player.Goals)}</span>
                </div>
              </div>
      
             </div>
             
              </div>
            </div>
          );
        });
return (
    <div className="player__stats_schedule">
    <section>
      <section className="card card_teamLeaders">
        <header className="teamleaders_cardheader">
          <div className="card_header_title_wrapper">
            <h3 className="card_h3_title">2023-2024 Team Leaders</h3>
            <h4 className="card_h4_title">English Premier leauge</h4>
          </div>
        </header>
        <nav className="card__tabs">
          <ul className="tabs__list">
            <li className={goal ? 'tabs__list__item tabs__list__item--active' : "tabs__list__item"} onClick={handleGoalOnClick}><button className="Button--unstyled tabs__link">  Goals </button></li>
            <li className={!goal ? "tabs__list__item tabs__list__item--active" : "tabs__list__item"} onClick={handleOnClick}><button className="Button--unstyled tabs__link"> Assists</button></li>
          </ul>
        </nav>
        <div className="tabs_section_list">
          <div className="content_list">
            <div className="content_list_item">
            {goal ? playerGoals : playerAssits}
            </div>
          </div>
        </div>
        <footer className="tabs_footer"> <Link to={`/soccer/team/${clubId}/${inputValue}/${name}/playerstats`}  className="footer__link">Full Team Stats</Link></footer>
      </section>
    </section>
  </div>
)
}

export default TeamLeader;