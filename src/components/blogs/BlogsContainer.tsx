import Navbar from "@/components/layout/Navbar";
import { BlogItem } from "@/components/shared/BlogItem";
import { blogs, pageHeadings } from "@/data";
import PageHeading from "@/components/shared/PageHeading";
// Metadata removed


export default function BlogsContainer() {
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
                        <PageHeading
                            title={pageHeadings.blogs.title}
                            description={<p>{pageHeadings.blogs.description}</p>}
                        />
                    </div>
                </div>

                <div className="space-y-4">
                    {blogs.length > 0 ? (
                        blogs.map((blog) => (
                            <BlogItem
                                key={blog.title}
                                {...blog}
                            />
                        ))
                    ) : (
                        /* Coming Soon Placeholder */
                        <div
                            className="py-12 text-center rounded-lg border-dashed"
                            style={{
                                borderColor: "color-mix(in oklab, var(--foreground) 30%, transparent)",
                                backgroundColor: "color-mix(in oklab, var(--background) 85%, transparent)",
                                borderWidth: "1px",
                            }}
                        >
                            <p
                                className="font-playfair italic text-lg"
                                style={{ color: "color-mix(in oklab, var(--foreground) 70%, transparent)" }}
                            >
                                Thoughtful essays coming soon...
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
