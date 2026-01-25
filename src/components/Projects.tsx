"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useRef } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

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
        gradient: "linear-gradient(135deg, #a855f7 0%, #4f46e5 100%)",
    },
    {
        title: "Insta-Chapopo",
        description: "A social media inspired application with a modern, clean interface. Features user interactions, content feeds, and responsive design for all devices.",
        tags: ["React", "Social Media", "UI/UX", "Responsive"],
        liveUrl: "https://insta-gcli.vercel.app/",
        image: "/instapic.png",
        color: "pink",
        gradient: "linear-gradient(135deg, #ec4899 0%, #e11d48 100%)",
    },
    {
        title: "Test Management System",
        description: "A comprehensive testing platform featuring two integrated sites: a trainee portal for taking assessments and an admin dashboard for creating questions, grading tests, and viewing detailed analytics. Features Firebase real-time sync enabling simultaneous admin grading and trainee test-taking without data collisions.",
        tags: ["React", "Next.js", "Firebase", "Analytics"],
        image: "/testsitepic.png",
        color: "blue",
        gradient: "linear-gradient(135deg, #3b82f6 0%, #0891b2 100%)",
    },
];

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

        if (x && typeof x.set === 'function') {
            x.set(xPct * 0.5);
        }
        if (y && typeof y.set === 'function') {
            y.set(yPct * 0.5);
        }
    };

    const resetPosition = () => {
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
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Projects() {
    return (
        <Box
            component="section"
            id="projects"
            sx={{
                py: { xs: 8, sm: 10, md: 14 },
                bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(17, 24, 39, 1)" : "rgba(249, 250, 251, 1)",
            }}
            aria-labelledby="projects-heading"
        >
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", marginBottom: 64 }}
                >
                    <Typography
                        variant="overline"
                        sx={{
                            color: "primary.main",
                            fontWeight: 600,
                            letterSpacing: "0.2em",
                            mb: 2,
                            display: "block",
                        }}
                    >
                        Projects
                    </Typography>
                    <Typography
                        variant="h2"
                        id="projects-heading"
                        sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                            fontWeight: 700,
                            color: "text.primary",
                        }}
                    >
                        What I&apos;ve Built
                    </Typography>
                </motion.div>

                <Box sx={{ maxWidth: 900, mx: "auto" }}>
                    <Grid container spacing={4}>
                        {projects.map((project, index) => (
                            <Grid size={{ xs: 12, md: 6 }} key={project.title}>
                                <motion.article
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                >
                                    <TiltCard>
                                        <Card
                                            component={Link}
                                            href={project.liveUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            sx={{
                                                textDecoration: 'none',
                                                display: 'block',
                                                borderRadius: 4,
                                                overflow: 'hidden',
                                                border: "1px solid",
                                                borderColor: "divider",
                                                bgcolor: "background.paper",
                                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                                height: "100%",
                                                "&:hover": {
                                                    borderColor: "primary.light",
                                                    boxShadow: (theme) => theme.shadows[10],
                                                    "& .project-image": {
                                                        transform: "scale(1.05)",
                                                    },
                                                    "& .external-link-icon": {
                                                        opacity: 1,
                                                        transform: "scale(1.1)",
                                                    }
                                                },
                                            }}
                                        >
                                            <Box sx={{ position: "relative", height: 180, overflow: "hidden" }}>
                                                {project.image ? (
                                                    <CardMedia
                                                        component="img"
                                                        image={project.image}
                                                        alt={project.title}
                                                        className="project-image"
                                                        sx={{
                                                            height: "100%",
                                                            objectFit: "cover",
                                                            objectPosition: "top",
                                                            transition: "transform 0.5s ease",
                                                        }}
                                                    />
                                                ) : (
                                                    <Box
                                                        sx={{
                                                            height: "100%",
                                                            background: project.gradient,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <Typography variant="h2" sx={{ color: "rgba(255,255,255,0.2)", fontWeight: 800 }}>
                                                            {project.title.charAt(0)}
                                                        </Typography>
                                                    </Box>
                                                )}
                                                <Box
                                                    className="external-link-icon"
                                                    sx={{
                                                        position: "absolute",
                                                        top: 16,
                                                        right: 16,
                                                        p: 1,
                                                        bgcolor: "rgba(255,255,255,0.9)",
                                                        color: "grey.800",
                                                        borderRadius: "50%",
                                                        opacity: 0,
                                                        transition: "all 0.3s ease",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        boxShadow: 2,
                                                    }}
                                                >
                                                    <ExternalLink size={16} />
                                                </Box>
                                            </Box>
                                            <CardContent sx={{ p: 4 }}>
                                                <Typography
                                                    variant="h5"
                                                    sx={{
                                                        fontWeight: 700,
                                                        mb: 2,
                                                        color: "text.primary",
                                                        transition: "color 0.3s ease",
                                                        ".group:hover &": { color: "primary.main" }
                                                    }}
                                                >
                                                    {project.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 3 }}>
                                                    {project.description}
                                                </Typography>
                                                <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                                    {project.tags.map((tag) => (
                                                        <Chip
                                                            key={tag}
                                                            label={tag}
                                                            size="small"
                                                            sx={{
                                                                bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.08)",
                                                                color: "primary.main",
                                                                fontWeight: 600,
                                                                borderRadius: 1,
                                                                fontSize: '0.7rem'
                                                            }}
                                                        />
                                                    ))}
                                                </Stack>
                                            </CardContent>
                                        </Card>
                                    </TiltCard>
                                </motion.article>
                            </Grid>
                        ))}
                    </Grid>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <Box sx={{ mt: 8, textAlign: "center" }}>
                            <Button
                                component={Link}
                                href="https://github.com/eRp289"
                                target="_blank"
                                rel="noopener noreferrer"
                                startIcon={<Github size={20} />}
                                sx={{
                                    color: "text.secondary",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    "&:hover": { color: "text.primary", bgcolor: "transparent" },
                                }}
                            >
                                View more on GitHub
                            </Button>
                        </Box>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
}
