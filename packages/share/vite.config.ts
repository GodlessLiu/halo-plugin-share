import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
    plugins: [],
    define: {
        "process.env.NODE_ENV": JSON.stringify("production"),
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        outDir: fileURLToPath(new URL("../../src/main/resources/static", import.meta.url)),
        minify: false,
        emptyOutDir: false,
        cssCodeSplit: false,
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            formats: ["iife"],
            name: "Share",
            fileName: (format) => `share-widget.${format}.js`,
        },
        sourcemap: false,
    },
    server: {
        port: 4000,
        proxy: {
            "/actuator": {
                target: "http://localhost:8090",
                changeOrigin: true,
            },
        },
    },
});
