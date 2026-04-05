"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function Highlight({
    children,
    className = "",
    strokeClassName = "text-orange-500",
}: {
    children: ReactNode;
    className?: string;
    strokeClassName?: string;
}) {
    return (
        <span className={`relative inline-block ${className}`}>
            <span className="relative z-10">{children}</span>
            <motion.svg
                className={`absolute left-0 w-[105%] h-[0.7em] top-[65%] z-[-1] pointer-events-none ${strokeClassName}`}
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <motion.path
                    d="M 2 12 Q 30 4 98 10 Q 60 16 5 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </motion.svg>
        </span>
    );
}
