"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: ScrollRevealProps) {
    const getInitialVars = () => {
        switch (direction) {
            case "up":
                return { opacity: 0, y: 50 };
            case "down":
                return { opacity: 0, y: -50 };
            case "left":
                return { opacity: 0, x: -50 };
            case "right":
                return { opacity: 0, x: 50 };
            default:
                return { opacity: 0 };
        }
    };

    const getAnimateVars = () => {
        switch (direction) {
            case "up":
            case "down":
                return { opacity: 1, y: 0 };
            case "left":
            case "right":
                return { opacity: 1, x: 0 };
            default:
                return { opacity: 1 };
        }
    };

    return (
        <motion.div
            initial={getInitialVars()}
            whileInView={getAnimateVars()}
            viewport={{ once: false, margin: "-100px" }}
            transition={{
                duration: 1.2,
                delay: delay,
                ease: [0.22, 1, 0.36, 1] // Custom very slow ease out
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
