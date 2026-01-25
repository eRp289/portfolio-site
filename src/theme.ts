'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark', // Default to dark as per the current design
        primary: {
            main: '#10b981', // emerald-500
        },
        secondary: {
            main: '#3b82f6', // blue-500
        },
        background: {
            default: '#0a0a0a',
            paper: '#121212',
        },
        text: {
            primary: '#f8fafc',
            secondary: '#94a3b8',
        },
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
                    textTransform: 'none',
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

export default theme;
