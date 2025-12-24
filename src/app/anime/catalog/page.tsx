import { Catalog } from "@/components/pages/catalog";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "AniGO | Каталог",
};

export default function AnimeSearchPage() {
    return <Catalog />;
}