import { socialLinks } from "@/data";
import { EmailIcon, GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export default function SocialPill() {
    const getIcon = (label: string) => {
        switch (label) {
            case "GitHub":
                return <GithubIcon />;
            case "LinkedIn":
                return <LinkedinIcon />;
            case "Email":
                return <EmailIcon />;
            default:
                return null;
        }
    };

    return (
        <div
            className="flex items-center gap-8 px-8 py-4 rounded-full backdrop-blur-md shadow-lg transition-colors duration-300"
            style={{
                backgroundColor:
                    "color-mix(in oklab, var(--background) 70%, transparent)",
                border:
                    "1px solid color-mix(in oklab, var(--foreground) 30%, transparent)",
            }}
        >
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
    );
}

