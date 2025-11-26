export default async function Player({ link, id }: { link: string, id?: string }) {

    if (!link) return;

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl aspect-video xl:rounded-2xl overflow-hidden shadow-xl bg-black/30 backdrop-blur-sm">
                {link ? (
                    <iframe
                        src={link}
                        className="w-full h-full"
                        allowFullScreen
                        allow="autoplay; fullscreen"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-white/60 text-center">Видео не найдено</p>
                    </div>
                )}
            </div>
        </div>
    );
};