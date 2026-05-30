"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, ArrowRight, Github } from "lucide-react";
import IconCloudSphere from "@/components/IconCloudSphere";
import Magnetic from "@/components/Magnetic";
import { Highlight } from "@/components/Highlight";
import localFont from "next/font/local";

const signatureFont = localFont({ src: "../../../public/fonts/SignaturePhilosophy.ttf" });

// ─── Hero Section ───────────────────────────────────────────────────

const ROLES = [
    "Software Engineer",
    "Web Developer",
    "Tech Enthusiast",
    "Problem Solver",
];

export default function Hero() {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        setIsDesktop(window.innerWidth >= 1024);
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Role typing effect
    useEffect(() => {
        const typingSpeed = isDeleting ? 50 : 100;
        const currentRole = ROLES[currentRoleIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting && currentText === currentRole) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
            } else {
                const nextText = isDeleting
                    ? currentRole.substring(0, currentText.length - 1)
                    : currentRole.substring(0, currentText.length + 1);
                setCurrentText(nextText);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentRoleIndex]);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">

            {/* ── BACKGROUND GRADIENTS ── */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-0 animate-[pulse_4s_infinite_3.2s_forwards]"
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted/20 rounded-full blur-[120px] pointer-events-none opacity-0 animate-[pulse_4s_infinite_4.2s_forwards]"
            />

            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">

                {/* ── LEFT: Hero Text Content ── */}
                <motion.div
                    style={{ y: isDesktop ? y1 : 0 }}
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 3.4 }}
                    className="flex flex-col space-y-6 w-full z-20 justify-self-start lg:max-w-[620px]"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 3.5 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium w-max mb-2"
                    >
                        Welcome to my universe
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 3.6 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold font-sans tracking-tight text-foreground leading-tight"
                    >
                        <span className="sr-only">Software Engineer & Web Developer Portfolio - </span>
                        Hi, I&apos;m <br />
                        <Highlight className={`text-primary ${signatureFont.className} font-normal text-5xl sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl 2xl:text-8xl lg:leading-[1.2]`}>Ishu Barman</Highlight>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 3.8 }}
                        className="text-2xl lg:text-3xl font-medium text-foreground h-10 flex items-center"
                    >
                        <span className="mr-2">I am a</span>
                        <span className="text-primary font-semibold border-r-2 border-primary pr-1 animate-[blink_1s_infinite]">
                            {currentText}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 3.9 }}
                        className="text-muted text-lg max-w-lg leading-relaxed"
                    >
                        I craft responsive websites, develop efficient algorithms, and build digital experiences that live at the intersection of design and engineering. Currently studying Computer Science Engineering at CGC University Mohali.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 4.0 }}
                        className="flex flex-wrap items-center gap-4 pt-4"
                    >
                        <Magnetic strength={0.4}>
                            <a
                                href="#projects"
                                className="interactive px-6 py-3 rounded-full bg-primary text-background font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity"
                            >
                                View Projects
                                <ArrowRight size={18} />
                            </a>
                        </Magnetic>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="interactive px-6 py-3 rounded-full border border-muted/50 bg-surface/50 text-foreground font-medium flex items-center gap-2 hover:bg-surface hover:border-muted transition-colors"
                        >
                            <Download size={18} />
                            Resume
                        </a>

                        <Magnetic strength={0.4}>
                            <a
                                href="https://github.com/ishubarman7"
                                target="_blank"
                                rel="noreferrer"
                                className="interactive p-3 rounded-full border border-muted/50 bg-surface/50 text-foreground hover:text-primary hover:border-primary/50 transition-colors ml-2"
                            >
                                <Github size={20} />
                            </a>
                        </Magnetic>
                    </motion.div>
                </motion.div>

                {/* ── RIGHT: 3D Sphere ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 3.7 }}
                    className="h-[400px] lg:h-[600px] w-full relative flex items-center justify-center interactive z-10"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-muted/5 rounded-full blur-3xl opacity-50" />
                    <IconCloudSphere />
                </motion.div>

            </div>
        </section>
    );
}
