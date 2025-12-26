export default function NotFoundPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center animate-fade">
            <h1 className="select-none text-[120px] font-bold bg-linear-to-r from-pink-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(255,0,255,0.5)]">
                404
            </h1>

            <p className="text-xl opacity-90 mt-3">Ой... Страница потерялась в аниме-мире 🎌</p>

            <a
                href="/"
                className="text-white mt-10 px-6 py-3 bg-indigo-600 rounded-xl font-medium hover:bg-indigo-700 transition-all shadow-[0_0_20px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.8)]"
            >
                Вернуться на главную
            </a>
        </main>
    );
}
