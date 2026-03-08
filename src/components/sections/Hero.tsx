"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Download, ArrowRight, Github } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Magnetic from "@/components/Magnetic";

// ─── Cinematic Character Reveal Intro ───────────────────────────────

const INTRO_TEXT = "ISHU BARMAN";

// Characters enter from alternating left/right, starting very large
const getCharEntrance = (index: number) => {
    const fromLeft = index % 2 === 0;
    return {
        x: fromLeft ? -1200 : 1200,
        scale: 3.5,
        opacity: 0,
        filter: "blur(10px)",
    };
};

const CinematicIntro = ({
    phase,
}: {
    phase: "entering" | "formed" | "shrinking" | "done";
}) => {
    return (
        <div className="flex items-center gap-[2px]">
            {INTRO_TEXT.split("").map((char, i) => {
                const entrance = getCharEntrance(i);
                const isFormed = phase === "formed" || phase === "shrinking" || phase === "done";

                return (
                    <motion.span
                        key={i}
                        initial={{
                            x: entrance.x,
                            scale: entrance.scale,
                            opacity: entrance.opacity,
                            filter: entrance.filter,
                        }}
                        animate={
                            isFormed
                                ? {
                                    x: 0,
                                    scale: 1,
                                    opacity: 1,
                                    filter: "blur(0px)",
                                }
                                : {
                                    x: 0,
                                    scale: 1,
                                    opacity: 1,
                                    filter: "blur(0px)",
                                }
                        }
                        transition={{
                            duration: 1.2,
                            delay: i * 0.08,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="inline-block text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider text-foreground uppercase"
                        style={{
                            textShadow: "0 0 30px var(--accent-primary), 0 0 60px rgba(79,70,229,0.3)",
                        }}
                    >
                        {char === " " ? "\u00A0" : char}
                    </motion.span>
                );
            })}
        </div>
    );
};

// ─── 3D Rotating Sphere ─────────────────────────────────────────────

const FloatingCube = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
            meshRef.current.rotation.y += 0.01;
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} rotation={[10, 10, 10]}>
            <icosahedronGeometry args={[2, 1]} />
            <meshStandardMaterial color="#A5C8D6" wireframe />
        </mesh>
    );
};

// ─── Hero Section ───────────────────────────────────────────────────

const ROLES = [
    "Software Engineer",
    "Web Developer",
    "Tech Enthusiast",
    "Problem Solver",
];

