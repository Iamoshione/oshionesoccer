import useCustomQuery from "../../hooks/usecustomquery";
import { GET_ARTICLES } from "../../queries/newsquery";
import { useParams } from "react-router-dom";
function  News(){
    const parameters = useParams();
    const {newstitle} = parameters
    const {
        loading: loadingNewsData,
        error: newsDataError,
        data: newsData,
      } = useCustomQuery(GET_ARTICLES);
      if (loadingNewsData) <p>loading..</p>;
      if (newsDataError) <p>error fetching data</p>;
      
      const newsDataFiltered = newsData?.article.filter(
        (news) => news?.title == newstitle
      );
return (
    <>
         {newsDataFiltered?.map((article, index) => (
        <>
          <div style={{ display: "flex", justifyContent: "center",marginTop:"20px",  alignItems: "center"}}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
                maxWidth: "800px",
              }}
            >
                <div>
                <h1
                key={index}
                style={{
                  fontFamily: "serif",
                  fontSize: "38px",
                  fontWeight: "400px",
                }}
              >
                {article.title}
              </h1>
              <img
                src={article.urlToImage}
                style={{ width: "100%", padding: "10px" }}
              ></img>
                    <p>{article.description}</p>
                </div>
              

    
            </div>
          </div>
        </>
      ))}
    </>
)    

}

export default News