import Teamheader from "./components/ui/teamheader";
import ClubPage from "./pages/clubspage";
import Homepage from "./pages/homepage";
import NewsPage from "./pages/newspage";
import { createBrowserRouter,RouterProvider,Router } from "react-router-dom";
import Versuspage from "./pages/versuspage";
import Squad from "./components/ui/squad";
import Playerstats from "./components/ui/playerstats";

const route = createBrowserRouter([
  {
 path:'/',
 element: <Homepage></Homepage>

  },

  {
    path: "/headline/news/_id/:newstitle",
    element: <NewsPage></NewsPage>,
  },
  {
    path: "/soccer/team/:clubId/:inputValue",
    element : <Teamheader></Teamheader>,
    children:[
      {
        path: "/soccer/team/:clubId/:inputValue/:name",
        element:<ClubPage></ClubPage>
      },
      {
        path: "/soccer/team/:clubId/:inputValue/squads",
        element: <Squad></Squad>,
      },
      {
        path: "/soccer/team/:clubId/:inputValue/:name/playerstats",
        element: <Playerstats></Playerstats>,
      }
      
    ]
    
  },
  {
    path:'/soccer/match/:competition/:gameId',
    element:<Versuspage></Versuspage>
  }

]);

function App() {

  return (
    <RouterProvider router={route}></RouterProvider>
  );
}

export default App;
