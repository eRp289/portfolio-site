"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase } from "lucide-react";

const experiences = [
    {
        title: "Innovation & AI Specialist",
        company: "Israeli Police • Digital Policing Branch",
        period: "Aug 2023 - Present",
        description: "Leading initiatives to introduce innovation and AI within law enforcement. Delivering presentations on AI applications and conducting research on emerging technologies for training enhancement.",
        tags: ["AI", "Innovation", "Education"],
        current: true,
    },
    {
        title: "Cyber Education Support",
        company: "Israeli Police • Digital Forensics Division",
        period: "Aug 2023 - Present",
        description: "Designing training materials on OSINT, digital forensics, and internet crime. Developing practical exercises to enhance operational readiness in digital policing.",
        tags: ["OSINT", "Digital Forensics", "Training"],
        current: true,
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
        <section id="experience" className="py-16 sm:py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center mb-16"
                >
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm uppercase tracking-widest mb-4 block">Experience</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                        Where I&apos;ve Worked
                    </h2>
                </motion.div>

                <div className="max-w-3xl mx-auto">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            className="relative pl-8 pb-12 last:pb-0"
                        >
                            {/* Timeline line */}
                            {index !== experiences.length - 1 && (
                                <div className="absolute left-[11px] top-6 bottom-0 w-px bg-gray-200 dark:bg-gray-700" />
                            )}

                            {/* Timeline dot */}
                            <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-gray-900 shadow-sm ${exp.current ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
                                }`} />

                            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg hover:border-gray-200 dark:hover:border-gray-600 transition-all duration-300">
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <span className={`text-sm font-medium px-3 py-1 rounded-full ${exp.current
                                        ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                        }`}>
                                        {exp.period}
                                    </span>
                                    {exp.current && (
                                        <span className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                            Current
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                                    {exp.title}
                                </h3>

                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center gap-1">
                                    <Briefcase className="h-3.5 w-3.5" />
                                    {exp.company}
                                </p>

                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                    {exp.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {exp.tags.map((tag) => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="bg-gray-100 text-gray-600 hover:bg-gray-200 border-0 text-xs"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
