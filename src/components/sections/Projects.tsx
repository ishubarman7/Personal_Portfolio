"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Github, ExternalLink, Activity, Code, Bot, HeartHandshake } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import Magnetic from "@/components/Magnetic";

const PROJECTS = [
    {
        title: "Smart Stock Optimizer",
        description: "A web app leveraging the Knapsack Algorithm to optimize stock selection and maximize portfolio returns. Features real-time calculation and intuitive data visualization.",
        tech: ["React.js", "Node.js", "Algorithms", "Recharts"],
        github: "https://github.com/IshuBarman",
        live: "#",
        icon: <Activity size={32} className="text-primary" />
    },
    {
        title: "NGO Adoption Platform",
        description: "A specialized platform connecting donors with trusted organizations that support underprivileged children. Includes secure donation gateways and transparency tracking.",
        tech: ["Next.js", "MongoDB", "Tailwind CSS", "Stripe"],
        github: "https://github.com/IshuBarman",
        live: "#",
        icon: <HeartHandshake size={32} className="text-primary" />
    },
    {
        title: "Judge0 Coding Platform",
        description: "An online interactive coding playground allowing users to write, compile, and execute code in multiple programming languages simultaneously.",
        tech: ["JavaScript", "Judge0 API", "Express", "Docker"],
        github: "https://github.com/IshuBarman",
        live: "#",
        icon: <Code size={32} className="text-primary" />
    },
    {
        title: "AI Chatbot Website",
        description: "A seamlessly integrated AI chatbot website featuring natural language understanding to provide instant intelligent responses to user queries.",
        tech: ["React.js", "OpenAI API", "Python", "Flask"],
        github: "https://github.com/IshuBarman",
        live: "#",
        icon: <Bot size={32} className="text-primary" />
    }
];

export default function Projects() {
    return (
        <section id="projects" className="relative py-24 lg:py-32 font-sans overflow-hidden">

            {/* Background Orbs */}
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-muted/10 rounded-full blur-[100px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        <TextReveal text="Featured Projects" />
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6" />
                    <p className="text-muted max-w-2xl mx-auto text-lg">
                        A selection of my recent work focusing on complex problem solving, performance, and user experience.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {PROJECTS.map((project, idx) => (
                        <ProjectCard key={idx} project={project} index={idx} />
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Magnetic strength={0.2}>
                        <a
                            href="https://github.com/IshuBarman"
                            target="_blank"
                            rel="noreferrer"
                            className="interactive inline-flex items-center gap-2 px-8 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary/10 hover:border-primary transition-all font-medium tracking-wide shadow-[0_0_15px_rgba(165,200,214,0.1)] hover:shadow-[0_0_20px_rgba(165,200,214,0.3)]"
                        >
                            <Github size={18} />
                            View More on GitHub
                        </a>
                    </Magnetic>
                </div>
            </div>
        </section>
    );
}

// 3D Tilt Project Card
function ProjectCard({ project, index }: { project: any, index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            ref={cardRef}
            whileHover={{ y: -10 }}
            className="group relative h-full flex flex-col rounded-3xl glass-card overflow-hidden hover:border-primary/30 transition-all duration-500 interactive shadow-2xl"
        >
            {/* Background Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-muted/0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />

            {/* Decorative top border */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/50 to-muted/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="p-8 flex-grow flex flex-col relative z-10">

                <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-surface border border-muted/30 flex items-center justify-center shadow-inner">
                        {project.icon}
                    </div>

                    <div className="flex gap-3">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted hover:text-primary transition-colors bg-surface p-2 rounded-full border border-muted/30 hover:border-primary/30"
                            aria-label="GitHub Repository"
                        >
                            <Github size={20} />
                        </a>
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted hover:text-primary transition-colors bg-surface p-2 rounded-full border border-muted/30 hover:border-primary/30"
                            aria-label="Live Demo"
                        >
                            <ExternalLink size={20} />
                        </a>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors cursor-pointer">
                    {project.title}
                </h3>

                <p className="text-muted mb-8 leading-relaxed flex-grow text-justify">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t: string, i: number) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 rounded-full"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
