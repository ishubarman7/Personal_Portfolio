"use client";

import React, { useEffect, useState, memo } from "react";
import { useTheme } from "next-themes";
import { Cloud, fetchSimpleIcons, ICloud, renderSimpleIcon, SimpleIcon } from "react-icon-cloud";

// List of simple-icon slugs we want to show
const slugs = [
    "typescript",
    "javascript",
    "python",
    "java",
    "react",
    "nextdotjs",
    "html5",
    "css3",
    "nodedotjs",
    "express",
    "amazonaws",
    "postgresql",
    "firebase",
    "tailwindcss",
    "docker",
    "git",
    "github",
    "visualstudiocode",
    "figma",
    "mongodb",
    "cplusplus",
    "c",
    "angular",
    "vuedotjs",
    "fastapi",
    "nestjs",
    "mysql",
    "supabase",
    "vercel",
    "postman",
    "linux",
    "ubuntu",
    "npm",
    "vite",
    "framer",
    "arduino",
    "raspberrypi",
    "tensorflow"
];

const cloudProps: Omit<ICloud, "children"> = {
    containerProps: {
        style: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            // paddingTop: 80, // moved slightly lower
        },
    },
    options: {
        reverse: true,
        depth: 1,
        wheelZoom: false,
        imageScale: 2,
        activeCursor: "default",
        tooltip: "native",
        initial: [0.1, -0.1],
        clickToFront: 500,
        tooltipDelay: 0,
        outlineColour: "#0000",
        maxSpeed: 0.04,
        minSpeed: 0.02,
        dragControl: true, // enable drag interaction
    },
};

const IconCloudSphere = memo(function IconCloudSphere() {
    const [data, setData] = useState<{ simpleIcons: Record<string, SimpleIcon> } | null>(null);
    const { theme } = useTheme();

    useEffect(() => {
        // Fetch simple icons data dynamically based on slugs
        fetchSimpleIcons({ slugs }).then(setData);
    }, []);

    if (!data) return <div className="text-muted/50 animate-pulse">Loading core...</div>;

    const renderedIcons = Object.values(data.simpleIcons).map((icon) =>
        renderSimpleIcon({
            icon,
            size: 48,
            aProps: {
                href: undefined,
                target: undefined,
                rel: undefined,
                onClick: (e: any) => e.preventDefault(),
            },
            // Fallback colors adapted to theme
            fallbackHex: theme === "dark" && (icon.hex === "000000" || icon.hex === "181717") ? "#FFFFFF" : `#${icon.hex}`,
        })
    );

    return (
        <Cloud {...cloudProps}>
            {renderedIcons}
        </Cloud>
    );
});

export default IconCloudSphere;
