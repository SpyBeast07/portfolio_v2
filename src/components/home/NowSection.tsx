import { motion } from "framer-motion";
import SectionHeading from "@/components/shared/SectionHeading";
import { now } from "@/data";

interface Link {
    label: string;
    url: string;
}

interface Item {
    text: string;
    links?: Link[];
}

interface Section {
    title: string;
    items: Item[];
}

export default function NowSection() {
    return (
        <section id="now" className="mb-24 lg:mb-32">
            <SectionHeading className="mb-8">What I'm Doing Now</SectionHeading>

            <p className="text-neutral-500 mb-12 font-outfit">
                Last updated: {now.lastUpdated}
            </p>

            <div className="space-y-12">
                {now.sections.map((section: Section, index: number) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <h3 className="text-2xl font-bold font-playfair mb-6 text-foreground/90">
                            {section.title}
                        </h3>
                        <ul className="space-y-4">
                            {section.items.map((item: Item, i: number) => (
                                <li key={i} className="text-lg text-neutral-400 font-outfit leading-relaxed whitespace-pre-line">
                                    <span className="block mb-1">{item.text}</span>
                                    {item.links && (
                                        <div className="flex flex-col gap-1 mt-1 ml-4">
                                            {item.links.map((link: Link, j: number) => (
                                                <a
                                                    key={j}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-yellow-500/80 hover:text-yellow-500 transition-colors text-base"
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
