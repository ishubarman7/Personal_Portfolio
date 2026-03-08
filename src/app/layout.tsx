import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ishu Barman | Developer Portfolio",
    description: "Modern futuristic developer portfolio for Ishu Barman, a Computer Science student and Software Engineer.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.className} min-h-screen relative`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SmoothScroll>
                        <CustomCursor />
                        <Navbar />
                        <main className="overflow-clip">{children}</main>
                        <Footer />
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
