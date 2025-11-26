import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { gql } from "@apollo/client";

const cache = new InMemoryCache()

export const client = new ApolloClient({
  link: new HttpLink({ uri: "https://shikimori.one/api/graphql" }),
  cache,
});

export function buildFields(fieldsObj: any): string {
  return Object.entries(fieldsObj)
    .filter(([, v]) => v && (v === true || typeof v === "object"))
    .map(([key, value]) =>
      value === true
        ? key
        : `${key} { ${buildFields(value)} }`
    )
    .join("\n");
}

export function buildAnimeQuery(fieldsObj: any) {
  return gql`
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
        $rating: RatingString
      ) {
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
            rating: $rating
        ) {
            ${buildFields(fieldsObj)}
        }
      }
    `;
};