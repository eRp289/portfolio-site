"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, MapPin, Send, CheckCircle, ExternalLink, AlertCircle, WifiOff, X } from "lucide-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import { isOnline, saveFormData, getFormData, clearFormData } from "@/lib/utils";

const contactInfo = [
    {
        icon: Mail,
        label: "Email",
        value: "yehuda@ypinchuck.com",
        href: "mailto:yehuda@ypinchuck.com",
    },
    {
        icon: Linkedin,
        label: "LinkedIn",
        value: "linkedin.com/in/yehudap",
        href: "https://www.linkedin.com/in/yehudap",
    },
    {
        icon: MapPin,
        label: "Location",
        value: "Israel",
        href: null,
    },
] as const;

const FORM_ID = "contact-form";

type FormData = {
    name: string;
    email: string;
    message: string;
};

export default function Contact() {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isOffline, setIsOffline] = useState(false);
    const [errorType, setErrorType] = useState<"network" | "server" | "validation" | null>(null);

    // Check online status
    useEffect(() => {
        const updateOnlineStatus = () => {
            setIsOffline(!isOnline());
        };

        updateOnlineStatus();
        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);

        return () => {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    // Restore form data on mount
    useEffect(() => {
        const savedData = getFormData(FORM_ID);
        if (savedData) {
            const form = document.getElementById(FORM_ID) as HTMLFormElement;
            if (form) {
                Object.entries(savedData).forEach(([key, value]) => {
                    const input = form.elements.namedItem(key) as HTMLInputElement | HTMLTextAreaElement;
                    if (input) input.value = value;
                });
            }
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("");
        setErrorType(null);

        if (!isOnline()) {
            setErrorType("network");
            setResult("You appear to be offline. Please check your connection and try again.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData(event.currentTarget);
        const formDataObj: FormData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };
        saveFormData(FORM_ID, formDataObj);

        const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
        if (!apiKey) {
            console.error("Web3Forms API key is not configured");
            setErrorType("server");
            setResult("Configuration error. Please contact the site administrator.");
            setIsSubmitting(false);
            return;
        }

        formData.append("access_key", apiKey);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setIsSubmitted(true);
                setResult("Success!");
                clearFormData(FORM_ID);
                (event.target as HTMLFormElement).reset();

                setTimeout(() => {
                    const successDiv = document.getElementById("success-message");
                    successDiv?.focus();
                }, 100);
            } else {
                setErrorType("server");
                if (response.status === 429) {
                    setResult("Too many requests. Please try again in a few minutes.");
                } else if (response.status >= 500) {
                    setResult("Server error. Please try again later.");
                } else {
                    setResult(data.message || "Error sending message. Please try again.");
                }
            }
        } catch (error) {
            if (error instanceof TypeError && error.message.includes("fetch")) {
                setErrorType("network");
                setResult("Network error. Please check your connection and try again.");
            } else {
                setErrorType("server");
                setResult("Unexpected error. Please try again later.");
            }
            console.error("Form submission error:", error);
        }

        setIsSubmitting(false);
    };

    const dismissSuccess = () => {
        setIsSubmitted(false);
        setResult("");
        clearFormData(FORM_ID);
    };

    return (
        <Box
            component="section"
            id="contact"
            sx={{
                py: { xs: 8, sm: 10, md: 12 },
                bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(17, 24, 39, 1)" : "rgba(249, 250, 251, 1)",
            }}
            aria-labelledby="contact-heading"
        >
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ textAlign: "center", marginBottom: 64 }}
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
                        Contact
                    </Typography>
                    <Typography
                        variant="h2"
                        id="contact-heading"
                        sx={{
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3.5rem" },
                            fontWeight: 700,
                            mb: 3,
                            color: "text.primary",
                        }}
                    >
                        Let&apos;s Connect
                    </Typography>

                    <Box sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                bgcolor: (theme) => theme.palette.mode === "dark" ? "rgba(16, 185, 129, 0.1)" : "rgba(16, 185, 129, 0.05)",
                                border: "1px solid",
                                borderColor: "primary.light",
                                borderRadius: 3,
                            }}
                        >
                            <Typography variant="body2" sx={{ fontWeight: 600, mb: 1, color: "text.primary" }}>
                                Why work with me:
                            </Typography>
                            <Stack spacing={1} sx={{ textAlign: 'left' }}>
                                {[
                                    "Trained 1000+ law enforcement officers in AI and emerging technologies",
                                    "Built real-time collaboration systems for police training",
                                    "Specialized in OSINT, digital forensics, and law enforcement tech innovation"
                                ].map((text, i) => (
                                    <Stack key={i} direction="row" spacing={1} alignItems="flex-start">
                                        <Typography sx={{ color: "primary.main", fontWeight: 700, fontSize: '0.9rem' }}>✓</Typography>
                                        <Typography variant="caption" sx={{ color: "text.secondary" }}>{text}</Typography>
                                    </Stack>
                                ))}
                            </Stack>
                        </Paper>
                    </Box>

                    <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}>
                        Interested in working together? Reach out for collaborations, opportunities, or just to say hello! I&apos;ll respond within 24 hours.
                    </Typography>
                </motion.div>

                {isOffline && (
                    <Alert
                        severity="warning"
                        icon={<WifiOff size={20} />}
                        sx={{ maxWidth: 1024, mx: "auto", mb: 4, borderRadius: 2 }}
                    >
                        You&apos;re currently offline. Please check your internet connection.
                    </Alert>
                )}

                <Grid container spacing={6} sx={{ maxWidth: 1024, mx: "auto" }}>
                    {/* Contact Info */}
                    <Grid size={{ xs: 12, md: 5 }}>
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
                                Contact Information
                            </Typography>
                            <Stack spacing={3}>
                                {contactInfo.map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 * index }}
                                        viewport={{ once: true }}
                                    >
                                        {item.href ? (
                                            <Paper
                                                component={Link}
                                                href={item.href}
                                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2,
                                                    p: 2.5,
                                                    borderRadius: 3,
                                                    textDecoration: 'none',
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                    transition: "all 0.3s ease",
                                                    "&:hover": {
                                                        borderColor: "primary.main",
                                                        transform: "translateY(-4px)",
                                                        boxShadow: (theme) => theme.shadows[4],
                                                    }
                                                }}
                                            >
                                                <Box sx={{ p: 1.5, bgcolor: "primary.light", borderRadius: 2, color: "primary.main", display: 'flex' }}>
                                                    <item.icon size={20} />
                                                </Box>
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography variant="caption" sx={{ color: "text.secondary", display: 'block' }}>{item.label}</Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>{item.value}</Typography>
                                                </Box>
                                                <ExternalLink size={14} style={{ opacity: 0.5 }} />
                                            </Paper>
                                        ) : (
                                            <Paper
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2,
                                                    p: 2.5,
                                                    borderRadius: 3,
                                                    border: "1px solid",
                                                    borderColor: "divider",
                                                }}
                                            >
                                                <Box sx={{ p: 1.5, bgcolor: "primary.light", borderRadius: 2, color: "primary.main", display: 'flex' }}>
                                                    <item.icon size={20} />
                                                </Box>
                                                <Box>
                                                    <Typography variant="caption" sx={{ color: "text.secondary", display: 'block' }}>{item.label}</Typography>
                                                    <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>{item.value}</Typography>
                                                </Box>
                                            </Paper>
                                        )}
                                    </motion.div>
                                ))}
                            </Stack>
                        </motion.div>
                    </Grid>

                    {/* Contact Form */}
                    <Grid size={{ xs: 12, md: 7 }}>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <Card sx={{ borderRadius: 4, border: "1px solid", borderColor: "divider", boxShadow: (theme) => theme.shadows[4] }}>
                                <CardContent sx={{ p: { xs: 4, md: 5 } }}>
                                    <Typography variant="h5" sx={{ fontWeight: 700, mb: 4 }}>
                                        Send a Message
                                    </Typography>

                                    {isSubmitted ? (
                                        <Box id="success-message" sx={{ textAlign: 'center', py: 6 }} tabIndex={-1}>
                                            <Box sx={{ p: 2, bgcolor: "primary.light", borderRadius: "50%", display: 'inline-flex', mb: 2, color: "primary.main" }}>
                                                <CheckCircle size={40} />
                                            </Box>
                                            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Message Sent!</Typography>
                                            <Typography variant="body2" sx={{ color: "text.secondary", mb: 4 }}>
                                                Thank you for reaching out. I&apos;ll get back to you soon.
                                            </Typography>
                                            <Button variant="outlined" startIcon={<X size={16} />} onClick={dismissSuccess} sx={{ borderRadius: 2 }}>
                                                Dismiss
                                            </Button>
                                        </Box>
                                    ) : (
                                        <form id={FORM_ID} onSubmit={handleSubmit}>
                                            <Stack spacing={3}>
                                                {result && errorType && (
                                                    <Alert
                                                        severity={errorType === "network" ? "warning" : "error"}
                                                        icon={errorType === "network" ? <WifiOff size={18} /> : <AlertCircle size={18} />}
                                                        sx={{ borderRadius: 2 }}
                                                    >
                                                        {result}
                                                    </Alert>
                                                )}

                                                <input type="text" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
                                                <input type="hidden" name="subject" value="New Contact Form Submission from Portfolio" />

                                                <TextField
                                                    fullWidth
                                                    id="contact-name"
                                                    name="name"
                                                    label="Your Name"
                                                    required
                                                    variant="outlined"
                                                    sx={{ bgcolor: 'background.default' }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    id="contact-email"
                                                    name="email"
                                                    label="Your Email"
                                                    type="email"
                                                    required
                                                    variant="outlined"
                                                    sx={{ bgcolor: 'background.default' }}
                                                />
                                                <TextField
                                                    fullWidth
                                                    id="contact-message"
                                                    name="message"
                                                    label="Your Message"
                                                    multiline
                                                    rows={5}
                                                    required
                                                    variant="outlined"
                                                    sx={{ bgcolor: 'background.default' }}
                                                />

                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    size="large"
                                                    disabled={isSubmitting || isOffline}
                                                    startIcon={!isSubmitting && <Send size={20} />}
                                                    sx={{
                                                        py: 2,
                                                        borderRadius: 2,
                                                        fontWeight: 700,
                                                        boxShadow: (theme) => theme.palette.mode === 'dark' ? 'none' : theme.shadows[4]
                                                    }}
                                                >
                                                    {isSubmitting ? "Sending..." : "Send Message"}
                                                </Button>
                                            </Stack>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </motion.div>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
