
import { useState } from "react";

import { email } from "@/data";

export default function VerticalEmail() {
    const [copied, setCopied] = useState(false);


    const handleCopy = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed left-8 bottom-0 z-50 flex flex-col items-center gap-6 after:h-24 after:min-h-[100px] after:w-[1px] after:bg-neutral-500 after:content-[''] dark:after:bg-neutral-500">
            <button
                onClick={handleCopy}
                className="vertical-text relative font-mono text-sm tracking-widest hover:text-white hover:-translate-y-1 transition-all duration-300"
                style={{ writingMode: "vertical-rl", color: 'var(--icon-color)' }}
            >
                {copied ? (
                    <span className="text-green-400 font-bold">Copied!!</span>
                ) : (
                    email
                )}
            </button>
        </div>
    );
}
