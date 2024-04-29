import Mycarousel from "../components/ui/carousel";
import Navbar from "../components/ui/navbar";
import Searchbar from "../components/ui/searchbar";
import Versus from "../components/ui/versus";

function Versuspage(){
    return (
        <div>
            <Searchbar></Searchbar>
            <Navbar></Navbar>
            <Mycarousel></Mycarousel>
            <Versus></Versus>
        </div>
    )
}

export default Versuspage;