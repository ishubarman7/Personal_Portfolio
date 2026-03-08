"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(position.x, springConfig);
    const cursorY = useSpring(position.y, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === "a" ||
                target.tagName.toLowerCase() === "button" ||
                target.closest("a") ||
                target.closest("button") ||
                target.classList.contains("interactive")
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleMouseOver);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleMouseOver);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [cursorX, cursorY]);

    // If mobile/touch device, don't show custom cursor
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 rounded-full bg-cyan-400 pointer-events-none z-[100] mix-blend-difference shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                style={{
                    x: position.x - 8,
                    y: position.y - 8,
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.15 }}
            />
            <motion.div
                className="fixed top-0 left-0 w-10 h-10 rounded-full border border-cyan-400 pointer-events-none z-[100] mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                animate={{
                    scale: isClicking ? 0.9 : isHovering ? 1.5 : 1,
                    backgroundColor: isHovering ? "rgba(34, 211, 238, 0.1)" : "transparent",
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
}
