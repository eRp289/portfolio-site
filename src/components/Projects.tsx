"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";

interface Project {
    title: string;
    description: string;
    tags: string[];
    liveUrl?: string;
    image?: string;
    color: string;
    gradient: string;
}

const projects: Project[] = [
    {
        title: "Crypto Store",
        description: "A cryptocurrency dashboard featuring live price tracking, portfolio management, and an AI-powered learning assistant using the Gemini API to help users understand crypto concepts.",
        tags: ["React", "Gemini AI", "Portfolio", "Real-time Data"],
        liveUrl: "https://crypto-project-phi-five.vercel.app/",
        image: "/crpytopic.png",
        color: "purple",
        gradient: "from-purple-500 to-indigo-600",
    },
    {
        title: "Insta-Chapopo",
        description: "A social media inspired application with a modern, clean interface. Features user interactions, content feeds, and responsive design for all devices.",
        tags: ["React", "Social Media", "UI/UX", "Responsive"],
        liveUrl: "https://insta-gcli.vercel.app/",
        image: "/instapic.png",
        color: "pink",
        gradient: "from-pink-500 to-rose-600",
    },
    {
        title: "Test Management System",
        description: "A comprehensive testing platform featuring two integrated sites: a trainee portal for taking assessments and an admin dashboard for creating questions, grading tests, and viewing detailed analytics. Features Firebase real-time sync enabling simultaneous admin grading and trainee test-taking without data collisions.",
        tags: ["React", "Next.js", "Firebase", "Analytics"],
        image: "/testsitepic.png",
        color: "blue",
        gradient: "from-blue-500 to-cyan-600",
    },
];

const colorMap: { [key: string]: { tag: string; darkTag: string } } = {
    purple: { tag: "bg-emerald-50/80 text-emerald-700 hover:bg-emerald-100", darkTag: "dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30" },
    pink: { tag: "bg-emerald-50/80 text-emerald-700 hover:bg-emerald-100", darkTag: "dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30" },
    blue: { tag: "bg-emerald-50/80 text-emerald-700 hover:bg-emerald-100", darkTag: "dark:bg-emerald-900/20 dark:text-emerald-300 dark:hover:bg-emerald-900/30" },
};

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const updatePosition = (clientX: number, clientY: number) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        // Guard against undefined .set method
        if (x && typeof x.set === 'function') {
            x.set(xPct * 0.5); // Reduced intensity
        }
        if (y && typeof y.set === 'function') {
            y.set(yPct * 0.5); // Reduced intensity
        }
    };

    const resetPosition = () => {
        // Guard against undefined .set method
        if (x && typeof x.set === 'function') {
            x.set(0);
        }
        if (y && typeof y.set === 'function') {
            y.set(0);
        }
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            updatePosition(touch.clientX, touch.clientY);
        }
    };

    const handleMouseLeave = () => {
        resetPosition();
    };

    const handleTouchEnd = () => {
        resetPosition();
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`perspective-container ${className}`}
        >
            {children}
        </motion.div>
    );
}

export default function Projects() {
    return (
        <section id="projects" className="py-16 sm:py-20 md:py-28 bg-gray-50 dark:bg-gray-900" aria-labelledby="projects-heading">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm uppercase tracking-widest mb-4 block">Projects</span>
                    <h2 id="projects-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        What I&apos;ve Built
                    </h2>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {projects.map((project, index) => {
                            const colors = colorMap[project.color];
                            return (
                                <motion.article
                                    key={project.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                >
                                    <TiltCard>
                                        <a
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-4 rounded-2xl"
                                            aria-label={`View ${project.title} project`}
                                        >
                                            <Card className={`bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-600 shadow-premium hover-lift transition-premium h-full overflow-hidden`}>
                                                {/* Project preview header with gradient or image */}
                                                <div className={`h-40 bg-gradient-to-br ${project.gradient} flex items-center justify-center relative overflow-hidden`}>
                                                    {project.image ? (
                                                        <img
                                                            src={project.image}
                                                            alt={`${project.title} preview`}
                                                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                                                        />
                                                    ) : (
                                                        <span className="text-6xl font-bold text-white/20" aria-hidden="true">{project.title.charAt(0)}</span>
                                                    )}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" aria-hidden="true" />
                                                    <motion.div
                                                        className="absolute top-4 right-4"
                                                        initial={{ opacity: 0, scale: 0.8 }}
                                                        whileHover={{ scale: 1.1 }}
                                                    >
                                                        <div className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <ExternalLink className="h-4 w-4 text-gray-700 dark:text-gray-300" aria-hidden="true" />
                                                        </div>
                                                    </motion.div>
                                                </div>

                                                <CardContent className="p-6">
                                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors mb-2">
                                                        {project.title}
                                                    </h3>

                                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                                        {project.description}
                                                    </p>

                                                    <div className="flex flex-wrap gap-1.5 sm:gap-2 overflow-hidden">
                                                        {project.tags.map((tag) => (
                                                            <Badge
                                                                key={tag}
                                                                variant="secondary"
                                                                className={`${colors.tag} ${colors.darkTag} border-0 text-xs transition-colors`}
                                                            >
                                                                {tag}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </a>
                                    </TiltCard>
                                </motion.article>
                            );
                        })}
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-center mt-12"
                    >
                        <a
                            href="https://github.com/eRp289"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg px-2 py-1"
                            aria-label="View more projects on GitHub"
                        >
                            <Github className="h-5 w-5" aria-hidden="true" />
                            View more on GitHub
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
