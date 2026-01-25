'use client';

import { useMemo } from 'react';
import { useTheme } from 'next-themes';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createAppTheme } from '@/theme';

export default function MUIProvider({ children }: { children: React.ReactNode }) {
    const { resolvedTheme } = useTheme();

    const theme = useMemo(() => {
        return createAppTheme(resolvedTheme === 'light' ? 'light' : 'dark');
    }, [resolvedTheme]);

    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
