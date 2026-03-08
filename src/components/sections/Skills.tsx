"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Terminal, Layout, Cpu } from "lucide-react";
import TextReveal from "@/components/TextReveal";
import {
    FaReact,
    FaPython,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaDocker,
    FaGitAlt,
    FaJava
} from "react-icons/fa6";
import {
    TbBrandTypescript,
    TbBrandJavascript,
    TbBrandNextjs,
    TbBrandTailwind,
    TbBrandMongodb,
    TbBrandCpp
} from "react-icons/tb";
import { BadgeCheck } from "lucide-react";
import { CERTIFICATES } from "@/data/certificates";

const TECH_LOGOS = [
    { Icon: TbBrandCpp, color: "text-primary", size: 60, top: "10%", left: "5%", speed: 1.2 },
    { Icon: FaPython, color: "text-muted", size: 80, top: "20%", left: "80%", speed: 0.8 },
    { Icon: TbBrandJavascript, color: "text-primary", size: 70, top: "50%", left: "10%", speed: 1.5 },
    { Icon: TbBrandTypescript, color: "text-foreground", size: 65, top: "40%", left: "85%", speed: 0.9 },
    { Icon: FaJava, color: "text-muted", size: 85, top: "80%", left: "15%", speed: 1.1 },
    { Icon: FaReact, color: "text-primary", size: 90, top: "70%", left: "75%", speed: 1.4 },
    { Icon: TbBrandNextjs, color: "text-foreground", size: 75, top: "15%", left: "45%", speed: 1.3 },
    { Icon: FaNodeJs, color: "text-muted", size: 70, top: "85%", left: "50%", speed: 0.7 },
    { Icon: TbBrandTailwind, color: "text-primary", size: 65, top: "30%", left: "25%", speed: 1.6 },
    { Icon: TbBrandMongodb, color: "text-muted", size: 80, top: "60%", left: "30%", speed: 1.2 },
    { Icon: FaDocker, color: "text-primary", size: 75, top: "35%", left: "65%", speed: 0.8 },
    { Icon: FaGitAlt, color: "text-muted", size: 60, top: "90%", left: "85%", speed: 1.5 },
    { Icon: FaHtml5, color: "text-primary", size: 50, top: "5%", left: "25%", speed: 1.1 },
    { Icon: FaCss3Alt, color: "text-muted", size: 55, top: "95%", left: "35%", speed: 0.9 },
];

export default function Skills() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Extract unique skills from certificates
    const certifiedSkills = Array.from(new Set(
        CERTIFICATES.flatMap(cert => cert.skills || [])
    )).filter(skill => skill !== 'Professional Development');

    return (
        <section
            id="skills"
            ref={containerRef}
            className="relative py-24 lg:py-32 font-sans overflow-hidden min-h-screen flex items-center"
        >
            {/* Parallax Floating Logos Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {TECH_LOGOS.map((logo, index) => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const y = useTransform(scrollYProgress, [0, 1], [200 * logo.speed, -200 * logo.speed]);

                    return (
                        <motion.div
                            key={index}
                            style={{
                                position: "absolute",
                                top: logo.top,
                                left: logo.left,
                                y,
                            }}
                            className={`opacity-20 md:opacity-30 ${logo.color}`}
                        >
                            <motion.div
                                animate={{
                                    y: [0, -15, 0],
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 4 + (index % 3),
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: index * 0.2
                                }}
                            >
                                <logo.Icon size={logo.size} />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        <TextReveal text="Technical Arsenal" />
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6" />
                    <p className="text-muted max-w-2xl mx-auto text-lg">
                        Technologies, languages, and frameworks I use to bring ideas to life.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto backdrop-blur-sm">
                    {/* Programming Languages */}
                    <SkillCategory
                        title="Programming"
                        icon={<Terminal className="text-primary w-6 h-6" />}
                        skills={["C++", "Python", "JavaScript", "TypeScript", "Java"]}
                        color="border-primary/30"
                        hoverColor="group-hover:border-primary/80 group-hover:shadow-[0_0_20px_rgba(165,200,214,0.4)]"
                        badgeBg="bg-primary/10 text-primary"
                    />

                    {/* Web Development */}
                    <SkillCategory
                        title="Web Development"
                        icon={<Layout className="text-primary w-6 h-6" />}
                        skills={["React.js", "Next.js", "Node.js", "HTML5", "CSS3", "Tailwind CSS"]}
                        color="border-primary/30"
                        hoverColor="group-hover:border-primary/80 group-hover:shadow-[0_0_20px_rgba(165,200,214,0.4)]"
                        badgeBg="bg-primary/10 text-primary"
                    />

                    {/* Core Concepts */}
                    <SkillCategory
                        title="Core Concepts"
                        icon={<Cpu className="text-primary w-6 h-6" />}
                        skills={["Data Structures & Algos", "Operating Systems", "DBMS", "Computer Networks", "OOPs"]}
                        color="border-primary/30"
                        hoverColor="group-hover:border-primary/80 group-hover:shadow-[0_0_20px_rgba(165,200,214,0.4)]"
                        badgeBg="bg-primary/10 text-primary"
                    />

                    {/* Certified Skills (From Certificates) */}
                    <SkillCategory
                        title="Certified Skills"
                        icon={<BadgeCheck className="text-primary w-6 h-6" />}
                        skills={certifiedSkills.length > 0 ? certifiedSkills : ["Networking", "Cybersecurity", "Python"]}
                        color="border-primary/30"
                        hoverColor="group-hover:border-primary/80 group-hover:shadow-[0_0_20px_rgba(165,200,214,0.4)]"
                        badgeBg="bg-primary/10 text-primary"
                        className="md:col-span-2 lg:col-span-3"
                    />
                </div>

            </div>
        </section>
    );
}

// Category Component
function SkillCategory({
    title,
    icon,
    skills,
    color,
    hoverColor,
    badgeBg,
    className = ""
}: {
    title: string;
    icon: React.ReactNode;
    skills: string[];
    color: string;
    hoverColor: string;
    badgeBg: string;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5 }}
            className={`glass-card p-8 border ${color} transition-all duration-300 group interactive relative overflow-hidden ${className}`}
        >
            <div className={`absolute inset-0 opacity-0 ${hoverColor.split(" ")[1]} transition-opacity duration-300`} />

            <div className="flex items-center gap-4 mb-8">
                <div className={`p-3 rounded-xl bg-surface border border-white/10`}>
                    {icon}
                </div>
                <h3 className="text-xl font-bold text-foreground">{title}</h3>
            </div>

            <div className="flex flex-wrap gap-3 relative z-10">
                {skills.map((skill, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-full text-sm font-medium border border-white/5 backdrop-blur-md bg-surface text-foreground shadow-sm group-hover:border-opacity-30 transition-all`}
                    >
                        {skill}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}
