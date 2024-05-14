import "./../../styles/navbar.css";
import { premleauge } from "../../leauges/premierleauge";
import { majorls } from "../../leauges/mls";
import { laliga } from "../../leauges/laliga";
import { deb } from "../../leauges/germantabl";
import { france } from "../../leauges/france";

import { Link } from "react-router-dom";
function Navbar() {
  const premleaugemapped = premleauge.map((club) => (
    <div className="col-md-3">
      <Link to={`/soccer/team/${club.clubId}/EPL/${club.name}`}>
        <div className="nhagt">  <img src={club.imgUrl} style={{width:'28px'}}></img>
      {club.name}</div>
    
      </Link>
     
    </div>
  ));
  const majorlsmapped = majorls.map((club)=>(
    <div className="col-md-3">
      <Link to={`/soccer/team/${club.clubid}/MLS/${club.name}`}>
      <img src={club.imgUrl} style={{width:'28px'}}></img>
      {club.name}
      </Link>
   
    </div>
  ));
  const laligamapped = laliga.map((club)=>(
    <div className="col-md-3">
      <Link to={`/soccer/team/${club.clubid}/ESP/${club.name}`}>  <img src={club.imgUrl} style={{width:'28px'}}></img>
      {club.name}</Link>
    
    </div>
  ))
  const debMapped = deb.map((club)=>(
    <div className="col-md-3">
      <Link to={`/soccer/team/${club.clubid}/deb/${club.name}`}>
      <img src={club.imgUrl} style={{width:'28px'}}></img>
      {club.name}
      </Link>
    </div>
  ))
  const francemapped = france.map((club)=>(
    <div className="col-md-3">
      <Link to={`/soccer/team/${club.teamId}/frl1/${club.name}`}>
      <img src={club.imgUrl} style={{width:'28px'}}></img>
      {club.name}
      </Link>
    </div>
  ))
  return (
    <>
      <header class="header">
        <div class="container">
          <div class="row v-centre">
            <div class="header-item item-left">
              <div class="logo">
                <Link to={'/'}> OSHSOCCER</Link>
              </div>
            </div>
            <div class="header-item item-centre">
              <nav class="menu">
                <ul class="menu-main">
                  <li className="menu-item-has-children">
                    <a href="#">EPL</a>
                    <div className="sub-menu mega-menu mega-menu-column-4">
                      {premleaugemapped}
                    </div>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">MLS</a>
                    <div className="sub-menu mega-menu mega-menu-column-4">
                  {majorlsmapped}
                    </div>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">ESP</a>
                    <div className="sub-menu mega-menu mega-menu-column-4">
                  {laligamapped}
                    </div>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">DEB</a>
                    <div className="sub-menu mega-menu mega-menu-column-4">
                      {debMapped}
                    </div>
                  </li>
                  <li className="menu-item-has-children">
                    <a href="#">FRL1</a>
                    <div className="sub-menu mega-menu mega-menu-column-4">
                     {francemapped}
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
