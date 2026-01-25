"use client";

import { motion } from "framer-motion";
import { Target, Briefcase, Shield, ArrowUpRight } from "lucide-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

const highlights = [
    {
        icon: Shield,
        title: "Tech Innovation",
        description: "OSINT, Digital Forensics, Cyber Policing",
    },
    {
        icon: Briefcase,
        title: "IT Systems",
        description: "Police Infrastructure & Support",
    },
    {
        icon: Target,
        title: "AI Innovation",
        description: "Emerging Tech in Law Enforcement",
    },
];

export default function About() {
    return (
        <Box
            component="section"
            id="about"
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
                    style={{ maxWidth: 800, margin: "0 auto", textAlign: "center", marginBottom: 80 }}
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
                        About
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "1.75rem", sm: "2.25rem", md: "3rem" },
                            fontWeight: 700,
                            mb: 3,
                            color: "text.primary",
                        }}
                    >
                        Bridging Technology & Innovation
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "text.secondary",
                            fontSize: "1.125rem",
                            lineHeight: 1.8,
                        }}
                    >
                        Motivated and detail-oriented tech professional with hands-on
                        experience in police IT systems, instructional support, and
                        innovative technology solutions. Passionate about applying technical and
                        analytical skills to solve real-world challenges.
                    </Typography>
                </motion.div>

                <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: 1024, mx: "auto" }}>
                    {highlights.map((item, index) => (
                        <Grid size={{ xs: 12, md: 4 }} key={item.title}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", stiffness: 100 }}
                                viewport={{ once: true }}
                                style={{ height: "100%" }}
                            >
                                <Card
                                    sx={{
                                        height: "100%",
                                        cursor: "pointer",
                                        bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(31, 41, 55, 0.5)" : "background.paper",
                                        borderColor: "divider",
                                        borderWidth: 1,
                                        borderStyle: "solid",
                                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            borderColor: "primary.light",
                                            boxShadow: (theme) => theme.shadows[4],
                                            "& .arrow-icon": {
                                                transform: "translate(2px, -2px)",
                                                color: "primary.main",
                                            },
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: 4 }}>
                                        <Box
                                            sx={{
                                                display: "inline-flex",
                                                p: 1.5,
                                                borderRadius: 3,
                                                bgcolor: "primary.light",
                                                opacity: 0.8,
                                                mb: 3,
                                                color: "primary.main",
                                            }}
                                        >
                                            <item.icon size={24} />
                                        </Box>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <Box>
                                                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.6 }}>
                                                    {item.description}
                                                </Typography>
                                            </Box>
                                            <ArrowUpRight
                                                className="arrow-icon"
                                                size={18}
                                                style={{ color: "#94a3b8", transition: "all 0.3s ease" }}
                                            />
                                        </Box>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
