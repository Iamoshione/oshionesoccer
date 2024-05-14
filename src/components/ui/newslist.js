import { Link } from "react-router-dom";
import useCustomQuery from "../../hooks/usecustomquery";
import { GET_ARTICLES } from "../../queries/newsquery";
import UseCustomState from "../../hooks/usecustomstate";
import "./../../styles/newslist.css";

function Newslist() {
  const { loading, error, data } = useCustomQuery(GET_ARTICLES);
  const [hoverState, setHoverState] = UseCustomState(false);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.article) return <p>No articles found.</p>;
  console.log(data);
  const handleonMouseOver = () => {
    setHoverState(true);
  };
  const handleMouseLeave = () => {
    setHoverState(false);
  };
  return (
    <>
    <div className="pijnhg"> 
    <div className="row row-cols-1 row-cols-md-4 g-4">
        {data.article.map((article) => {
          if (article.urlToImage) {
            return (
              <>
                <Link to={`/headline/news/_id/${article.title}`}>
                  <div class="col">
                    <div class="car">
                      <img
                        src={article.urlToImage}
                        className="card-img"
                        alt="Article Image"
                        style={{ width: "100%", height:'4.5cm'}} 
                      />

                      <div class="card-body">
                        <h5 class="card-title">{article.title}</h5>
                 
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            );
          }
        })}
      </div></div>
     
    </>
  );
}

export default Newslist;
