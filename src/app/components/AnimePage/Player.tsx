export const Player = async ({ id }: { id: string | number }) => {
    const KODIK_TOKEN = process.env.KODIK_TOKEN;
    const kodikRes = await fetch(
        `https://kodikapi.com/search?token=${KODIK_TOKEN}&shikimori_id=${id}&limit=1`
    );
    const kodikData = await kodikRes.json();
    const videolink = kodikData?.results?.[0]?.link || "";

    return (
        <div className="w-full flex justify-center">
            {videolink ? (
                <iframe
                    src={videolink}
                    width="100%"
                    height="480"
                    className="shadow-lg max-w-4xl"
                    allowFullScreen
                    allow="autoplay *; fullscreen *"
                />
            ) : (
                <p className="text-center text-white/60">Видео не найдено</p>
            )}
        </div>
    );
}