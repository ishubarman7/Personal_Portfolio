"use client";

import { motion } from "framer-motion";
import { User, Code2, Cpu, Globe } from "lucide-react";
import TextReveal from "@/components/TextReveal";

export default function About() {
    return (
        <section id="about" className="relative py-24 lg:py-32 overflow-hidden">

            {/* Background decorations */}
            <div className="absolute top-1/2 left-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2" />

            <div className="container mx-auto px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground flex items-center justify-center gap-4">
                        <User className="text-primary" size={40} />
                        <TextReveal text="About Me" />
                    </h2>
                    <div className="mt-4 w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full" />
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column - Image/Illustration with Parallax */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="relative order-2 lg:order-1 flex justify-center interactive"
                    >
                        <div className="relative w-full max-w-sm aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden glass-card p-2 border border-white/10 shadow-2xl group">
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/50 to-muted/50 opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                            {/* Fallback image/div, since no actual image was provided, we use a sleek CSS graphic */}
                            <div className="w-full h-full bg-surface rounded-2xl flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent z-10" />

                                <Code2 size={120} className="text-muted/30 absolute opacity-20 transform -translate-x-12 -translate-y-12 rotate-12" />
                                <Cpu size={100} className="text-muted/30 absolute opacity-30 transform translate-x-16 translate-y-20 -rotate-12" />
                                <Globe size={140} className="text-muted/30 absolute opacity-10 transform -translate-y-24 translate-x-10" />

                                <div className="text-center z-20">
                                    <User size={80} className="text-primary mx-auto mb-4" />
                                    <p className="text-muted font-medium text-lg tracking-widest uppercase">Ishu Barman</p>
                                </div>
                            </div>
                        </div>
                        {/* Floating shapes */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-8 -left-8 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-muted opacity-20 blur-xl pointer-events-none"
                        />
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                            className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-primary to-muted opacity-20 blur-xl pointer-events-none"
                        />
                    </motion.div>

                    {/* Right Column - Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="order-1 lg:order-2"
                    >
                        <h3 className="text-2xl font-bold text-foreground mb-6 font-sans">
                            <TextReveal text="Computer Science Engineer based in India" />
                        </h3>

                        <div className="space-y-4 text-muted text-lg leading-relaxed text-justify">
                            <p>
                                I am a passionate <strong className="text-primary font-medium">B.Tech Computer Science student</strong> at CGC Jhanjeri, with a deep interest in software engineering and web development.
                            </p>
                            <p>
                                My journey in tech started with a curiosity about how applications work behind the scenes. Today, I specialize in building responsive architectures, experimenting with emerging technologies like <strong className="text-primary font-medium">IoT</strong>, and solving complex algorithmic challenges.
                            </p>
                            <p>
                                Beyond coding, I am an active member of developer communities. As a <strong className="text-primary font-medium whitespace-nowrap">Google Developer Groups Member</strong> and <strong className="text-primary font-medium whitespace-nowrap">GeeksforGeeks Campus Ambassador</strong>, I strive to collaborate, share knowledge, and grow alongside fellow tech enthusiasts.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-6">
                            <div className="border-l-2 border-primary/50 pl-4 py-1">
                                <span className="block text-3xl font-bold text-foreground mb-1">20+</span>
                                <span className="text-sm text-muted uppercase tracking-wider font-semibold">Projects Built</span>
                            </div>
                            <div className="border-l-2 border-primary/50 pl-4 py-1">
                                <span className="block text-3xl font-bold text-foreground mb-1">5+</span>
                                <span className="text-sm text-muted uppercase tracking-wider font-semibold">Certifications</span>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
