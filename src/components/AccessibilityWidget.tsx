"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import Backdrop from "@mui/material/Backdrop";
import {
    Accessibility,
    X,
    ZoomIn,
    ZoomOut,
    Contrast,
    MousePointer2,
    Pause,
    RotateCcw,
    Type
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

    const applySettings = useCallback((newSettings: AccessibilityState) => {
        const html = document.documentElement;
        html.style.fontSize = `${newSettings.fontSize}%`;

        if (newSettings.highContrast) html.classList.add("high-contrast");
        else html.classList.remove("high-contrast");

        if (newSettings.highlightLinks) html.classList.add("highlight-links");
        else html.classList.remove("highlight-links");

        if (newSettings.pauseAnimations) html.classList.add("pause-animations");
        else html.classList.remove("pause-animations");

        if (newSettings.largePointer) html.classList.add("large-pointer");
        else html.classList.remove("large-pointer");
    }, []);

    useEffect(() => {
        applySettings(settings);
    }, [settings, applySettings]);

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
        if (settings.fontSize < 150) updateSetting("fontSize", settings.fontSize + 10);
    };

    const decreaseFontSize = () => {
        if (settings.fontSize > 80) updateSetting("fontSize", settings.fontSize - 10);
    };

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) setIsOpen(false);
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen]);

    return (
        <>
            <motion.div
                style={{ position: "fixed", bottom: 24, left: 24, zIndex: 1200 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
            >
                <Fab
                    color="primary"
                    aria-label="Open accessibility options"
                    onClick={() => setIsOpen(!isOpen)}
                    sx={{
                        width: 56,
                        height: 56,
                        boxShadow: (theme) => theme.shadows[6],
                    }}
                >
                    <Accessibility size={24} />
                </Fab>
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <Backdrop
                            open={isOpen}
                            onClick={() => setIsOpen(false)}
                            sx={{ zIndex: 1100, bgcolor: "rgba(0,0,0,0.2)" }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            style={{
                                position: "fixed",
                                bottom: 96,
                                left: 24,
                                zIndex: 1200,
                                width: 320,
                            }}
                        >
                            <Paper
                                elevation={12}
                                sx={{
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    border: "1px solid",
                                    borderColor: "divider",
                                }}
                            >
                                <Box sx={{ px: 2, py: 1.5, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Stack direction="row" spacing={1} alignItems="center">
                                        <Accessibility size={18} color="#10b981" />
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Accessibility</Typography>
                                    </Stack>
                                    <IconButton size="small" onClick={() => setIsOpen(false)}>
                                        <X size={16} />
                                    </IconButton>
                                </Box>
                                <Divider />
                                <Box sx={{ p: 2 }}>
                                    <Stack spacing={3}>
                                        <Box>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Type size={16} />
                                                    <Typography variant="caption" sx={{ fontWeight: 700 }}>Font Size</Typography>
                                                </Stack>
                                                <Typography variant="caption" sx={{ color: "primary.main", fontWeight: 700 }}>{settings.fontSize}%</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={1}>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={decreaseFontSize}
                                                    disabled={settings.fontSize <= 80}
                                                    startIcon={<ZoomOut size={14} />}
                                                    sx={{ borderRadius: 2 }}
                                                >
                                                    Smaller
                                                </Button>
                                                <Button
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    onClick={increaseFontSize}
                                                    disabled={settings.fontSize >= 150}
                                                    startIcon={<ZoomIn size={14} />}
                                                    sx={{ borderRadius: 2 }}
                                                >
                                                    Larger
                                                </Button>
                                            </Stack>
                                        </Box>

                                        <Stack spacing={1}>
                                            <ToggleItem
                                                icon={<Contrast size={16} />}
                                                label="High Contrast"
                                                checked={settings.highContrast}
                                                onChange={(v) => updateSetting("highContrast", v)}
                                            />
                                            <ToggleItem
                                                icon={<MousePointer2 size={16} />}
                                                label="Highlight Links"
                                                checked={settings.highlightLinks}
                                                onChange={(v) => updateSetting("highlightLinks", v)}
                                            />
                                            <ToggleItem
                                                icon={<Pause size={16} />}
                                                label="Pause Animations"
                                                checked={settings.pauseAnimations}
                                                onChange={(v) => updateSetting("pauseAnimations", v)}
                                            />
                                        </Stack>

                                        <Button
                                            fullWidth
                                            variant="text"
                                            size="small"
                                            onClick={resetSettings}
                                            startIcon={<RotateCcw size={14} />}
                                            sx={{ color: "text.secondary", mt: 1 }}
                                        >
                                            Reset to Default
                                        </Button>
                                    </Stack>
                                </Box>
                            </Paper>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

function ToggleItem({ icon, label, checked, onChange }: { icon: React.ReactNode, label: string, checked: boolean, onChange: (v: boolean) => void }) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
                p: 1.5,
                borderRadius: 2,
                bgcolor: checked ? "primary.light" : "transparent",
                border: "1px solid",
                borderColor: checked ? "primary.main" : "divider",
                transition: "all 0.2s ease",
            }}
        >
            <Stack direction="row" spacing={1} alignItems="center">
                <Box sx={{ color: checked ? "primary.main" : "text.secondary", display: 'flex' }}>{icon}</Box>
                <Typography variant="caption" sx={{ fontWeight: 600, color: checked ? "primary.main" : "text.primary" }}>{label}</Typography>
            </Stack>
            <Switch
                size="small"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                sx={{
                    '& .MuiSwitch-switchBase.Mui-checked': { color: '#10b981' },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#10b981' },
                }}
            />
        </Stack>
    );
}
