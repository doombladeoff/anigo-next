export type SimilarAnimeType = {
    id: number
    name: string
    russian: string
    image: SimilarImage
    url: string
    kind: string
    score: string
    status: string
    episodes: number
    episodes_aired: number
    aired_on: string
    released_on: string
}

export interface SimilarImage {
    original: string
    preview: string
    x96: string
    x48: string
}