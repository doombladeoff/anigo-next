'use client';

import { useRouter } from "next/navigation";
import slugify from "slugify";

const RandomReleaseButton = () => {
    const router = useRouter();

    const handleRandomAnime = async () => {
        const anime = await fetch("/api/anime/random").then((r) => r.json());

        const link = `/anime/${slugify(anime.name,
            {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: true,
                trim: true
            })}-${anime.id}`;

        router.push(link);
    };

    return (
        <button onClick={handleRandomAnime} className="header-link">
            Случайный релиз
        </button>
    );
};

export default RandomReleaseButton;