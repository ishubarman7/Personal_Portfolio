"use client";

import { useRef, useState, ReactElement, ReactNode, cloneElement, MouseEvent } from "react";
import { motion } from "framer-motion";

export default function Magnetic({
    children,
    strength = 0.3,
}: {
    children: ReactNode;
    strength?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const boundingRect = ref.current?.getBoundingClientRect();

        if (boundingRect) {
            const { height, width, left, top } = boundingRect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);

            setPosition({ x: middleX * strength, y: middleY * strength });
        }
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            style={{ position: "relative" }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-flex"
        >
            {children}
        </motion.div>
    );
}
