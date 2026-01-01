"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

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

    // Memoized scroll handler for performance
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

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isMobileMenuOpen]);

    const handleNavClick = useCallback((href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.getElementById(href.substring(1));
        element?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <>
            <motion.header
                role="banner"
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "glass-strong shadow-premium border-b border-gray-200/50 dark:border-gray-700/50"
                    : "bg-transparent"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
            >
                <nav aria-label="Main navigation" className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <motion.a
                            href="#home"
                            className="text-xl font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg px-2 py-1"
                            whileHover={{ scale: 1.05 }}
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick("#home");
                            }}
                            aria-label="Yehuda Pinchuck - Home"
                        >
                            YP<span className="text-emerald-600">.</span>
                        </motion.a>

                        {/* Desktop Navigation */}
                        <ul className="hidden md:flex items-center gap-1" role="menubar">
                            {navLinks.map((link) => (
                                <li key={link.name} role="none">
                                    <motion.a
                                        href={link.href}
                                        role="menuitem"
                                        className={`relative text-sm font-medium px-3 py-2 rounded-lg hover-lift-sm transition-premium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 ${activeSection === link.href.substring(1)
                                            ? "text-emerald-600 dark:text-emerald-400"
                                            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                                            }`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(link.href);
                                        }}
                                        aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {link.name}
                                        {activeSection === link.href.substring(1) && (
                                            <motion.div
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full"
                                                layoutId="activeSection"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                    </motion.a>
                                </li>
                            ))}
                        </ul>

                        {/* Theme Toggle and Mobile Menu Button */}
                        <div className="flex items-center gap-2">
                            <ThemeToggle />
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-2 focus:ring-emerald-500"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-expanded={isMobileMenuOpen}
                                aria-controls="mobile-menu"
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            >
                                {isMobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
                            </Button>
                        </div>
                    </div>
                </nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        id="mobile-menu"
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile navigation menu"
                    >
                        <div
                            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                            aria-hidden="true"
                        />
                        <motion.nav
                            className="absolute top-16 left-0 right-0 glass-strong shadow-premium-lg border-b border-gray-200/50 dark:border-gray-700/50"
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            aria-label="Mobile navigation"
                        >
                            <ul className="container mx-auto px-6 py-4 flex flex-col gap-2" role="menu">
                                {navLinks.map((link, index) => (
                                    <motion.li
                                        key={link.name}
                                        role="none"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.05 * index }}
                                    >
                                        <a
                                            href={link.href}
                                            role="menuitem"
                                            className={`block text-base font-medium py-3 px-4 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${activeSection === link.href.substring(1)
                                                ? "text-emerald-600 bg-emerald-50"
                                                : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(link.href);
                                            }}
                                            aria-current={activeSection === link.href.substring(1) ? "page" : undefined}
                                        >
                                            {link.name}
                                        </a>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
