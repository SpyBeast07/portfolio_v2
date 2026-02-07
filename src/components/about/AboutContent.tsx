
import Navbar from "@/components/layout/Navbar";
import { TimelineItem } from "@/components/shared/TimelineItem";
import { about, education, experiences, socialLinks } from "@/data";
import PageHeading from "@/components/shared/PageHeading";
import SectionHeading from "@/components/shared/SectionHeading";
import { EmailIcon, FileTextIcon, GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

// Next imports removed

export default function AboutContent() {
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
        <main className="min-h-screen bg-background text-foreground relative selection:bg-yellow-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none bg-grid-pattern z-0 opacity-40" />
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)] z-0" />

            <div className="relative z-10 container mx-auto px-6 py-24 max-w-4xl">
                <div className="mb-12">
                    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
                        <Navbar mode="floating" />
                    </div>
                    <div className="mt-24">
                        <h1
                            className="font-playfair text-5xl font-bold mb-12"
                            style={{ color: "var(--foreground)" }}
                        >
                            {about.headline}
                        </h1>

                        <div
                            className="space-y-6 whitespace-pre-line text-lg font-outfit leading-relaxed block"
                            style={{ color: "color-mix(in oklab, var(--foreground) 70%, transparent)" }}
                        >
                            {/* Photo */}
                            {about.photo && (
                                <div className="w-full flex justify-center mb-8 md:block md:w-auto md:float-right md:ml-12 md:mb-4 md:mt-2">
                                    <div className="relative w-48 h-48 md:w-64 md:h-64">
                                        <img
                                            src={about.photo}
                                            alt="Profile Photo"
                                            className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-sm transition-all duration-500"
                                            style={{
                                                border: "1px solid color-mix(in oklab, var(--foreground) 10%, transparent)"
                                            }}
                                        />
                                        {/* Offset Background decoration */}
                                        <div
                                            className="absolute inset-0 rounded-2xl -z-10 translate-x-3 translate-y-3"
                                            style={{
                                                backgroundColor: "color-mix(in oklab, var(--foreground) 5%, transparent)",
                                            }}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Text Content */}
                            {about.long.map((paragraph, index) => (
                                <p key={index} className={index === about.long.length - 1 ? "font-medium text-foreground/80" : ""}>
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-6 mt-10 mb-10">
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

                    {/* Resume Button */}
                    <div className="mb-24 lg:mb-32">
                        <a
                            href="/resume"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-transform"
                            style={{
                                color: "var(--background)",
                                backgroundColor: "var(--foreground)",
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.opacity = "0.9";
                                e.currentTarget.style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.opacity = "1";
                                e.currentTarget.style.transform = "scale(1)";
                            }}
                        >
                            <FileTextIcon width={16} height={16} />
                            View Resume
                        </a>
                    </div>

                    <div className="space-y-4">
                        {/* Experience */}
                        <div className="mb-24 lg:mb-32">
                            <SectionHeading className="text-5xl mb-12">Where I Worked</SectionHeading>
                            {experiences.map((exp) => (
                                <TimelineItem
                                    key={exp.title}
                                    {...exp}
                                />
                            ))}
                        </div>

                        {/* Education */}
                        <div className="mb-24 lg:mb-32">
                            <SectionHeading className="text-5xl mb-12">Where I Studied</SectionHeading>
                            {education.map((edu) => (
                                <TimelineItem
                                    key={edu.title}
                                    {...edu}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
