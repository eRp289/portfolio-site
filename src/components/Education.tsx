"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar } from "lucide-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";

const specializations = [
    { title: "Front-End Development", topics: ["React", "JavaScript", "HTML/CSS", "Next.js"] },
    { title: "Data Analysis", topics: ["Python", "SQL", "Excel", "Visualization"] },
    { title: "Product Management", topics: ["Agile", "User Research", "Roadmapping"] },
    { title: "Information Systems", topics: ["ERP", "CRM", "Databases"] },
    { title: "Business Admin", topics: ["Management", "Marketing", "Finance"] },
];

export default function Education() {
    return (
        <Box
            component="section"
            id="education"
            sx={{
                py: { xs: 8, sm: 10, md: 14 },
                bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(17, 24, 39, 0.5)" : "rgba(249, 250, 251, 1)",
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
                        Education
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                            fontWeight: 700,
                            color: "text.primary",
                        }}
                    >
                        Academic Background
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    style={{ maxWidth: 800, margin: "0 auto", marginBottom: 48 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 3, md: 4 },
                            borderRadius: 4,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                boxShadow: (theme) => theme.shadows[4],
                            },
                        }}
                    >
                        <Stack direction={{ xs: "column", md: "row" }} spacing={4}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "primary.main",
                                    borderRadius: 3,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: 64,
                                    height: 64,
                                    flexShrink: 0,
                                }}
                            >
                                <GraduationCap size={32} color="#fff" />
                            </Box>
                            <Box sx={{ flex: 1 }}>
                                <Stack direction="row" alignItems="center" spacing={2} mb={1} flexWrap="wrap">
                                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                                        Ono Academic College
                                    </Typography>
                                    <Chip
                                        label="In Progress"
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        sx={{
                                            height: 24,
                                            fontWeight: 700,
                                            "& .MuiChip-label": { px: 1.5 }
                                        }}
                                    />
                                </Stack>
                                <Typography variant="h6" sx={{ color: "text.primary", mb: 0.5, fontWeight: 500 }}>
                                    B.A. in Business Administration
                                </Typography>
                                <Typography variant="subtitle1" sx={{ color: "primary.main", fontWeight: 600, mb: 2 }}>
                                    Specialization in Information Systems
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} sx={{ color: "text.secondary" }}>
                                    <Calendar size={16} />
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                        November 2023 — March 2026
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </motion.div>

                <Box sx={{ maxWidth: 900, mx: "auto" }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Typography
                            variant="subtitle2"
                            sx={{
                                textAlign: "center",
                                color: "text.secondary",
                                fontWeight: 600,
                                letterSpacing: '0.05em',
                                mb: 4,
                            }}
                        >
                            AREAS OF STUDY
                        </Typography>
                    </motion.div>

                    <Grid container spacing={3}>
                        {specializations.map((spec, index) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={spec.title}>
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.05 * index }}
                                    viewport={{ once: true }}
                                    style={{ height: "100%" }}
                                >
                                    <Card
                                        sx={{
                                            height: "100%",
                                            borderRadius: 3,
                                            border: "1px solid",
                                            borderColor: "divider",
                                            bgcolor: "background.paper",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                borderColor: "primary.light",
                                                boxShadow: (theme) => theme.shadows[2],
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ p: 3 }}>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 2, fontSize: '0.8rem' }}>
                                                {spec.title}
                                            </Typography>
                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                                {spec.topics.map((topic) => (
                                                    <Chip
                                                        key={topic}
                                                        label={topic}
                                                        size="small"
                                                        sx={{
                                                            height: 22,
                                                            fontSize: "0.7rem",
                                                            bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                                                            borderRadius: 1,
                                                            fontWeight: 500,
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
