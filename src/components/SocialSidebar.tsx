"use client";

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";
import { 
    FaInstagram, FaFacebook, FaLinkedin, FaGithub, FaYoutube, 
    FaReddit, FaMedium, FaPinterest 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiCodechef, SiHackerrank, SiGeeksforgeeks } from "react-icons/si";

const SOCIAL_LINKS = [
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/ishu-barman/", color: "hover:text-blue-400" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/ishubarman7", color: "hover:text-foreground" },
    { name: "LeetCode", icon: <SiLeetcode />, url: "https://leetcode.com/u/ishubarman/", color: "hover:text-yellow-500" },
    { name: "CodeChef", icon: <SiCodechef />, url: "https://www.codechef.com/users/ishubarman7", color: "hover:text-amber-700" },
    { name: "HackerRank", icon: <SiHackerrank />, url: "https://www.hackerrank.com/ishubarman7", color: "hover:text-green-500" },
    { name: "GeeksforGeeks", icon: <SiGeeksforgeeks />, url: "https://leetcode.com/u/ishubarman/", color: "hover:text-green-600" },
    { name: "Reddit", icon: <FaReddit />, url: "https://www.reddit.com/user/ishubarman7", color: "hover:text-orange-500" },
    { name: "Medium", icon: <FaMedium />, url: "https://medium.com/@ishubarman7", color: "hover:text-foreground" },
    { name: "Pinterest", icon: <FaPinterest />, url: "https://www.pinterest.com/ishubarman7/", color: "hover:text-red-600" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/ishu.barman.7/", color: "hover:text-pink-500" },
    { name: "X (Twitter)", icon: <FaXTwitter />, url: "https://twitter.com/ishubarman7", color: "hover:text-foreground" }
];

export default function SocialSidebar() {
    const mouseY = useMotionValue(Infinity);

    return (
        <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            onMouseMove={(e) => mouseY.set(e.clientY)}
            onMouseLeave={() => mouseY.set(Infinity)}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 md:gap-3 p-2 md:p-3 py-4 md:py-6 bg-surface/30 backdrop-blur-xl border border-r-0 border-white/10 rounded-l-2xl shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar items-center"
        >
            {SOCIAL_LINKS.map((link, idx) => (
                <DockIcon 
                    key={idx}
                    link={link}
                    mouseY={mouseY}
                />
            ))}
        </motion.div>
    );
}

function DockIcon({ link, mouseY }: { link: any; mouseY: MotionValue<number> }) {
    const ref = useRef<HTMLAnchorElement>(null);

    // Calculate distance between mouse Y and center of this icon
    const distance = useTransform(mouseY, (val) => {
        const bounds = ref.current?.getBoundingClientRect();
        if (!bounds) return 0;
        return val - bounds.top - bounds.height / 2;
    });

    // Translate distance to scale: within 100px range, scale goes from 1 to 1.6
    const scale = useTransform(distance, [-100, 0, 100], [1, 1.6, 1]);
    
    // Apply macOS Dock responsive spring physics
    const scaleSpring = useSpring(scale, {
        damping: 18,
        stiffness: 220,
        mass: 0.1,
    });

    // Translate outward (to the left, since dock is on the right)
    const x = useTransform(scaleSpring, [1, 1.6], [0, -10]);

    return (
        <motion.a 
            ref={ref}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            aria-label={link.name}
            title={link.name}
            style={{ 
                scale: scaleSpring,
                x,
            }}
            className={`text-muted transition-colors duration-200 ${link.color} text-xl md:text-2xl p-1 interactive block`}
        >
            {link.icon}
        </motion.a>
    );
}
