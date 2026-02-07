// Image import removed

export default function HeroLogo() {
    return (
        <>
            {/* User's Exact Logo Structure */}
            <div className="group relative h-40 w-40 rounded-full bg-neutral-900 border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-500 ring-2 ring-white/5 pointer-events-auto">
                <img
                    src="/logo.png"
                    alt="Logo"
                    width={160}
                    height={160}
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                />
            </div>
            {/* Handle - Below Circle */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                <span className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500">
                    @SpyBeast07
                </span>
            </div>
        </>
    );
}
