"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Mail, Linkedin, Github } from "lucide-react";

const socialLinks = [
    { icon: Mail, href: "mailto:yehuda@ypinchuck.com", label: "Email Yehuda" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/yehudap", label: "LinkedIn Profile" },
    { icon: Github, href: "https://github.com/eRp289", label: "GitHub Profile" },
] as const;

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-50 py-16 border-t border-gray-100" role="contentinfo">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center md:text-left"
                    >
                        <a
                            href="#home"
                            className="text-2xl font-bold text-gray-900 hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg px-2 py-1"
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            aria-label="Back to top"
                        >
                            Yehuda Pinchuck
                        </a>
                        <p className="text-gray-500 text-sm mt-2">
                            Tech Professional • AI
                        </p>
                    </motion.div>

                    <motion.nav
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        aria-label="Social media links"
                    >
                        <ul className="flex gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <li key={label}>
                                    <a
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-md transition-all duration-300 inline-block focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                        aria-label={label}
                                    >
                                        <Icon className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.nav>
                </div>

                <Separator className="bg-gray-200 my-10" aria-hidden="true" />

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <p className="text-gray-400 text-sm">
                        © {currentYear} Yehuda Pinchuck
                    </p>
                </motion.div>
            </div>
        </footer>
    );
}
