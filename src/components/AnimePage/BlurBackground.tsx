import Image from "next/image"

export const BlurBackgoround = ({ img }: { img: string }) => {
    return (
        <div className="absolute inset-0 z-0 w-full h-[280px] sm:h-[340px] md:h-[420px] lg:h-[500px] overflow-hidden">
            <Image
                src={img}
                alt="bg"
                fill
                unoptimized
                priority
                className="object-cover scale-110 blur-2xl opacity-60"
                loading="eager"
            />

            <div
                className="
                    absolute inset-0 bg-linear-to-b
                    from-white/50 to-white
                    dark:from-black/30 dark:to-[#0a0a0c]
                "
            />
        </div>
    );
};
