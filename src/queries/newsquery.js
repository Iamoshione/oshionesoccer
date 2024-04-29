import { gql } from "@apollo/client";

export const GET_ARTICLES = gql`
  query GetArticles {
    article {
      description
      publishedAt
      title
      urlToImage
    }
  }
`;