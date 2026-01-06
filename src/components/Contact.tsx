"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Linkedin, MapPin, Send, CheckCircle, ExternalLink, AlertCircle, WifiOff, X } from "lucide-react";
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

        // Check if offline
        if (!isOnline()) {
            setErrorType("network");
            setResult("You appear to be offline. Please check your connection and try again.");
            setIsSubmitting(false);
            return;
        }

        const formData = new FormData(event.currentTarget);

        // Save form data in case of error
        const formDataObj: FormData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: formData.get("message") as string,
        };
        saveFormData(FORM_ID, formDataObj);

        // Add API key from environment variable
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

                // Focus on success message for accessibility
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
            // Check if it's a network error
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

                    {/* Value Proposition Highlights */}
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-6 mb-6 border border-emerald-100 dark:border-emerald-800">
                        <p className="text-gray-700 dark:text-gray-300 font-medium mb-3">Why work with me:</p>
                        <ul className="space-y-2 text-left">
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">Trained 1000+ law enforcement officers in AI and emerging technologies</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">Built real-time collaboration systems for police training </span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-emerald-600 dark:text-emerald-400 mt-1">✓</span>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">Specialized in OSINT, digital forensics, and law enforcement tech innovation</span>
                            </li>
                        </ul>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                        Interested in working together? Reach out and I&apos;ll respond within 24 hours.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        Feel free to reach out for collaborations, opportunities, or just to say hello!
                    </p>
                </motion.div>

                {/* Offline Warning */}
                {isOffline && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-5xl mx-auto mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-center gap-3"
                        role="alert"
                    >
                        <WifiOff className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                        <p className="text-amber-800 dark:text-amber-200 text-sm">
                            You&apos;re currently offline. Please check your internet connection.
                        </p>
                    </motion.div>
                )}

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
                                    <div
                                        id="success-message"
                                        className="text-center py-12"
                                        role="status"
                                        aria-live="polite"
                                        tabIndex={-1}
                                    >
                                        <div className="inline-flex p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full mb-4" aria-hidden="true">
                                            <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h4>
                                        <p className="text-gray-600 dark:text-gray-400 mb-6">Thank you for reaching out. I&apos;ll get back to you soon.</p>
                                        <Button
                                            onClick={dismissSuccess}
                                            variant="outline"
                                            className="mt-4"
                                        >
                                            <X className="mr-2 h-4 w-4" aria-hidden="true" />
                                            Dismiss
                                        </Button>
                                    </div>
                                ) : (
                                    <form id={FORM_ID} onSubmit={handleSubmit} className="space-y-5">
                                        {result && errorType && (
                                            <div
                                                className={`p-4 border rounded-lg flex items-center gap-3 ${errorType === "network"
                                                        ? "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                                                        : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                                                    }`}
                                                role="alert"
                                                aria-live="assertive"
                                            >
                                                {errorType === "network" ? (
                                                    <WifiOff className="h-5 w-5 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                                                ) : (
                                                    <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400" aria-hidden="true" />
                                                )}
                                                <p className={`text-sm ${errorType === "network"
                                                        ? "text-amber-800 dark:text-amber-200"
                                                        : "text-red-700 dark:text-red-300"
                                                    }`}>
                                                    {result}
                                                </p>
                                            </div>
                                        )}

                                        {/* Honeypot field for bot protection */}
                                        <input type="text" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

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
                                            disabled={isSubmitting || isOffline}
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
