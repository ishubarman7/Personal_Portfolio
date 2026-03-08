"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.05, // Lower lerp means smoother and slower scroll interpolation
                duration: 1.5,
                smoothWheel: true,
                wheelMultiplier: 1,
            }}
        >
            {children as any}
        </ReactLenis>
    );
}
