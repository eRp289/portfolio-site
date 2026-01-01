"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
    Code2,
    Database,
    Shield,
    Settings
} from "lucide-react";

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
        title: "Cybersecurity",
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
    return (
        <section id="skills" className="py-16 sm:py-20 md:py-28 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm uppercase tracking-widest mb-4 block">Skills</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        What I Work With
                    </h2>
                </motion.div>

                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                        {skillCategories.map((category, index) => {
                            return (
                                <motion.div
                                    key={category.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", stiffness: 100 }}
                                    viewport={{ once: true }}
                                    className="bg-white dark:bg-gray-800/50 rounded-2xl p-6 md:p-8 shadow-premium hover-lift transition-premium border border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-600"
                                >
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                                            <category.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {category.title}
                                        </h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant="secondary"
                                                className="bg-emerald-50/80 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 border-0 py-2 px-4 text-sm font-medium transition-premium cursor-default hover-lift-sm"
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
