
import { ThemeProvider } from "@/components/utils/theme-provider";
import ThemeBulb from "@/components/ui/ThemeBulb";
import SmoothScroll from "@/components/utils/SmoothScroll";

export default function ThemeWrapper() {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
            <SmoothScroll />
            <ThemeBulb />
        </ThemeProvider>
    );
}
