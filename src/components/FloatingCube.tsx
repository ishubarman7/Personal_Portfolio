"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
    FaReact,
    FaPython,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaDocker,
    FaGitAlt,
    FaJava
} from "react-icons/fa6";
import {
    TbBrandTypescript,
    TbBrandJavascript,
    TbBrandNextjs,
    TbBrandTailwind,
    TbBrandMongodb,
    TbBrandCpp
} from "react-icons/tb";

const SKILL_ICONS = [
    { Icon: TbBrandCpp, color: "#4F46E5" }, // primary
    { Icon: FaPython, color: "#94A3B8" },   // muted
    { Icon: TbBrandJavascript, color: "#4F46E5" },
    { Icon: TbBrandTypescript, color: "#F8FAFC" }, // foreground
    { Icon: FaJava, color: "#94A3B8" },
    { Icon: FaReact, color: "#4F46E5" },
    { Icon: TbBrandNextjs, color: "#F8FAFC" },
    { Icon: FaNodeJs, color: "#94A3B8" },
    { Icon: TbBrandTailwind, color: "#4F46E5" },
    { Icon: TbBrandMongodb, color: "#94A3B8" },
    { Icon: FaDocker, color: "#4F46E5" },
    { Icon: FaGitAlt, color: "#94A3B8" },
    { Icon: FaHtml5, color: "#4F46E5" },
    { Icon: FaCss3Alt, color: "#94A3B8" },
];

export default function FloatingCube() {
    const groupRef = useRef<THREE.Group>(null);

    // Generate spherical coordinates using Fibonacci sphere algorithm
    const points = useMemo(() => {
        const numIcons = SKILL_ICONS.length;
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        return SKILL_ICONS.map((icon, i) => {
            const y = 1 - (i / (numIcons - 1)) * 2; 
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;

            // Scale to increase sphere size
            return {
                position: new THREE.Vector3(x, y, z).multiplyScalar(2.2),
                icon
            };
        });
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            groupRef.current.rotation.y += 0.015;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    return (
        <group ref={groupRef} rotation={[10, 10, 10]}>
            {points.map((point, i) => (
                <Html
                    key={i}
                    position={point.position}
                    center
                    distanceFactor={15}
                    transform
                    sprite
                >
                    <div
                        className="flex items-center justify-center w-12 h-12 rounded-full glass-card border border-white/10 shadow-lg interactive"
                        style={{ color: point.icon.color }}
                    >
                        <point.icon.Icon size={24} />
                    </div>
                </Html>
            ))}
            {/* Inner faint wireframe sphere for visual depth */}
            <mesh>
                <icosahedronGeometry args={[1.5, 1]} />
                <meshStandardMaterial color="#4F46E5" wireframe opacity={0.15} transparent />
            </mesh>
        </group>
    );
}
