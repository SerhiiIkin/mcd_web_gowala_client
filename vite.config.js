import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@utils": path.resolve(__dirname, "src/utils"),
            "@routes": path.resolve(__dirname, "src/routes"),
            "@pages": path.resolve(__dirname, "src/pages"),
            "@layouts": path.resolve(__dirname, "src/layouts"),
        },
    },
});
