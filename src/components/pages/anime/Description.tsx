
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
            <div className="w-full flex justify-center items-center self-center px-5 my-5 mt-10">
                <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-2xl">
                    <p className="prose prose-invert max-w-none opacity-90 leading-relaxed">
                        Нет описания
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center items-center px-5 my-10">
            <div className="w-full bg-white/5 p-6 rounded-2xl">
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
        </div>
    );
};
