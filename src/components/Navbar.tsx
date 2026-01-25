"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Contact", href: "#contact" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
] as const;

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const handleScroll = useCallback(() => {
        setIsScrolled(window.scrollY > 50);

        const sections = navLinks.map((link) => link.href.substring(1));
        for (const section of [...sections].reverse()) {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 150) {
                    setActiveSection(section);
                    break;
                }
            }
        }
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const handleNavClick = useCallback((href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(href.substring(1));
        element?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <>
            <motion.div
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100 }}
            >
                <AppBar
                    position="static"
                    elevation={0}
                    sx={{
                        background: isScrolled ? "transparent" : "transparent",
                        bgcolor: isScrolled ? "background.paper" : "transparent",
                        backdropFilter: isScrolled ? "blur(16px) saturate(180%)" : "none",
                        borderBottom: isScrolled ? "1px solid" : "none",
                        borderColor: "divider",
                        transition: "all 0.3s ease-in-out",
                        ...(isScrolled && {
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'dark'
                                    ? 'rgba(18, 18, 18, 0.8)'
                                    : 'rgba(255, 255, 255, 0.8)',
                        })
                    }}
                >
                    <Container maxWidth="lg">
                        <Toolbar disableGutters sx={{ height: 64, justifyContent: "space-between" }}>
                            {/* Logo */}
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                style={{ display: 'flex' }}
                            >
                                <Link
                                    href="#home"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick("#home");
                                    }}
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                    <Image
                                        src="/name_logo.png"
                                        alt="Yehuda Pinchuck Logo"
                                        width={120}
                                        height={40}
                                        style={{ height: '32px', width: 'auto' }}
                                        priority
                                    />
                                </Link>
                            </motion.div>

                            {/* Desktop Navigation */}
                            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                                {navLinks.map((link) => (
                                    <Button
                                        key={link.name}
                                        onClick={() => handleNavClick(link.href)}
                                        sx={{
                                            fontSize: "0.875rem",
                                            fontWeight: 500,
                                            color: activeSection === link.href.substring(1)
                                                ? "primary.main"
                                                : "text.secondary",
                                            "&:hover": {
                                                color: "text.primary",
                                                bgcolor: "action.hover",
                                            },
                                            position: "relative",
                                            px: 2,
                                        }}
                                    >
                                        {link.name}
                                        {activeSection === link.href.substring(1) && (
                                            <motion.div
                                                className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-500 rounded-full"
                                                layoutId="activeSection"
                                                style={{ position: 'absolute', bottom: 0, left: 8, right: 8, height: 2, backgroundColor: '#10b981', borderRadius: 4 }}
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </Button>
                                ))}
                            </Box>

                            {/* Theme Toggle and Mobile Menu Button */}
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <ThemeToggle />
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    edge="start"
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    sx={{ display: { md: "none" } }}
                                >
                                    {isMobileMenuOpen ? <X /> : <Menu />}
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </motion.div>

            {/* Mobile Drawer */}
            <Drawer
                anchor="top"
                open={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                PaperProps={{
                    sx: {
                        marginTop: "64px",
                        bgcolor: "background.paper",
                        backdropFilter: "blur(16px) saturate(180%)",
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'rgba(18, 18, 18, 0.95)'
                                : 'rgba(255, 255, 255, 0.95)',
                        borderBottom: "1px solid",
                        borderColor: "divider",
                    }
                }}
            >
                <Container maxWidth="lg">
                    <List sx={{ py: 2 }}>
                        {navLinks.map((link) => (
                            <ListItem key={link.name} disablePadding>
                                <ListItemButton
                                    onClick={() => handleNavClick(link.href)}
                                    sx={{
                                        borderRadius: 2,
                                        mb: 0.5,
                                        bgcolor: activeSection === link.href.substring(1)
                                            ? "primary.main"
                                            : "transparent",
                                        "&:hover": {
                                            bgcolor: activeSection === link.href.substring(1)
                                                ? "primary.dark"
                                                : "action.hover",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={link.name}
                                        primaryTypographyProps={{
                                            fontWeight: 500,
                                            color: activeSection === link.href.substring(1)
                                                ? "primary.contrastText"
                                                : "text.primary",
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Container>
            </Drawer>
        </>
    );
}
