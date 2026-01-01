"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Briefcase, GraduationCap, Shield, ArrowUpRight } from "lucide-react";

const highlights = [
    {
        icon: Shield,
        title: "Cybersecurity",
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
    {
        icon: GraduationCap,
        title: "Education",
        description: "Business Admin & Information Systems",
    },
];


export default function About() {
    return (
        <section id="about" className="py-16 sm:py-20 md:py-28 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto text-center mb-20"
                >
                    <span className="text-emerald-600 font-medium text-sm uppercase tracking-widest mb-4 block">About</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Bridging Technology & Innovation
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                        Motivated and detail-oriented tech professional with hands-on
                        experience in police IT systems, instructional support, and
                        cybersecurity. Passionate about applying technical and
                        analytical skills to solve real-world challenges.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {highlights.map((item, index) => {
                        return (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * index, type: "spring", stiffness: 100 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <Card className={`bg-white dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-600 shadow-premium hover-lift transition-premium h-full cursor-pointer`}>
                                    <CardContent className="p-6">
                                        <div className="inline-flex p-3.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl mb-4 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                                            <item.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <h4 className="text-gray-900 dark:text-white font-semibold mb-2">{item.title}</h4>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                            <ArrowUpRight className="h-4 w-4 text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
