
import { cleanDescription } from "@/utils/cleanDescription";
import * as cheerio from "cheerio";

type Props = {
    htmlDescription?: string;
    description?: string;
};

export const Description = ({ htmlDescription, description }: Props) => {
    let hasHtmlContent = false;

    if (htmlDescription) {
        const $ = cheerio.load(htmlDescription);
        const text = $(".b-text_with_paragraphs").text().trim();
        hasHtmlContent = text.length > 0;
    }

    const plainText = cleanDescription(description || "").trim();

    const hasContent = hasHtmlContent || plainText.length > 0;

    if (!hasContent) {
        return (
            <div className="w-full flex flex-col space-y-4">
                <div className="text-2xl font-bold">Описание</div>
                <p className="prose prose-invert max-w-none opacity-90 leading-relaxed">
                    Нет описания
                </p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col justify-center space-y-4">
            <div className="text-2xl font-bold">Описание</div>
            {hasHtmlContent ? (
                <div
                    className="prose prose-invert max-w-none opacity-90 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: htmlDescription! }}
                />
            ) : (
                <p className="prose prose-invert max-w-none opacity-90 leading-relaxed text-center">
                    {plainText}
                </p>
            )}
        </div>
    );
};
