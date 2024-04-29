import Searchbar from "../components/ui/searchbar";
import Navbar from "../components/ui/navbar";
import Mycarousel from "../components/ui/carousel";
import News from "../components/ui/newslist";
import QuickLinks from "../components/ui/quicklinks";

function Homepage() {
  return (
    <div>
      <Searchbar></Searchbar>
      <Navbar></Navbar>
      <Mycarousel></Mycarousel>
      <div>
        <QuickLinks></QuickLinks>
        <News></News>
      </div>
    </div>
  );
}
export default Homepage;
