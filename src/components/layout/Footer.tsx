
import { socialLinks } from "@/data";
import { EmailIcon, GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function Footer() {
    const getIcon = (label: string) => {
        switch (label) {
            case "GitHub":
                return <GithubIcon width={20} height={20} />;
            case "LinkedIn":
                return <LinkedinIcon width={20} height={20} />;
            case "Email":
                return <EmailIcon width={20} height={20} />;
            default:
                return null;
        }
    };

    return (
        <footer
            className="pb-24 text-sm leading-relaxed font-outfit max-w-md"
            style={{ color: "color-mix(in oklab, var(--foreground) 70%, transparent)" }}
        >
            <div className="flex gap-6 mb-8 md:hidden">
                {socialLinks.map(({ href, label }) => (
                    <a
                        key={label}
                        href={href}
                        aria-label={label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-transform duration-200"
                        style={{
                            color: "color-mix(in oklab, var(--foreground) 60%, transparent)",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "var(--foreground)";
                            e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color =
                                "color-mix(in oklab, var(--foreground) 60%, transparent)";
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        {getIcon(label)}
                    </a>
                ))}
            </div>

            <p>
                Coded in Visual Studio Code by yours truly. Built with Next.js and Tailwind CSS, deployed with Vercel.
                <br />
                Interested in working together?
                Feel free to reach out on LinkedIn or email.
            </p>
        </footer>
    );
}
