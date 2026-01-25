"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";

const socialLinks = [
    { icon: Mail, href: "mailto:yehuda@ypinchuck.com", label: "Email Yehuda" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/yehudap", label: "LinkedIn Profile" },
    { icon: Github, href: "https://github.com/eRp289", label: "GitHub Profile" },
] as const;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Box
            component="footer"
            role="contentinfo"
            sx={{
                py: { xs: 8, md: 10 },
                bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(17, 24, 39, 1)" : "rgba(249, 250, 251, 1)",
                borderTop: "1px solid",
                borderColor: "divider",
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={4}
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        style={{ textAlign: "center" }}
                    >
                        <Link
                            href="#home"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            sx={{
                                typography: 'h5',
                                fontWeight: 800,
                                color: "text.primary",
                                textDecoration: "none",
                                transition: "color 0.3s ease",
                                "&:hover": { color: "primary.main" },
                            }}
                            aria-label="Back to top"
                        >
                            Yehuda Pinchuck
                        </Link>
                        <Typography variant="body2" sx={{ color: "text.secondary", mt: 1 }}>
                            Tech Professional • AI Enthusiast
                        </Typography>
                    </motion.div>

                    <motion.nav
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        aria-label="Social media links"
                    >
                        <Stack direction="row" spacing={2} component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <Box component="li" key={label}>
                                    <IconButton
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        aria-label={label}
                                        sx={{
                                            p: 1.5,
                                            border: "1px solid",
                                            borderColor: "divider",
                                            bgcolor: "background.paper",
                                            color: "text.secondary",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                color: "primary.main",
                                                borderColor: "primary.light",
                                                bgcolor: "primary.light",
                                                transform: "translateY(-4px)",
                                            }
                                        }}
                                    >
                                        <Icon size={20} />
                                    </IconButton>
                                </Box>
                            ))}
                        </Stack>
                    </motion.nav>
                </Stack>

                <Divider sx={{ my: 6, opacity: 0.5 }} aria-hidden="true" />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "text.disabled" }}>
                        © {currentYear} Yehuda Pinchuck. Built with MUI & Next.js.
                    </Typography>
                </motion.div>
            </Container>
        </Box>
    );
}
