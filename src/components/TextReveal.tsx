"use client";

import { motion } from "framer-motion";

export default function TextReveal({
    text,
    className = "",
}: {
    text: string;
    className?: string;
}) {
    const words = text.split(" ");

    return (
        <span className={`inline-flex flex-wrap ${className}`}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="overflow-hidden inline-flex mr-[0.25em] align-bottom pb-1 -mb-1">
                    <motion.span
                        initial={{ y: "100%", rotate: 5, opacity: 0 }}
                        whileInView={{ y: "0%", rotate: 0, opacity: 1 }}
                        viewport={{ once: false, margin: "-10%" }}
                        transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1], // Custom very slow ease out
                            delay: wordIndex * 0.08,
                        }}
                        className="inline-block origin-bottom-left"
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
