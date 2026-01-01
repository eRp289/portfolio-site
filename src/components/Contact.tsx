"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, MapPin, Send, CheckCircle, ExternalLink, AlertCircle } from "lucide-react";

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

export default function Contact() {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("");

        const formData = new FormData(event.currentTarget);
        formData.append("access_key", "55aa0edc-fa6b-4702-a5b7-0054551d9393");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                setIsSubmitted(true);
                setResult("Success!");
                (event.target as HTMLFormElement).reset();
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                setResult("Error sending message. Please try again.");
            }
        } catch {
            setResult("Error sending message. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="py-16 sm:py-20 md:py-24 bg-gray-50 dark:bg-gray-900" aria-labelledby="contact-heading">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium text-sm uppercase tracking-widest mb-4 block">Contact</span>
                    <h2 id="contact-heading" className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Let&apos;s Connect
                    </h2>
                    <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full mb-6" aria-hidden="true" />
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                        Interested in working together? Reach out and I&apos;ll respond within 24 hours.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Feel free to reach out for collaborations, opportunities, or just to say hello!
                    </p>
                </motion.div>

                <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                            Contact Information
                        </h3>
                        <ul className="space-y-4" aria-label="Contact methods">
                            {contactInfo.map((item, index) => (
                                <motion.li
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 * index }}
                                    viewport={{ once: true }}
                                >
                                    {item.href ? (
                                        <a
                                            href={item.href}
                                            target={item.href.startsWith("http") ? "_blank" : undefined}
                                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-premium hover:border-emerald-300 dark:hover:border-emerald-600 hover-lift transition-premium group focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                            aria-label={`${item.label}: ${item.value}`}
                                        >
                                            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors" aria-hidden="true">
                                                <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.label}</p>
                                                <p className="text-gray-900 dark:text-white font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                                    {item.value}
                                                </p>
                                            </div>
                                            <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-emerald-500" aria-hidden="true" />
                                        </a>
                                    ) : (
                                        <div className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-premium">
                                            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg" aria-hidden="true">
                                                <item.icon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 dark:text-gray-400 text-sm">{item.label}</p>
                                                <p className="text-gray-900 dark:text-white font-medium">{item.value}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-premium">
                            <CardContent className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                    Send a Message
                                </h3>

                                {isSubmitted ? (
                                    <div className="text-center py-12" role="status" aria-live="polite">
                                        <div className="inline-flex p-4 bg-emerald-100 rounded-full mb-4" aria-hidden="true">
                                            <CheckCircle className="h-8 w-8 text-emerald-600" />
                                        </div>
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h4>
                                        <p className="text-gray-600">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {result && result.includes("Error") && (
                                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3" role="alert">
                                                <AlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
                                                <p className="text-red-700 text-sm">{result}</p>
                                            </div>
                                        )}

                                        <input type="hidden" name="subject" value="New Contact Form Submission from Portfolio" />

                                        <div>
                                            <label htmlFor="contact-name" className="sr-only">Your Name</label>
                                            <Input
                                                id="contact-name"
                                                name="name"
                                                placeholder="Your Name"
                                                className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-emerald-500 focus-glow transition-premium"
                                                required
                                                autoComplete="name"
                                                maxLength={100}
                                                aria-required="true"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="contact-email" className="sr-only">Your Email</label>
                                            <Input
                                                id="contact-email"
                                                name="email"
                                                type="email"
                                                placeholder="Your Email"
                                                className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-emerald-500 focus-glow transition-premium"
                                                required
                                                autoComplete="email"
                                                maxLength={254}
                                                aria-required="true"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="contact-message" className="sr-only">Your Message</label>
                                            <Textarea
                                                id="contact-message"
                                                name="message"
                                                placeholder="Your Message"
                                                className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-emerald-500 dark:focus:border-emerald-500 focus:ring-emerald-500 focus-glow min-h-[140px] transition-premium"
                                                required
                                                maxLength={1000}
                                                aria-required="true"
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white py-6 text-lg font-medium rounded-xl shadow-premium-lg hover-lift transition-premium focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                                            disabled={isSubmitting}
                                            aria-busy={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                                                    Sending...
                                                </span>
                                            ) : (
                                                <>
                                                    <Send className="mr-2 h-5 w-5" aria-hidden="true" />
                                                    Send Message
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
