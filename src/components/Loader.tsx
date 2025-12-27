import { Spinner } from "./ui/shadcn-io/spinner";


export const Loader = () => {
    return (
        <div className="min-h-screen w-full flex-1 flex justify-center items-center">
            <div className="min-h-screen w-full flex items-center justify-center">
                <div className="relative flex items-center justify-center w-24 h-24">
                    <div className="absolute inset-0 rounded-full bg-purple-500 opacity-30 blur-2xl animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-2 border-purple-400 opacity-20 animate-[pulse_1.5s_ease-in-out_infinite]" />

                    <Spinner variant="ring" size={48} className="relative z-10 animate-spin-slow text-purple-400" />
                </div>
            </div>

            <style jsx>{`
                            .animate-spin-slow {
                                animation: spin 10s linear infinite;
                            }
                            @keyframes pulse {
                                0%, 100% { transform: scale(0.9); opacity: 0.3; }
                                50% { transform: scale(1.2); opacity: 0.5; }
                            }
                        `}</style>

        </div>
    );
};