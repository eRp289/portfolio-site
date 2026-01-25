"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const experiences = [
    {
        title: "Innovation & AI Specialist",
        company: "Israeli Police • Digital Policing Branch",
        period: "Aug 2023 - Present",
        description: "Leading initiatives to introduce innovation and AI within law enforcement. Delivered AI training sessions to 100+ law enforcement officers and conducting research on emerging technologies for training enhancement.",
        tags: ["AI", "Innovation", "Education"],
        current: true,
        note: "Concurrent roles in Digital Policing Branch",
    },
    {
        title: "Cyber Education Support",
        company: "Israeli Police • Digital Policing Branch",
        period: "Aug 2023 - Present",
        description: "Designing training materials on OSINT, digital forensics, and internet crime. Developing practical exercises to enhance operational readiness in digital policing.",
        tags: ["OSINT", "Digital Forensics", "Training"],
        current: true,
        note: "Concurrent roles in Digital Policing Branch",
    },
    {
        title: "IT Technician",
        company: "Israeli Police • National Academy",
        period: "Jun 2021 - Jun 2023",
        description: "Managed computer hardware, software systems, and network infrastructure. Administered ERP system for accurate inventory and asset management.",
        tags: ["IT Support", "Networking", "ERP"],
        current: false,
    },
];

export default function Experience() {
    return (
        <Box
            component="section"
            id="experience"
            sx={{
                py: { xs: 8, sm: 10, md: 14 },
                bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(17, 24, 39, 0.5)" : "rgba(249, 250, 251, 1)", // gray-900 / gray-50
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
                        Experience
                    </Typography>
                    <Typography
                        variant="h2"
                        sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                            fontWeight: 700,
                            color: "text.primary",
                        }}
                    >
                        Where I&apos;ve Worked
                    </Typography>
                </motion.div>

                <Box sx={{ maxWidth: 900, mx: "auto" }}>
                    <Timeline position="right" sx={{ p: 0 }}>
                        {experiences.map((exp, index) => (
                            <TimelineItem key={index} sx={{ minHeight: 120 }}>
                                <TimelineOppositeContent
                                    sx={{
                                        display: { xs: "none", sm: "block" },
                                        color: "text.secondary",
                                        fontWeight: 500,
                                        pt: 2.5,
                                    }}
                                >
                                    {exp.period}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot
                                        color={exp.current ? "primary" : "grey"}
                                        sx={{
                                            boxShadow: exp.current ? (theme) => `0 0 10px ${theme.palette.primary.main}` : "none",
                                            width: 14,
                                            height: 14,
                                        }}
                                    />
                                    {index !== experiences.length - 1 && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: "12px", px: 2 }}>
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.1 * index }}
                                        viewport={{ once: true }}
                                    >
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 3,
                                                borderRadius: 4,
                                                bgcolor: "background.paper",
                                                border: "1px solid",
                                                borderColor: "divider",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    borderColor: "primary.light",
                                                    boxShadow: (theme) => theme.shadows[4],
                                                },
                                            }}
                                        >
                                            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                                                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                                    {exp.title}
                                                </Typography>
                                                {exp.current && (
                                                    <Chip
                                                        label="Current"
                                                        size="small"
                                                        color="primary"
                                                        variant="outlined"
                                                        sx={{ height: 20, fontSize: '0.65rem', fontWeight: 700 }}
                                                    />
                                                )}
                                            </Stack>

                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    color: 'text.secondary',
                                                    mb: 2,
                                                }}
                                            >
                                                <Briefcase size={14} />
                                                {exp.company}
                                            </Typography>

                                            {exp.note && (
                                                <Typography variant="caption" sx={{ display: 'block', color: 'primary.main', mb: 1, fontStyle: 'italic' }}>
                                                    {exp.note}
                                                </Typography>
                                            )}

                                            <Typography variant="body2" sx={{ color: "text.secondary", lineHeight: 1.7, mb: 3 }}>
                                                {exp.description}
                                            </Typography>

                                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                                                {exp.tags.map((tag) => (
                                                    <Chip
                                                        key={tag}
                                                        label={tag}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)",
                                                            fontSize: '0.75rem',
                                                            borderRadius: 1,
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Paper>
                                    </motion.div>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </Box>
            </Container>
        </Box>
    );
}
