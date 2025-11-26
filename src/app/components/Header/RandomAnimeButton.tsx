import { getRandomAnime } from "@/app/api/getRandomAnime";
import { useRouter } from "next/navigation";
import { Dice5Icon } from "lucide-react";

export const RandomAnimeButton = ({ onCloseMenu }: { onCloseMenu?: (v: boolean) => void }) => {
    const router = useRouter();

    const handleRandomAnime = async () => {
        const r = await getRandomAnime();
        onCloseMenu && onCloseMenu(false);
        router.push(`/anime/${r.id}`);
    };

    return (
        <button
            onClick={handleRandomAnime}
            style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: 12,
                fontSize: 15,
                cursor: "pointer",
                fontWeight: 500,
                boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
                transition: "0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85" }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1" }}
        >
            <Dice5Icon size={32} />
            <span>Случайное аниме</span>
        </button>
    );
};