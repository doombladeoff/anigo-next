import { NextResponse } from "next/server";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        uri: "https://shikimori.one/api/graphql",
        fetch,
    }),
    cache: new InMemoryCache(),
});

function buildQuery(fields: any) {
    function traverse(obj: any): string {
        return Object.entries(obj)
            .map(([key, val]) => {
                if (val === true) return key;
                if (typeof val === "object") return `${key} { ${traverse(val)} }`;
                return "";
            })
            .filter(Boolean)
            .join(" ");
    }

    const fieldsStr = traverse(fields);

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
        ${fieldsStr}
      }
    }
  `;
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { fields, variables } = body;

        if (!fields) {
            return NextResponse.json({ error: "Fields are required" }, { status: 400 });
        }

        const query = buildQuery(fields);

        const { data } = await client.query({
            query,
            variables,
            fetchPolicy: "no-cache",
        });

        return NextResponse.json(data);
    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
