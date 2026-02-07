interface HeroTitleProps {
    className?: string; // For text sizing (text-[14vw] vs text-[18vw])
    spanClassName?: string; // For positioning the 'Gupta' span relative to 'Kushagra'
}

export default function HeroTitle({ className = "", spanClassName = "" }: HeroTitleProps) {
    return (
        <h1
            className={`inline-flex items-baseline font-playfair leading-none font-bold tracking-tighter text-foreground/90 select-none pb-10 whitespace-nowrap ${className}`}
        >
            Kushagra
            <span
                className={`absolute font-great-vibes text-yellow-500 rotate-[-10deg] opacity-90 tracking-wider ${spanClassName}`}
            >
                Gupta
            </span>
        </h1>
    );
}
