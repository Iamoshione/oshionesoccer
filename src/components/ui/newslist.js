import { Link } from "react-router-dom";
import useCustomQuery from "../../hooks/usecustomquery";
import { GET_ARTICLES } from "../../queries/newsquery";

function Newslist() {
  const { loading, error, data } = useCustomQuery(GET_ARTICLES);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.article) return <p>No articles found.</p>;
  return (
    <>
    <div className="news-container" style={{display:'flex'}}>
      <div> {data.article.map((article) => (
        <div>
           <div
          class="card mb-3"
          key={article.publishedAt}
          style={{ width: "15cm" }}
        >
          <Link to={`/headline/news/_id/${article.title}`}>
            <img src={article.urlToImage} class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title">{article.title}</h5>
              <p class="card-text">{article.description}</p>
              <p class="card-text">
                <small class="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </Link>
        </div>
        </div>
      ))}</div>
  
     
    </div>
     
    </>
  );
}

export default Newslist
