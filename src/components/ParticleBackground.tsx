"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Box from "@mui/material/Box";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
}

export function ParticleBackground() {
    const [particles, setParticles] = useState<Particle[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        const count = isMobile ? 15 : 30;
        const newParticles: Particle[] = [];

        for (let i = 0; i < count; i++) {
            newParticles.push({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 2,
                duration: Math.random() * 20 + 15,
                delay: Math.random() * 5,
            });
        }
        setParticles(newParticles);
    }, [isMobile]);

    return (
        <Box
            sx={{
                position: "fixed",
                inset: 0,
                pointerEvents: "none",
                overflow: "hidden",
                zIndex: 0,
            }}
            aria-hidden="true"
        >
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    style={{
                        position: "absolute",
                        borderRadius: "50%",
                        backgroundColor: "rgba(16, 185, 129, 0.2)",
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: particle.size,
                        height: particle.size,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0.2, 0.5, 0.2],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </Box>
    );
}
