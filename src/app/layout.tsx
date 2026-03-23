import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import GooeyCursor from "@/components/GooeyCursor";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import SmoothScroll from "@/components/SmoothScroll";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ishu Barman | Software Engineer | Portfolio",
    description: "Ishu Barman is a Computer Science Engineering student at CGC University Mohali passionate about software engineering, web development, IoT, and data structures & algorithms.",
    keywords: ["Ishu Barman", "Software Engineer", "Portfolio", "CGC University Mohali", "CGC Jhanjeri", "Web Developer", "C++", "Python", "DSA", "IoT", "Next.js", "React", "Frontend Developer"],
    authors: [{ name: "Ishu Barman", url: "https://ishubarman7.xyz" }],
    creator: "Ishu Barman",
    publisher: "Ishu Barman",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://ishubarman7.xyz'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: "Ishu Barman | Software Engineer | Portfolio",
        description: "Ishu Barman is a Computer Science Engineering student at CGC University Mohali passionate about software engineering, web development, IoT, and data structures & algorithms.",
        url: "https://ishubarman7.xyz",
        siteName: "Ishu Barman Portfolio",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Ishu Barman | Software Engineer",
        description: "Portfolio of Ishu Barman, Software Engineer & Web Developer from CGC University Mohali.",
        creator: "@IshuBarman",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // High-impact Structured Data for Google Rich Snippets
    const jsonLd = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": "https://ishubarman7.xyz/#person",
                "name": "Ishu Barman",
                "jobTitle": "Software Engineer",
                "url": "https://ishubarman7.xyz",
                "sameAs": [
                    "https://github.com/IshuBarman",
                    "https://www.linkedin.com/in/ishu-barman/",
                    "https://leetcode.com/u/ishubarman/" // Replace with actual profile handles if different
                ],
                "alumniOf": {
                    "@type": "CollegeOrUniversity",
                    "name": "CGC University Mohali",
                    "alternateName": "CGC Jhanjeri"
                },
                "knowsAbout": ["Software Engineering", "Web Development", "IoT", "Data Structures", "Algorithms", "C++", "Python", "React", "Next.js"]
            },
            {
                "@type": "WebSite",
                "@id": "https://ishubarman7.xyz/#website",
                "url": "https://ishubarman7.xyz",
                "name": "Ishu Barman Portfolio",
                "description": "Portfolio of Ishu Barman, Software Engineer & Web Developer."
            }
        ]
    };

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={`${inter.className} min-h-screen relative`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SmoothScroll>
                        <GooeyCursor />
                        <Navbar />
                        <main className="overflow-clip">{children}</main>
                        <Footer />
                    </SmoothScroll>
                </ThemeProvider>
            </body>
        </html>
    );
}
