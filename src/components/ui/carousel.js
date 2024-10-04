import "./../../styles/carousel.css";
import { GET_TEAM_INFO } from "../../queries/teamquery";
import useCustomQuery from "../../hooks/usecustomquery";
import { Link } from "react-router-dom";
import useCustomRef from "../../hooks/usecustomref";

function Mycarousel() {
  const scrollContainerRef = useCustomRef(null);
  const {
    loading: loadingTeamInfo,
    error: teamError,
    data: teamData,
  } = useCustomQuery (GET_TEAM_INFO, { variables: { competition: "ESP" } });
  if (loadingTeamInfo) <p>loading...</p>;
  if (teamError) <p>error fetching data</p>;

  const scrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  const currentDate = new Date();
  
  const oneWeeksAgo = new Date();
  oneWeeksAgo.setDate(currentDate.getDate() - 21);

  const teamDataFiltered = teamData?.teamInfo[0]?.Games.filter((game) => {
    const gameDate = new Date(game?.DateTime);
    return gameDate >= oneWeeksAgo && gameDate <= currentDate;
  });
  

  
  console.log("teamdatafilterd", teamDataFiltered);
  const teamsArr = teamData?.teamInfo[0]?.Teams;

  const teamDatamapped = teamDataFiltered?.map((team) => {

    const homeTeamspic = teamsArr.find(
      (club) => club?.TeamId == team?.HomeTeamId
    );

    const awayTeamspic = teamsArr.find(
      (club) => club?.TeamId == team?.AwayTeamId
    );

   return (
      <>
          <Link to={`/soccer/match/esp/${team.GameId}`} className="cWMvwC ">
          <div className="sc-ae68ee86-0 sc-65cacb3-2 lfBOkN hecnsm">
            <div className="dKAJxh">
              <div className="sc-ae68ee86-0 sc-65cacb3-8 ddDfDQ dOidzo">
                <div className="sc-ae68ee86-0 sc-65cacb3-3 djUwLc hxgmLb">
                 Sat, 10:00am
                </div>
              </div>
            </div>
            <div className="dvhceJ ">
              <div className="ddDfDQ">
                <div className="sc-ae68ee86-0 sc-65cacb3-11 hSLMQR eaCEXA">
                  <div className="bCmGTr">
                    <div className="cYSEpS">
                      <span className="span1"></span>
                      <img
                        className="img-logo"
                        src={homeTeamspic.WikipediaLogoUrl}
                      ></img>
                    </div>
                  </div>
                  <div className="bNUHdj ">
                    <div className="iZbOpO">{team.HomeTeamKey}</div>
                    {team.HomeTeamScore}
                  </div>
                </div>
                <div className="sc-ae68ee86-0 sc-65cacb3-11 hSLMQR eaCEXA">
                  <div className="bCmGTr">
                    <div className="cYSEpS">
                      <span className="span1"></span>
                      <img
                        className="img-logo"
                        src={awayTeamspic.WikipediaLogoUrl}
                      
                      ></img>
                    </div>
                  </div>
                  <div className="bNUHdj ">
                    <div className="iZbOpO"> hello{team.AwayTeamKey}</div>
                    {team.AwayTeamScore}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </>
    );
  });

/*return (
    <>
      <div className="dxuWPS">
        <div className="bdUdHw">
          <div className="iWInUc ">
            <div className="fTCWI" onClick={scrollLeft}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="12"
                fill="none"
                className="hYWBvC"
              >
                <path d="M7.368 10.462 6.232 11.6l-5.6-5.608 1.136-1.138L6.216.4l1.136 1.138-4.448 4.454 4.464 4.47Z"></path>
              </svg>
            </div>
            <div ref={scrollContainerRef} className="fWffNe">
              <div className="FtaTg">{teamDatamapped && teamDatamapped}</div>
              <div className="idWQRy"></div>
            </div>
            <div className="fTCWI" onClick={scrollRight}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="12"
                fill="none"
                className="eCjEOr"
              >
                <path d="M.632 10.462 1.768 11.6l5.6-5.608-1.136-1.138L1.784.4.648 1.538l4.448 4.454-4.464 4.47Z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
); 
*/
}

export default Mycarousel;