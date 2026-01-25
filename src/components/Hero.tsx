"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import { debounce } from "@/lib/utils";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";

const socialLinks = [
  { icon: Mail, href: "mailto:yehuda@ypinchuck.com", label: "Send email to Yehuda", external: false },
  { icon: Linkedin, href: "https://www.linkedin.com/in/yehudap", label: "View LinkedIn profile", external: true },
  { icon: Github, href: "https://github.com/eRp289", label: "View GitHub profile", external: true },
] as const;

export default function Hero() {
  const muiTheme = useTheme();
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    const debouncedResize = debounce(checkMobile, 300);
    window.addEventListener("resize", debouncedResize);

    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  // Removed scroll-based parallax effects to keep content visible on all screens

  return (
    <Box
      component="section"
      ref={containerRef}
      id="home"
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        pt: { xs: 10, sm: 12 },
      }}
      aria-label="Introduction"
    >
      {/* Background with animation */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: -1,
        }}
        className="animate-gradient"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: (theme) =>
              theme.palette.mode === "dark"
                ? "linear-gradient(135deg, #0a192f 0%, #020617 50%, #064e3b 100%)"
                : "linear-gradient(135deg, #f9fafb 0%, #ffffff 50%, #ecfdf5 100%)",
          }}
        />
      </motion.div>

      {/* Subtle radial overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.12), transparent)"
              : "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(16,185,129,0.08), transparent)",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        style={{
          position: "absolute",
          top: "20%",
          right: "25%",
          width: 256,
          height: 256,
          borderRadius: "50%",
          background: muiTheme.palette.mode === "dark" ? "rgba(16, 185, 129, 0.2)" : "rgba(52, 211, 153, 0.3)",
          filter: "blur(64px)",
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
          x: [0, 30, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{
          position: "absolute",
          bottom: "32%",
          left: "20%",
          width: 288,
          height: 288,
          borderRadius: "50%",
          background: muiTheme.palette.mode === "dark" ? "rgba(16, 185, 129, 0.15)" : "rgba(110, 231, 183, 0.25)",
          filter: "blur(64px)",
          zIndex: 0,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.35, 0.55, 0.35],
          x: [0, -25, 0],
          y: [0, 25, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <motion.div
        style={{
          position: "relative",
          zIndex: 10,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={{ xs: 6, lg: 10 }}
            alignItems="center"
            justifyContent="center"
          >
            {/* Avatar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 100 }}
              style={{ position: "relative" }}
            >
              <Box
                sx={{
                  position: "relative",
                  width: { xs: 128, sm: 160, md: 192, lg: 224 },
                  height: { xs: 128, sm: 160, md: 192, lg: 224 },
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "50%",
                    background: "linear-gradient(to bottom right, #34d399, #059669)",
                    filter: "blur(48px)",
                    opacity: 0.2,
                  }}
                  animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.25, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid",
                    borderColor: muiTheme.palette.mode === "dark" ? "rgba(31, 41, 55, 0.8)" : "rgba(255, 255, 255, 0.8)",
                    boxShadow: (theme) => theme.shadows[10],
                  }}
                >
                  <Image
                    src="/images/profile.jpg"
                    alt="Yehuda Pinchuck"
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </Box>
                <motion.div
                  style={{
                    position: "absolute",
                    bottom: -8,
                    right: -8,
                    width: 48,
                    height: 48,
                    background: "#10b981",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: muiTheme.shadows[4],
                  }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span style={{ fontSize: "1.25rem" }}>👋</span>
                </motion.div>
              </Box>
            </motion.div>

            {/* Content */}
            <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Yehuda
                  <Typography
                    component="span"
                    variant="inherit"
                    sx={{
                      display: "block",
                      color: "primary.main",
                    }}
                  >
                    Pinchuck
                  </Typography>
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: { xs: "center", lg: "flex-start" },
                    gap: 2,
                    mb: 3,
                  }}
                >
                  <Box sx={{ height: 1, width: 32, background: "linear-gradient(to right, transparent, #10b981, transparent)" }} />
                  <Typography
                    variant="overline"
                    sx={{
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      color: "text.secondary",
                      letterSpacing: "0.1em",
                    }}
                  >
                    Tech • Innovation • AI
                  </Typography>
                  <Box sx={{ height: 1, width: 32, background: "linear-gradient(to right, transparent, #10b981, transparent)" }} />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: "text.secondary",
                    mb: 5,
                    maxWidth: 400,
                    mx: { xs: "auto", lg: 0 },
                  }}
                >
                  Building secure, innovative solutions at the intersection of
                  technology and law enforcement.
                </Typography>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={2}
                  justifyContent={{ xs: "center", lg: "flex-start" }}
                  alignItems="center"
                >
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    endIcon={<ChevronRight />}
                    sx={{
                      borderRadius: 10,
                      px: 4,
                      py: 1.5,
                      bgcolor: (theme) => theme.palette.mode === "dark" ? "#fff" : "#111827",
                      color: (theme) => theme.palette.mode === "dark" ? "#111827" : "#fff",
                      "&:hover": {
                        bgcolor: (theme) => theme.palette.mode === "dark" ? "#f3f4f6" : "#1f2937",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    Get in Touch
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                    sx={{
                      borderRadius: 10,
                      px: 4,
                      py: 1.5,
                      borderColor: "divider",
                      color: "text.primary",
                      backdropFilter: "blur(8px)",
                      bgcolor: "rgba(255, 255, 255, 0.05)",
                      "&:hover": {
                        borderColor: "text.primary",
                        bgcolor: "rgba(255, 255, 255, 0.1)",
                        transform: "translateY(-1px)",
                      },
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      textTransform: "none",
                      fontSize: "1rem",
                    }}
                  >
                    View Projects
                  </Button>
                </Stack>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  justifyContent={{ xs: "center", lg: "flex-start" }}
                  mt={5}
                >
                  {socialLinks.map(({ icon: Icon, href, label, external }) => (
                    <motion.div key={label} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <IconButton
                        component={Link}
                        href={href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        aria-label={label}
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          border: "1px solid",
                          borderColor: "divider",
                          backdropFilter: "blur(8px)",
                          bgcolor: "rgba(255, 255, 255, 0.05)",
                          color: "text.secondary",
                          "&:hover": {
                            color: "primary.main",
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        <Icon size={20} />
                      </IconButton>
                    </motion.div>
                  ))}
                </Stack>
              </motion.div>
            </Box>
          </Stack>
        </Container>
      </motion.div>
    </Box>
  );
}
