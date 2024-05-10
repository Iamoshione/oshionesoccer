import "./../../styles/navbar.css";
import { premleauge } from "../../leauges/premierleauge";
import { majorls } from "../../leauges/mls";
import { laliga } from "../../leauges/laliga";
import { deb } from "../../leauges/germantabl";
function Navbar() {
  const premleaugemapped = premleauge.map((club) => (
    <div className="list-item">
      <img src={club.imgUrl} style={{width:'28px'}}></img>
      {club.name}
    </div>
  ));
  const majorlsmapped = majorls.map((club)=>(
    <div className="col-md-3">
      <img src={club.imgUrl} style={{width:'28px'}}></img>
      {club.name}
    </div>
  ));
  const laligamapped = laliga.map((club)=>(
    <div className="col-md-3">
      <img src={club.imgUrl} style={{width:'28px'}}></img>
      {club.name}
    </div>
  ))
  const debMapped = deb.map((club)=>(
    <div className="col-md-3">
      <img src={club.imgUrl} style={{width:'28px'}}></img>
      {club.name}
    </div>
  ))
  return (
    <>
      <header class="header">
        <div class="container">
          <div class="row v-centre">
            <div class="header-item item-left">
              <div class="logo">
                <a href="#">OshSoccer</a>
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
