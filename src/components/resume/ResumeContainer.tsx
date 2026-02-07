
import Navbar from "@/components/layout/Navbar";
import { resume } from "@/data";
import { DownloadIcon } from "@/components/ui/Icons";
import React, { Suspense } from 'react';

const ResumeViewer = React.lazy(() => import("@/components/shared/ResumeViewer"));

export default function ResumeContainer() {
    return (
        <main className="min-h-screen bg-background text-foreground relative selection:bg-yellow-500/30 flex flex-col">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none bg-grid-pattern z-0 opacity-40" />
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_20%,var(--background)_90%)] z-0" />

            <div className="relative z-10 container mx-auto px-6 py-8 flex flex-col w-full md:w-[70%] min-h-screen">
                {/* Header / Nav */}
                <div className="relative flex justify-end items-center mb-8 mt-4 pt-24">
                    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
                        <Navbar mode="floating" />
                    </div>

                    <a
                        href={resume.url}
                        download={resume.filename}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-transform shadow-lg hover:shadow-xl"
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
                        <DownloadIcon width={16} height={16} />
                        Download PDF
                    </a>
                </div>

                {/* Resume Viewer Container */}
                <div className="w-full relative flex-1 mb-12 flex flex-col">
                    <Suspense fallback={<div className="h-96 flex items-center justify-center animate-pulse">Loading Resume Viewer...</div>}>
                        <ResumeViewer pdfUrl={resume.url} />
                    </Suspense>
                </div>
            </div>
        </main>
    );
}
