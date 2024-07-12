import { Link, Outlet, useParams } from "react-router-dom";
import useCustomQuery from "../../hooks/usecustomquery";
import { GET_TEAM_INFO } from "../../queries/teamquery";
import "./../../styles/teamheader.css";
import Searchbar from "./searchbar";

import Mycarousel from "./carousel";
import Navbar from "./navbar";

function Teamheader() {
  const parameters = useParams();
  const { clubId, inputValue } = parameters;
  const {
    loading: loadingTeamInfo,
    error: teamInfoError,
    data: teamInfoData,
  } = useCustomQuery(GET_TEAM_INFO, { variables: { competition: inputValue } });
  const dataFiltered = teamInfoData?.teamInfo[0]?.Teams.filter(
    (team) => team?.TeamId == clubId
  );
  console.log(dataFiltered);
  const dataFilteredMapped = dataFiltered?.map((club) => (
    <>
      <div className="a1container__oo">
        <div className="container__oo_inner">
          <div className="header__team_oo">
            <div className="hhdtcu">
              <div className="forma__container">
                <img
                  src={club.WikipediaLogoUrl}
                  className="logo__team_header_oo"
                ></img>
                <div className="oo_name__headerteam">
                  <h1 className="ttyus">
                    <span className="qesrcg">
                      <span className="wesdxf">{club.Name}</span>
                    </span>
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="link_link_yytsi">
          <div>
            <span></span>
          </div>
          <nav className="beyucp">
            <ul className="oo_list_items__header">
              <li className="crdfgve"></li>
              <li className="li__oopw">
                <Link
                  to={`/soccer/team/${clubId}/${inputValue}/${club.Name}`}
                  className="a__aa_team"
                >
                  <span>Home</span>
                </Link>
              </li>
           
              <li className="li__oopw">
                <Link
                  to={`/soccer/team/${clubId}/${inputValue}/squads`}
                  className="a__aa_team"
                >
                  <span>Squads</span>
                </Link>
              </li>
              <li className="li__oopw">
                <Link
                  to={`/soccer/team/${clubId}/${inputValue}/${club.Name}/playerstats`}
                  className="a__aa_team"
                >
                  <span>Stats</span>
                </Link>
              </li>
              <li className="li__oopw">
                <Link className="a__aa_team">
                  <span></span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="link_sticky_container">
          <div className="sticky__gradient"></div>
        </div>
      </div>
    </>
  ));

  return (
    <>
      <Searchbar></Searchbar>
      <Navbar></Navbar>
      <Mycarousel></Mycarousel>
      {dataFilteredMapped && dataFilteredMapped}
      <Outlet>
        
      </Outlet>
    </>
  );
}

export default Teamheader;
