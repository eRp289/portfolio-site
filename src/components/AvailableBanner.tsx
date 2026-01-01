"use client";

import { motion } from "framer-motion";

export default function AvailableBanner() {
    return (
        <section className="py-8 bg-white dark:bg-gray-950 border-y border-gray-100 dark:border-gray-800">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex justify-center"
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 glass rounded-full shadow-premium">
                        <motion.span
                            className="w-2.5 h-2.5 bg-emerald-500 rounded-full"
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            aria-hidden="true"
                        />
                        <span className="text-gray-700 dark:text-gray-300 text-base font-medium">
                            Available for opportunities
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
