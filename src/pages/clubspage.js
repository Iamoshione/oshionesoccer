import Searchbar from "../components/ui/searchbar";
import Navbar from "../components/ui/navbar";
import Mycarousel from "../components/ui/carousel";
import Schedule from "../components/ui/schedule";
import Table from "../components/ui/table";
import TeamLeader from "../components/ui/teamleaders";
import './../styles/clubpage.css'
import CopyRight from "../components/ui/copyright";

function ClubPage() {

  return (
    <>
      <div className="clubpage-container ft" >
        <div className="pageclubb layoutclubpage">
          <div className="myncths">
            <Schedule></Schedule>
          </div>

          <div className="ctepose">
            <Table></Table>
          </div>
          <div className="vhfppa">
            <TeamLeader></TeamLeader>
          </div>
        </div>
  
      </div>
    </>
  );
}
export default ClubPage;
