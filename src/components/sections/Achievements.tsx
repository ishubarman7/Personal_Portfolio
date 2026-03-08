"use client";

import { motion } from "framer-motion";
import { Award, Trophy, Star, Users } from "lucide-react";
import TextReveal from "@/components/TextReveal";

const ACHIEVEMENTS = [
    {
        title: "Google Developer Groups Member",
        organization: "GDG Chandigarh",
        description: "Active member, networking with top developers and participating in latest tech workshops and sessions.",
        icon: <Users className="text-primary" size={32} />,
        color: "from-primary/20 to-muted/20",
        borderColor: "group-hover:border-primary/50"
    },
    {
        title: "Campus Ambassador",
        organization: "GeeksforGeeks",
        description: "Represented the campus to foster a coding culture, organize technical events, and spread awareness about algorithms.",
        icon: <Star className="text-primary" size={32} />,
        color: "from-primary/20 to-muted/20",
        borderColor: "group-hover:border-primary/50"
    },
    {
        title: "Rank 4 (700+ Students)",
        organization: "Code Katana 2.0",
        description: "Secured Rank 4 out of 700+ participants in a highly competitive coding competition testing DSA skills.",
        icon: <Award className="text-primary" size={32} />,
        color: "from-primary/20 to-muted/20",
        borderColor: "group-hover:border-primary/50"
    },
    {
        title: "Rank 1 Leaderboard",
        organization: "Coding Marathon",
        description: "Emerged as the top coder in the Coding Marathon, consistently solving complex algorithm problems.",
        icon: <Trophy className="text-primary" size={32} />,
        color: "from-primary/20 to-muted/20",
        borderColor: "group-hover:border-primary/50"
    }
];

export default function Achievements() {
    return (
        <section id="achievements" className="relative py-24 lg:py-32 overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                        <TextReveal text="Milestones & Achievements" />
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-muted mx-auto rounded-full mb-6" />
                    <p className="text-muted max-w-2xl mx-auto text-lg">
                        Recognition received for my dedication to coding, leadership in tech communities, and competitive programming.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {ACHIEVEMENTS.map((ach, idx) => (
                        <AchievementCard key={idx} achievement={ach} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AchievementCard({ achievement, index }: { achievement: any, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -5 }}
            className={`glass-card p-6 border border-white/5 transition-all duration-300 group interactive relative overflow-hidden ${achievement.borderColor}`}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${achievement.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-surface/80 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {achievement.icon}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-foreground transition-colors">
                    {achievement.title}
                </h3>

                <p className="text-primary text-sm font-semibold mb-3 tracking-wide uppercase">
                    {achievement.organization}
                </p>

                <p className="text-muted text-sm leading-relaxed mt-auto">
                    {achievement.description}
                </p>
            </div>
        </motion.div>
    );
}
