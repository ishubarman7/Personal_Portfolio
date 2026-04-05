"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Parisienne } from "next/font/google";

// Import a sleek, elegant cursive font from Google Fonts
const cursiveFont = Parisienne({ 
    subsets: ["latin"],
    weight: "400",
});

export default function Preloader() {
    const [dimension, setDimension] = useState({ width: 0, height: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight });
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        // The drawing takes ~2.5s, then we pause, then slide up.
        const timeout = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
        }, 3200);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (isLoading) {
            document.body.style.overflow = "hidden";
        }
    }, [isLoading]);

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`;
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0  L0 0`;

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const }
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] as const, delay: 0.3 }
        }
    };

    if (!isLoading && dimension.width === 0) return null;

    return (
        <AnimatePresence mode="wait">
            {isLoading && (
                <motion.div 
                    variants={{
                        initial: { top: 0 },
                        exit: { top: "-100vh", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const, delay: 0.2 } }
                    }}
                    initial="initial"
                    exit="exit"
                    className="h-screen w-screen flex flex-col items-center justify-center fixed z-[999999] bg-black"
                >
                    {dimension.width > 0 && 
                        <>
                            <div className="z-10 flex items-center justify-center">
                                <svg className="w-[300px] md:w-[500px] h-[150px] md:h-[250px]" viewBox="0 0 500 250">
                                    {/* Outline exactly like the Macbook Pro intro */}
                                    <motion.text
                                        x="50%"
                                        y="50%"
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                        fill="transparent"
                                        stroke="white"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={`${cursiveFont.className} text-[6rem] md:text-[9rem]`}
                                        initial={{ strokeDasharray: 4000, strokeDashoffset: 4000, fill: "transparent" }}
                                        animate={{ strokeDashoffset: 0, fill: "#ffffff" }}
                                        transition={{ 
                                            strokeDashoffset: { duration: 2, ease: "easeInOut" },
                                            fill: { duration: 1, ease: "easeIn", delay: 1.5 }
                                        }}
                                    >
                                        hello
                                    </motion.text>
                                </svg>
                            </div>
                            
                            <svg className="absolute top-0 w-full pointer-events-none" style={{ height: "calc(100vh + 300px)" }}>
                                <motion.path 
                                    variants={curve} 
                                    initial="initial" 
                                    exit="exit" 
                                    fill="#000000" 
                                />
                            </svg>
                        </>
                    }
                </motion.div>
            )}
        </AnimatePresence>
    );
}
