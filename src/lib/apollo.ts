import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { gql } from "@apollo/client";

const cache = new InMemoryCache()

export const client = new ApolloClient({
  link: new HttpLink({ uri: "https://shikimori.one/api/graphql" }),
  cache,
});

export const ANIME_QUERY = gql`
  query (
   $ids: String,
   $limit: Int, 
   $season: SeasonString, 
   $search: String, 
   $page: Int, 
   $status: AnimeStatusString,
   $kind: AnimeKindString,
   $order: OrderEnum,
   $score: Int,
   $rating: RatingString) {
    animes(
    ids: $ids, 
    limit: $limit, 
    season: $season, 
    search: $search, 
    page: $page, 
    status: $status,
    kind: $kind,
    order: $order,
    score: $score,
    rating: $rating) {
      id
      malId
      name
      russian
      english
      japanese
      synonyms
      kind
      rating
      score
      status
      episodes
      episodesAired
      duration
      nextEpisodeAt
      airedOn { year month day date }
      releasedOn { year month day date }

      poster { 
        id 
        originalUrl 
        mainUrl
        preview2xUrl
      }

      createdAt
      updatedAt
      nextEpisodeAt
      isCensored

      genres { id name russian kind }

      related {
        id
        anime { id name }
        manga { id name }
        relationKind
        relationText
      }

      screenshots { id originalUrl x166Url x332Url }

      description
      descriptionHtml
    }
  }
`;
