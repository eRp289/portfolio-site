"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar } from "lucide-react";

const specializations = [
    { title: "Front-End Development", topics: ["React", "JavaScript", "HTML/CSS", "Next.js"] },
    { title: "Data Analysis", topics: ["Python", "SQL", "Excel", "Visualization"] },
    { title: "Product Management", topics: ["Agile", "User Research", "Roadmapping"] },
    { title: "Information Systems", topics: ["ERP", "CRM", "Databases"] },
    { title: "Business Admin", topics: ["Management", "Marketing", "Finance"] },
];

export default function Education() {
    return (
        <section id="education" className="py-16 sm:py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm uppercase tracking-widest mb-4 block">Education</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        Academic Background
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto mb-12"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                            <div className="p-4 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl shadow-lg shadow-emerald-200">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Ono Academic College
                                    </h3>
                                    <span className="text-xs font-medium px-2.5 py-1 bg-emerald-50 text-emerald-600 rounded-full flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                        In Progress
                                    </span>
                                </div>
                                <p className="text-lg text-gray-700 dark:text-gray-300 font-medium mb-1">
                                    B.A. in Business Administration
                                </p>
                                <p className="text-emerald-600 font-medium mb-4">
                                    Specialization in Information Systems
                                </p>
                                <div className="flex items-center gap-2 text-gray-500 text-sm">
                                    <Calendar className="h-4 w-4" />
                                    November 2023 — March 2026
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center text-gray-500 dark:text-gray-400 font-medium mb-8"
                    >
                        Areas of Study
                    </motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {specializations.map((spec, index) => (
                            <motion.div
                                key={spec.title}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.05 * index }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 hover:shadow-md transition-all duration-300"
                            >
                                <h4 className="text-gray-900 dark:text-white font-semibold mb-3 text-sm">{spec.title}</h4>
                                <div className="flex flex-wrap gap-1.5">
                                    {spec.topics.map((topic) => (
                                        <Badge
                                            key={topic}
                                            variant="secondary"
                                            className="bg-gray-50 text-gray-600 hover:bg-gray-100 text-xs border-0"
                                        >
                                            {topic}
                                        </Badge>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
