"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Accessibility,
    X,
    ZoomIn,
    ZoomOut,
    Contrast,
    MousePointer2,
    Pause,
    RotateCcw,
    Type,
    LucideIcon
} from "lucide-react";

interface AccessibilityState {
    fontSize: number;
    highContrast: boolean;
    highlightLinks: boolean;
    pauseAnimations: boolean;
    largePointer: boolean;
}

const defaultState: AccessibilityState = {
    fontSize: 100,
    highContrast: false,
    highlightLinks: false,
    pauseAnimations: false,
    largePointer: false,
};

export default function AccessibilityWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState<AccessibilityState>(() => {
        if (typeof window === 'undefined') return defaultState;
        const saved = localStorage.getItem("accessibility-settings");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return defaultState;
            }
        }
        return defaultState;
    });

    // Apply settings to document
    const applySettings = useCallback((newSettings: AccessibilityState) => {
        const html = document.documentElement;

        // Font size
        html.style.fontSize = `${newSettings.fontSize}%`;

        // High contrast
        if (newSettings.highContrast) {
            html.classList.add("high-contrast");
        } else {
            html.classList.remove("high-contrast");
        }

        // Highlight links
        if (newSettings.highlightLinks) {
            html.classList.add("highlight-links");
        } else {
            html.classList.remove("highlight-links");
        }

        // Pause animations
        if (newSettings.pauseAnimations) {
            html.classList.add("pause-animations");
        } else {
            html.classList.remove("pause-animations");
        }

        // Large pointer
        if (newSettings.largePointer) {
            html.classList.add("large-pointer");
        } else {
            html.classList.remove("large-pointer");
        }
    }, []);

    // Apply settings on mount
    useEffect(() => {
        applySettings(settings);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updateSetting = useCallback(<K extends keyof AccessibilityState>(
        key: K,
        value: AccessibilityState[K]
    ) => {
        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        applySettings(newSettings);
        localStorage.setItem("accessibility-settings", JSON.stringify(newSettings));
    }, [settings, applySettings]);

    const resetSettings = useCallback(() => {
        setSettings(defaultState);
        applySettings(defaultState);
        localStorage.removeItem("accessibility-settings");
    }, [applySettings]);

    const increaseFontSize = () => {
        if (settings.fontSize < 150) {
            updateSetting("fontSize", settings.fontSize + 10);
        }
    };

    const decreaseFontSize = () => {
        if (settings.fontSize > 80) {
            updateSetting("fontSize", settings.fontSize - 10);
        }
    };

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    return (
        <>
            {/* Floating Accessibility Button */}
            <motion.div
                className="fixed bottom-6 left-6 z-50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                <Button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-14 h-14 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-600/30 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="Open accessibility options"
                    aria-expanded={isOpen}
                    aria-controls="accessibility-panel"
                >
                    <Accessibility className="h-6 w-6" aria-hidden="true" />
                </Button>
            </motion.div>

            {/* Accessibility Panel */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/20 z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            aria-hidden="true"
                        />

                        {/* Panel */}
                        <motion.div
                            id="accessibility-panel"
                            className="fixed bottom-24 left-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            role="dialog"
                            aria-modal="true"
                            aria-label="Accessibility options"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <Accessibility className="h-5 w-5 text-emerald-600" aria-hidden="true" />
                                    <h2 className="font-semibold text-gray-900">Accessibility</h2>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setIsOpen(false)}
                                    className="h-8 w-8 text-gray-500 hover:text-gray-700"
                                    aria-label="Close accessibility options"
                                >
                                    <X className="h-4 w-4" aria-hidden="true" />
                                </Button>
                            </div>

                            {/* Options */}
                            <div className="p-4 space-y-4">
                                {/* Font Size */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Type className="h-4 w-4" aria-hidden="true" />
                                            Font Size
                                        </span>
                                        <span className="text-sm text-gray-500">{settings.fontSize}%</span>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={decreaseFontSize}
                                            disabled={settings.fontSize <= 80}
                                            className="flex-1"
                                            aria-label="Decrease font size"
                                        >
                                            <ZoomOut className="h-4 w-4 mr-1" aria-hidden="true" />
                                            Smaller
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={increaseFontSize}
                                            disabled={settings.fontSize >= 150}
                                            className="flex-1"
                                            aria-label="Increase font size"
                                        >
                                            <ZoomIn className="h-4 w-4 mr-1" aria-hidden="true" />
                                            Larger
                                        </Button>
                                    </div>
                                </div>

                                {/* Toggle Options */}
                                <div className="space-y-2">
                                    <ToggleOption
                                        icon={Contrast}
                                        label="High Contrast"
                                        checked={settings.highContrast}
                                        onChange={(v) => updateSetting("highContrast", v)}
                                    />
                                    <ToggleOption
                                        icon={MousePointer2}
                                        label="Highlight Links"
                                        checked={settings.highlightLinks}
                                        onChange={(v) => updateSetting("highlightLinks", v)}
                                    />
                                    <ToggleOption
                                        icon={Pause}
                                        label="Pause Animations"
                                        checked={settings.pauseAnimations}
                                        onChange={(v) => updateSetting("pauseAnimations", v)}
                                    />
                                </div>

                                {/* Reset */}
                                <Button
                                    variant="outline"
                                    onClick={resetSettings}
                                    className="w-full text-gray-600"
                                    aria-label="Reset all accessibility settings to default"
                                >
                                    <RotateCcw className="h-4 w-4 mr-2" aria-hidden="true" />
                                    Reset to Default
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

// Toggle Option Component
function ToggleOption({
    icon: Icon,
    label,
    checked,
    onChange
}: {
    icon: LucideIcon;
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <button
            onClick={() => onChange(!checked)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${checked
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                }`}
            role="switch"
            aria-checked={checked}
            aria-label={label}
        >
            <span className="flex items-center gap-2">
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span className="text-sm font-medium">{label}</span>
            </span>
            <span
                className={`w-10 h-6 rounded-full relative transition-colors ${checked ? "bg-emerald-500" : "bg-gray-300"
                    }`}
                aria-hidden="true"
            >
                <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "left-5" : "left-1"
                        }`}
                />
            </span>
        </button>
    );
}
