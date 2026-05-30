"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Achievements", href: "#achievements" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [activeHash, setActiveHash] = useState("#home");

    // Detect scroll to change navbar styling
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);

            // Update active section based on scroll position loosely
            const sections = NAV_LINKS.map(link => document.querySelector(link.href));
            let currentSection = "#home";
            sections.forEach(section => {
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 100) {
                        currentSection = `#${section.id}`;
                    }
                }
            });
            setActiveHash(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 80,
                behavior: "smooth",
            });
        }
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed left-0 right-0 mx-auto z-50 transition-all duration-300 ${isScrolled
                ? "top-4 w-[calc(100%-2rem)] max-w-5xl rounded-full bg-surface/80 backdrop-blur-xl py-3 shadow-2xl border border-white/10"
                : "top-0 w-full max-w-full rounded-none bg-transparent py-5 border border-transparent"
                }`}
        >
            <div className="container mx-auto px-6 lg:px-12 grid grid-cols-3 items-center">

                {/* Left: Global Menu Button */}
                <div className="flex justify-start">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-muted hover:text-primary transition-colors flex items-center justify-center p-1"
                        aria-label="Toggle Navigation"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Center: Logo */}
                <div className="flex justify-center">
                    <a
                        href="#home"
                        onClick={(e) => handleClick(e, "#home")}
                        className="text-xl md:text-2xl font-bold text-foreground uppercase tracking-wider group flex items-center gap-2 whitespace-nowrap px-5 py-1.5 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
                    >
                        Ishu <span className="text-primary group-hover:glow transition-all duration-300">Barman</span>
                    </a>
                </div>

                {/* Right: Theme Toggle */}
                <div className="flex justify-end">
                    <ThemeToggle />
                </div>
            </div>

            {/* Universal Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, transformOrigin: 'top left' }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-4 right-4 lg:right-auto lg:left-12 lg:w-64 mt-2 p-6 glass-card border border-white/10 rounded-2xl flex flex-col space-y-4 shadow-2xl"
                    >
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleClick(e, link.href)}
                                className={`text-lg font-medium transition-colors hover:text-primary ${activeHash === link.href ? "text-primary translate-x-1" : "text-muted"
                                    } transform hover:translate-x-1 duration-200`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}
