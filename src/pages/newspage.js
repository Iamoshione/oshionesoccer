import Mycarousel from "../components/ui/carousel";
import Navbar from "../components/ui/navbar";
import Newslist from "../components/ui/news";
import Searchbar from "../components/ui/searchbar";

function NewsPage(){
    return (
        <div>
            <Searchbar></Searchbar>
            <Navbar></Navbar>
            <Mycarousel></Mycarousel>
            <Newslist></Newslist>
        </div>
    )
}
export default NewsPage