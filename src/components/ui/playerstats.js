import useCustomQuery from "../../hooks/usecustomquery";
import { GET_PLAYER_STATS } from "../../queries/playerstatquery";
import { useParams } from "react-router-dom";
import UseCustomState from "../../hooks/usecustomstate";
import './../../styles/playerstats.css'
function Playerstats(){
    const parameters = useParams();
    const [isscoringVisible, setisscoringVisible] = UseCustomState(true);
    const {inputValue,clubId,name} = parameters
  
    console.log(parameters);
    const {
      loading: loadingPlayerStats,
      data: playerStatsData,
      error: playerStatsError,
    } = useCustomQuery(GET_PLAYER_STATS, {
      variables: { competition: inputValue, year: 2024 },
    });
  
    if (loadingPlayerStats) <p>"loading...."</p>;
    if (playerStatsError) <p>"Error fetching data"</p>;
  
    const playerSeasonStats = playerStatsData?.playerSeasonStats;
    console.log(playerSeasonStats);
  
  
  
    const playerGoals =
      playerSeasonStats &&
      playerSeasonStats[0].PlayerSeasons.filter(
        (player) => player.TeamId == clubId
      )
        .sort((a, b) => b.Goals - a.Goals)
        .map((player, index) => (
          <tr>
            <td scope="row" className="table__table_data_data">{index + 1}</td>
            <td className="table__table_data_data"><span>
              <div className="athlete_name_name_div">{player.Name}</div>
              </span></td>
            <td className="table__table_data_data ffvgt">
              <span className="tartar__span">  {player.Games}</span>
            
              </td>
            <td className="table__table_data_data ffvgt">
              <span className="tartar__span">{parseInt(player.Goals)}</span>
              
              </td>
          </tr>
        ));
    const playerAssits =
      playerSeasonStats &&
      playerSeasonStats[0].PlayerSeasons.filter(
        (player) => player.TeamId == clubId
      )
        .sort((a, b) => b.Assists - a.Assists)
        .map((player, index) => (
          <tr>
          <td scope="row" className="table__table_data_data">{index + 1}</td>
          <td className="table__table_data_data"><span>
            <div className="athlete_name_name_div">{player.Name}</div>
            </span></td>
          <td className="table__table_data_data ffvgt">
            <span className="tartar__span">  {player.Games}</span>
          
            </td>
          <td className="table__table_data_data ffvgt">
            <span className="tartar__span">{parseInt(player.Assists)}</span>
            
            </td>
        </tr>
        ));
    const playerDiscipline =
      playerSeasonStats &&
      playerSeasonStats[0].PlayerSeasons.filter(
        (player) => player.TeamId == clubId
      )
        .sort((a, b) => b.YellowRedCards - a.YellowRedCards)
        .map((player, index) => (
          <tr>
          <td scope="row" className="table__table_data_data">{index + 1}</td>
          <td className="table__table_data_data"><span>
            <div className="athlete_name_name_div">{player.Name}</div>
            </span></td>
          <td className="table__table_data_data ffvgt">
            <span className="tartar__span">   {parseInt(player.YellowRedCards)}</span>
          
            </td>
          <td className="table__table_data_data ffvgt">
            <span className="tartar__span"> {parseInt(player.RedCards)}</span>
      
            </td>
          <td className="table__table_data_data ffvgt">
            <span className="tartar__span">    {parseInt(player.RedCards + player.YellowRedCards)}</span>
      
            </td>
         
        </tr>
          
        ));
  
  
  
  
  
    const handleScoreOnClick = () => {
      if (!isscoringVisible) {
        setisscoringVisible(true);
      }
    };
    const handleDisciplineOnClick = () => {
      if (isscoringVisible) {
        setisscoringVisible(false);
      }
    };
  
    return (
      <>
    <div className="playerstats_container__ff">
      <div className="player_player__f5">
        <div className="layout_layout__column">
          <section className="card__card">
            <div className="wrapper__card_content">
              <div className="team_name__name "><h1 className="card_h1_h1">{name} {isscoringVisible?'Scoring':'Discipline'}</h1></div>
              <div className='scoring_discipline_tabs'>
                <div className='score__tabs_iiop'>
                  <ul className='tabs__list_iuyefc'>
                    <li className={isscoringVisible? 'tabs__list__item tabs__list__item--active' :'tabs__list__item'} onClick={handleScoreOnClick}><a className='link_links__tabs'>Scoring</a></li>
                    <li className={!isscoringVisible? 'tabs__list__item tabs__list__item--active':'tabs__list__item'}  onClick={handleDisciplineOnClick}><a className='link_links__tabs'>Discipline</a></li>
                  </ul>
                   </div>
              </div>
              <div className="myt6uu">
               {isscoringVisible?( <div className="qtcby">
                  <div className="topscorers_uuije">
                    <section>
                    <div>
                      <div className="table_title__table">Top Scorers</div>
                      <div className="flex__table">
                        <div className="table_wrapper__table">
                          <div className="shadow__table_left"></div>
                          <div className="table__scroller_con">
                            <table className="table__ie99">
                              <colgroup className="table__colgroup">
                                <col className="table__col"></col>
                                <col className="table__col"></col>
                                <col className="table__col"></col>
                                <col className="table__col"></col>
                              </colgroup>
                              <thead className="table__thead_poiuv">
                                <tr className="table_tr_tr_ooid">
                                  <th className="table__th_6ttfge">
                                    <span className="table__span_gcfw">RK</span>
                                  </th>
                                  <th className="table__th_6ttfge">
                                      <span className="span__Table__oosne">Name</span>
                                  </th>
                                  <th className="table__th_6ttfge ffvgt">
                                    <span className="wjhcd_th_table">P</span>
                                  </th>
                                  <th className="table__th_6ttfge ffvgt">
                                  <span className="wjhcd_th_table">G</span>
                                  </th>
                                </tr>
                               
                              </thead>
                              <tbody className="table__tbody_ijey">
                              {playerGoals && playerGoals}
                              </tbody>
                            </table>
                          </div>
                          <div className="shadow__table_right"></div>
                        </div>
                      </div>
                    </div>
                    </section>
                    </div>
                  <div className="topscorers_uuije">
                  <section>
                    <div>
                      <div className="table_title__table">Top Assists</div>
                      <div className="flex__table">
                        <div className="table_wrapper__table">
                          <div className="shadow__table_left"></div>
                          <div className="table__scroller_con">
                            <table className="table__ie99">
                              <colgroup className="table__colgroup">
                                <col className="table__col"></col>
                                <col className="table__col"></col>
                                <col className="table__col"></col>
                                <col className="table__col"></col>
                              </colgroup>
                              <thead className="table__thead_poiuv">
                                <tr className="table_tr_tr_ooid">
                                  <th className="table__th_6ttfge">
                                    <span className="table__span_gcfw">RK</span>
                                  </th>
                                  <th className="table__th_6ttfge">
                                      <span className="span__Table__oosne">Name</span>
                                  </th>
                                  <th className="table__th_6ttfge ffvgt">
                                    <span className="wjhcd_th_table">P</span>
                                  </th>
                                  <th className="table__th_6ttfge ffvgt">
                                  <span className="wjhcd_th_table">A</span>
                                  </th>
                                </tr>
                               
                              </thead>
                              <tbody className="table__tbody_ijey">
                              {playerAssits && playerAssits}
                              </tbody>
                            </table>
                          </div>
                          <div className="shadow__table_right"></div>
                        </div>
                      </div>
                    </div>
                    </section>
                  </div>
                </div>):(
                   <section>
                   <div>
                     <div className="table_title__table">Discipline</div>
                     <div className="flex__table">
                       <div className="table_wrapper__table">
                         <div className="shadow__table_left"></div>
                         <div className="table__scroller_con">
                           <table className="table__ie99">
                             <colgroup className="table__colgroup">
                               <col className="table__col"></col>
                               <col className="table__col"></col>
                               <col className="table__col"></col>
                               <col className="table__col"></col>
                             </colgroup>
                             <thead className="table__thead_poiuv">
                               <tr className="table_tr_tr_ooid">
                                 <th className="table__th_6ttfge">
                                   <span className="table__span_gcfw">RK</span>
                                 </th>
                                 <th className="table__th_6ttfge">
                                     <span className="span__Table__oosne">Name</span>
                                 </th>
                                 <th className="table__th_6ttfge">
                                   <span className="wjhcd_th_table">YC</span>
                                 </th>
                                 <th className="table__th_6ttfge ffvgt">
                                 <span className="wjhcd_th_table">RC</span>
                                 </th>
                                 <th className="table__th_6ttfge ffvgt">
                                 <span className="wjhcd_th_table">PTS</span>
                                 </th>
                               </tr>
                              
                             </thead>
                             <tbody className="table__tbody_ijey">
                             {playerDiscipline&&playerDiscipline}
                             </tbody>
                           </table>
                         </div>
                         <div className="shadow__table_right"></div>
                       </div>
                     </div>
                   </div>
                   </section>
                )}
              </div>
              <div className="gloassary_yyhw">
                <h3 className="glossary_title">Glossary</h3>
                <ul className="glossary_list">
                  <li className="glossary__list__listitem">
                    <span className="glos__ttyd">RK:</span>
                    Ranking
                  </li>
                  <li className="glossary__list__listitem">
                    <span className="glos__ttyd">Name:</span>
                    Athlete Name
                  </li>
                  <li className="glossary__list__listitem">
                    <span className="glos__ttyd">P:</span>
                 Games Played
                  </li>
                  <li className="glossary__list__listitem">
                    <span className="glos__ttyd">G:</span>
                   Goals Scored
                  </li>
                  <li className="glossary__list__listitem">
                    <span className="glos__ttyd">P:</span>
                    Games Played 
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
      </>
    );
}

export default Playerstats