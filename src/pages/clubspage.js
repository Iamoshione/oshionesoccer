import Searchbar from "../components/ui/searchbar";
import Navbar from "../components/ui/navbar";
import Mycarousel from "../components/ui/carousel";
import Schedule from "../components/ui/schedule";
import Table from "../components/ui/table";
import TeamLeader from "../components/ui/teamleaders";

function ClubPage(){




    return (
        <>
        <div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
            <Schedule></Schedule>
            <Table></Table>
            <TeamLeader></TeamLeader>
        </div>
        </div>
      
      
 
        </>
    )
}
export default ClubPage;