import Searchbar from "../components/ui/searchbar";
import Navbar from "../components/ui/navbar";
import Mycarousel from "../components/ui/carousel";
import News from "../components/ui/newslist";
import QuickLinks from "../components/ui/quicklinks";
import CopyRight from "../components/ui/copyright";

function Homepage() {
  return (
    <div>
  
      <Searchbar></Searchbar>
      <Mycarousel></Mycarousel>
      <Navbar></Navbar>
      <div style={{padding:'10px'}}>
        <News></News>
      </div>
      <CopyRight></CopyRight>
    </div>
  );
}
export default Homepage;
