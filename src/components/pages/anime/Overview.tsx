import { ShikimoriAnime } from "@/app/types/Shikimori.types"
import { Description } from "./Description"
import { Info } from "./Info";

export const Overview = ({ animeData }: { animeData: ShikimoriAnime }) => {
    return (
        <div className="mx-4 md:mx-0 md:flex md:grid-cols-2 md:space-x-5">
            <Info anime={animeData} />
            <Description htmlDescription={animeData.descriptionHtml} description={animeData.description} />
        </div>
    )
}