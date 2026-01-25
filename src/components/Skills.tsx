"use client";

import { motion } from "framer-motion";
import {
    Code2,
    Database,
    Shield,
    Settings
} from "lucide-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";

const skillCategories = [
    {
        title: "Development",
        icon: Code2,
        skills: ["React", "JavaScript", "TypeScript", "HTML/CSS", "Next.js", "Tailwind"],
    },
    {
        title: "Data & Analytics",
        icon: Database,
        skills: ["Python", "SQL", "Excel", "Data Visualization", "Statistics"],
    },
    {
        title: "Tech Innovation",
        icon: Shield,
        skills: ["OSINT", "Digital Forensics", "Cyber Policing", "Internet Crime", "Deepfake Detection"],
    },
    {
        title: "Management",
        icon: Settings,
        skills: ["Agile", "Product Management", "ERP Systems", "Team Training"],
    },
];

export default function Skills() {
    const muiTheme = useTheme();

    return (
        <Box
            component="section"
            id="skills"
            sx={{
                py: { xs: 8, sm: 10, md: 14 },
                bgcolor: "background.default",
            }}
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
                        Skills
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                            fontWeight: 700,
                            color: "text.primary",
                        }}
                    >
                        What I Work With
                    </Typography>
                </motion.div>

                <Box sx={{ maxWidth: 1024, mx: "auto" }}>
                    <Grid container spacing={{ xs: 3, lg: 4 }}>
                        {skillCategories.map((category, index) => (
                            <Grid size={{ xs: 12, md: 6 }} key={category.title}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", stiffness: 100 }}
                                    viewport={{ once: true }}
                                >
                                    <Box
                                        sx={{
                                            bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(31, 41, 55, 0.5)" : "background.paper",
                                            borderRadius: 4,
                                            p: { xs: 3, md: 4 },
                                            boxShadow: (theme) => theme.palette.mode === "dark" ? "none" : theme.shadows[2],
                                            border: "1px solid",
                                            borderColor: "divider",
                                            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                borderColor: "primary.light",
                                                boxShadow: (theme) => theme.shadows[4],
                                            },
                                        }}
                                    >
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                                            <Box
                                                sx={{
                                                    p: 1.5,
                                                    borderRadius: 3,
                                                    bgcolor: "primary.light",
                                                    opacity: 0.8,
                                                    color: "primary.main",
                                                }}
                                            >
                                                <category.icon size={24} />
                                            </Box>
                                            <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                                {category.title}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                            {category.skills.map((skill) => (
                                                <Chip
                                                    key={skill}
                                                    label={skill}
                                                    sx={{
                                                        bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(16, 185, 129, 0.15)" : "rgba(16, 185, 129, 0.1)",
                                                        color: "primary.main",
                                                        fontWeight: 500,
                                                        borderRadius: 2,
                                                        "&:hover": {
                                                            bgcolor: "primary.light",
                                                            transform: "translateY(-1px)",
                                                        },
                                                        transition: "all 0.2s ease",
                                                        cursor: "default",
                                                        border: "none",
                                                    }}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
