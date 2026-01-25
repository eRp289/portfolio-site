'use client';

import { createTheme, PaletteMode } from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
        mode,
        primary: {
            main: '#10b981', // emerald-500
            light: mode === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.1)',
        },
        secondary: {
            main: '#3b82f6', // blue-500
        },
        background: {
            default: mode === 'dark' ? '#0a0a0a' : '#ffffff',
            paper: mode === 'dark' ? '#121212' : '#f9fafb',
        },
        text: {
            primary: mode === 'dark' ? '#f8fafc' : '#111827',
            secondary: mode === 'dark' ? '#94a3b8' : '#6b7280',
        },
        divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },
    typography: {
        fontFamily: 'var(--font-inter), "Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontWeight: 700,
            letterSpacing: '-0.022em',
        },
        h2: {
            fontWeight: 700,
            letterSpacing: '-0.022em',
        },
        h3: {
            fontWeight: 600,
            letterSpacing: '-0.022em',
        },
        body1: {
            lineHeight: 1.6,
            letterSpacing: '-0.011em',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none' as const,
                    fontWeight: 500,
                    borderRadius: 8,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

export const createAppTheme = (mode: PaletteMode) => createTheme(getDesignTokens(mode));

// Default theme for SSR
const theme = createAppTheme('dark');
export default theme;
