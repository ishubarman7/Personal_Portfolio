"use client";

import { motion } from "framer-motion";
import { 
    FaInstagram, FaFacebook, FaLinkedin, FaGithub, FaYoutube, 
    FaReddit, FaMedium, FaPinterest 
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { SiLeetcode, SiCodechef, SiHackerrank, SiGeeksforgeeks } from "react-icons/si";

const SOCIAL_LINKS = [
    { name: "LinkedIn", icon: <FaLinkedin />, url: "https://www.linkedin.com/in/ishubarman7", color: "hover:text-blue-400" },
    { name: "GitHub", icon: <FaGithub />, url: "https://github.com/ishubarman7", color: "hover:text-foreground" },
    { name: "LeetCode", icon: <SiLeetcode />, url: "https://leetcode.com/ishubarman7/", color: "hover:text-yellow-500" },
    { name: "CodeChef", icon: <SiCodechef />, url: "https://www.codechef.com/users/ishubarman7", color: "hover:text-amber-700" },
    { name: "HackerRank", icon: <SiHackerrank />, url: "https://www.hackerrank.com/ishubarman7", color: "hover:text-green-500" },
    { name: "GeeksforGeeks", icon: <SiGeeksforgeeks />, url: "https://auth.geeksforgeeks.org/user/ishubarman7/", color: "hover:text-green-600" },
    // { name: "YouTube", icon: <FaYoutube />, url: "https://www.youtube.com/@ishubarman7", color: "hover:text-red-500" },
    { name: "Reddit", icon: <FaReddit />, url: "https://www.reddit.com/user/ishubarman7", color: "hover:text-orange-500" },
    { name: "Medium", icon: <FaMedium />, url: "https://medium.com/@ishubarman7", color: "hover:text-foreground" },
    { name: "Pinterest", icon: <FaPinterest />, url: "https://www.pinterest.com/ishubarman7/", color: "hover:text-red-600" },
    { name: "Instagram", icon: <FaInstagram />, url: "https://www.instagram.com/ishu.barman.7/", color: "hover:text-pink-500" },
    // { name: "Facebook", icon: <FaFacebook />, url: "https://www.facebook.com/ishubarman.ibm7", color: "hover:text-blue-500" },
    { name: "X (Twitter)", icon: <FaXTwitter />, url: "https://twitter.com/ishubarman7", color: "hover:text-foreground" }
];

export default function SocialSidebar() {
    return (
        <motion.div 
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 md:gap-3 p-2 md:p-3 py-4 md:py-6 bg-surface/30 backdrop-blur-xl border border-r-0 border-white/10 rounded-l-2xl shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar"
        >
            {SOCIAL_LINKS.map((link, idx) => (
                <a 
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.name}
                    title={link.name}
                    className={`text-muted transition-all duration-300 hover:scale-125 ${link.color} text-xl md:text-2xl p-1 interactive block transform`}
                >
                    {link.icon}
                </a>
            ))}
        </motion.div>
    );
}
