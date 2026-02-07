
import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure worker - crucial for Next.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url
).toString();

interface ResumeViewerProps {
    pdfUrl: string;
}

export default function ResumeViewer({ pdfUrl }: ResumeViewerProps) {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle resize to fit width
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            if (entries[0]) {
                setContainerWidth(entries[0].contentRect.width);
            }
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    return (
        <div className="flex flex-col gap-4 w-full h-full items-center">
            {/* Viewer Container */}
            <div
                ref={containerRef}
                className="flex-1 w-full overflow-hidden rounded-xl flex justify-center min-h-[500px]"
                style={{
                    backgroundColor: "transparent",
                }}
            >
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    className="flex flex-col gap-8 w-full items-center"
                    loading={
                        <div className="flex items-center justify-center p-8 animate-pulse text-sm text-center">
                            Loading PDF...
                        </div>
                    }
                    error={
                        <div className="flex flex-col items-center justify-center p-8 text-center text-red-400">
                            <p className="mb-2">Unable to load PDF.</p>
                        </div>
                    }
                >
                    {Array.from(new Array(numPages || 0), (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                            width={containerWidth ? containerWidth : undefined}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                            className="shadow-2xl rounded-sm"
                        />
                    ))}
                </Document>
            </div>
        </div>
    );
}
