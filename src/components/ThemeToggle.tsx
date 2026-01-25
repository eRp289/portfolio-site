"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

export function ThemeToggle() {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <IconButton size="small" sx={{ width: 36, height: 36 }} disabled>
                <Sun size={16} />
            </IconButton>
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <IconButton
            size="small"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            sx={{
                width: 36,
                height: 36,
                position: "relative",
                overflow: "hidden",
                bgcolor: isDark ? "rgba(31, 41, 55, 1)" : "rgba(243, 244, 246, 1)", // gray-800 : gray-100
                "&:hover": {
                    bgcolor: isDark ? "rgba(55, 65, 81, 1)" : "rgba(229, 231, 235, 1)", // gray-700 : gray-200
                },
                borderRadius: "50%",
            }}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? 180 : 0,
                    scale: isDark ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ position: "absolute", display: "flex" }}
            >
                <Sun size={16} className="text-amber-500" />
            </motion.div>
            <motion.div
                initial={false}
                animate={{
                    rotate: isDark ? 0 : -180,
                    scale: isDark ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ position: "absolute", display: "flex" }}
            >
                <Moon size={16} className="text-blue-400" />
            </motion.div>
        </IconButton>
    );
}
