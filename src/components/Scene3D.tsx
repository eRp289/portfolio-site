"use client";

import { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useTheme } from "next-themes";
import * as THREE from "three";

function FloatingShape({ position, color, speed = 1, distort = 0.3 }: {
    position: [number, number, number];
    color: string;
    speed?: number;
    distort?: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <mesh ref={meshRef} position={position}>
                <icosahedronGeometry args={[1, 1]} />
                <MeshDistortMaterial
                    color={color}
                    transparent
                    opacity={0.6}
                    distort={distort}
                    speed={2}
                    roughness={0.2}
                />
            </mesh>
        </Float>
    );
}

function Scene() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const primaryColor = isDark ? "#34d399" : "#10b981";
    const secondaryColor = isDark ? "#818cf8" : "#6366f1";
    const accentColor = isDark ? "#f472b6" : "#ec4899";

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />

            <FloatingShape position={[-3, 1, -2]} color={primaryColor} speed={0.8} distort={0.4} />
            <FloatingShape position={[3, -1, -3]} color={secondaryColor} speed={1.2} distort={0.3} />
            <FloatingShape position={[0, 2, -4]} color={accentColor} speed={0.6} distort={0.5} />
        </>
    );
}

export function Scene3D() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Disable 3D on mobile for performance
    if (isMobile) {
        return null;
    }

    return (
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                style={{ background: "transparent" }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
