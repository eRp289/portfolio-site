"use client";

import { motion } from "framer-motion";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function AvailableBanner() {
    return (
        <Box
            component="section"
            sx={{
                py: 4,
                bgcolor: "background.default",
                borderY: "1px solid",
                borderColor: "divider",
            }}
        >
            <Container maxWidth="lg">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 1.5,
                            px: 3,
                            py: 1.5,
                            borderRadius: "100px",
                            border: "1px solid",
                            borderColor: "divider",
                            bgcolor: "background.paper",
                            boxShadow: (theme) => theme.shadows[1],
                        }}
                    >
                        <motion.span
                            style={{
                                width: 10,
                                height: 10,
                                backgroundColor: "#10b981",
                                borderRadius: "50%",
                            }}
                            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            aria-hidden="true"
                        />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: "text.primary" }}>
                            Available for opportunities
                        </Typography>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
}