export default function Hero() {
    // Intro phases: "entering" → "formed" → "shrinking" → "done"
    const [phase, setPhase] = useState<"entering" | "formed" | "shrinking" | "done">("entering");
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        // Phase timings
        // Characters enter: ~0 to 2s (1.2s duration + 11 chars * 0.08s stagger = ~2s)
        // Hold formed: 2s to 3s (1 second pause)
        // Shrink to navbar: 3s to 4.8s (1.8s animation)
        // Done: 4.8s+

        const formTimer = setTimeout(() => setPhase("formed"), 2200);
        const shrinkTimer = setTimeout(() => setPhase("shrinking"), 3200);
        const doneTimer = setTimeout(() => setPhase("done"), 5000);

        return () => {
            clearTimeout(formTimer);
            clearTimeout(shrinkTimer);
            clearTimeout(doneTimer);
        };
    }, []);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 200]);

    // Role typing effect
    useEffect(() => {
        const typingSpeed = isDeleting ? 50 : 100;
        const currentRole = ROLES[currentRoleIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting && currentText === currentRole) {
                setTimeout(() => setIsDeleting(true), 1500);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
            } else {
                const nextText = isDeleting
                    ? currentRole.substring(0, currentText.length - 1)
                    : currentRole.substring(0, currentText.length + 1);
                setCurrentText(nextText);
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [currentText, isDeleting, currentRoleIndex]);

    const isDone = phase === "done";
    const isShrinking = phase === "shrinking";

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center pt-20">

            {/* ── INTRO OVERLAY ── */}
            <AnimatePresence>
                {phase !== "done" && (
                    <>
                        {/* Full-screen dark background */}
                        <motion.div
                            key="intro-backdrop"
                            className="fixed inset-0 z-[100] bg-background pointer-events-none"
                            animate={{
                                opacity: isShrinking ? 0 : 1,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.4, ease: "easeInOut" }}
                        />

                        {/* Centered text that shrinks to navbar */}
                        <motion.div
                            key="intro-chars"
                            className="fixed z-[101] pointer-events-none flex items-center justify-center"
                            initial={{
                                top: "50%",
                                left: "50%",
                                x: "-50%",
                                y: "-50%",
                            }}
                            animate={
                                isShrinking
                                    ? {
                                        top: "22px",
                                        left: "50%",
                                        x: "-50%",
                                        y: "0%",
                                        scale: 0.22,
                                        opacity: 0,
                                    }
                                    : {
                                        top: "50%",
                                        left: "50%",
                                        x: "-50%",
                                        y: "-50%",
                                        scale: 1,
                                        opacity: 1,
                                    }
                            }
                            exit={{ opacity: 0 }}
                            transition={{
                                duration: 1.8,
                                ease: [0.76, 0, 0.24, 1],
                            }}
                        >
                            <CinematicIntro phase={phase} />
                        </motion.div>

                        {/* Subtle accent glow behind text during intro */}
                        <motion.div
                            key="intro-glow"
                            className="fixed z-[99] pointer-events-none w-[600px] h-[200px] rounded-full"
                            style={{
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                background: "radial-gradient(ellipse, var(--accent-primary) 0%, transparent 70%)",
                                opacity: 0.15,
                                filter: "blur(60px)",
                            }}
                            animate={{
                                opacity: isShrinking ? 0 : 0.15,
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1 }}
                        />
                    </>
                )}
            </AnimatePresence>

            {/* ── BACKGROUND GRADIENTS ── */}
            <div
                className={`absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${isDone ? "opacity-100 animate-pulse" : "opacity-0"}`}
            />
            <div
                className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-muted/20 rounded-full blur-[120px] pointer-events-none transition-opacity duration-1000 ${isDone ? "opacity-100 animate-pulse" : "opacity-0"}`}
                style={{ animationDelay: "2s" }}
            />

            <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* ── LEFT: Hero Text Content ── */}
                <motion.div
                    style={{ y: y1 }}
                    initial={{ opacity: 0, x: -80 }}
                    animate={isDone ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                    className="flex flex-col space-y-6"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isDone ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium w-max mb-2"
                    >
                        Welcome to my universe
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={isDone ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-5xl lg:text-7xl font-bold font-sans tracking-tight text-foreground leading-tight"
                    >
                        Hi, I&apos;m <br />
                        <span className="text-neon">Ishu Barman</span>
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0 }}
                        animate={isDone ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-2xl lg:text-3xl font-medium text-foreground h-10 flex items-center"
                    >
                        <span className="mr-2">I am a</span>
                        <span className="text-primary font-semibold border-r-2 border-primary pr-1 animate-[blink_1s_infinite]">
                            {currentText}
                        </span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isDone ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-muted text-lg max-w-lg leading-relaxed"
                    >
                        I craft responsive websites, develop efficient algorithms, and build digital experiences that live at the intersection of design and engineering.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isDone ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="flex flex-wrap items-center gap-4 pt-4"
                    >
                        <Magnetic strength={0.4}>
                            <a
                                href="#projects"
                                className="interactive px-6 py-3 rounded-full bg-primary text-background font-semibold flex items-center gap-2 hover:opacity-80 transition-opacity shadow-[0_0_20px_rgba(79,70,229,0.4)]"
                            >
                                View Projects
                                <ArrowRight size={18} />
                            </a>
                        </Magnetic>

                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className="interactive px-6 py-3 rounded-full border border-muted/50 bg-surface/50 text-foreground font-medium flex items-center gap-2 hover:bg-surface hover:border-muted transition-colors"
                        >
                            <Download size={18} />
                            Resume
                        </a>

                        <Magnetic strength={0.4}>
                            <a
                                href="https://github.com/IshuBarman"
                                target="_blank"
                                rel="noreferrer"
                                className="interactive p-3 rounded-full border border-muted/50 bg-surface/50 text-foreground hover:text-primary hover:border-primary/50 transition-colors ml-2"
                            >
                                <Github size={20} />
                            </a>
                        </Magnetic>
                    </motion.div>
                </motion.div>

                {/* ── RIGHT: 3D Sphere ── */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                    className="h-[400px] lg:h-[600px] w-full relative flex items-center justify-center interactive"
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-muted/5 rounded-full blur-3xl opacity-50" />
                    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <directionalLight position={[10, 10, 5]} intensity={1} />
                        <FloatingCube />
                        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                    </Canvas>
                </motion.div>

            </div>
        </section>
    );
}
