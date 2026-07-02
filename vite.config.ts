import { defineConfig } from "vite";

export default defineConfig({
  esbuild: {
    tsconfigRaw: JSON.stringify({
      compilerOptions: {
        experimentalDecorators: true,
        useDefineForClassFields: false,
        target: "es2021",
      },
    }),
  },
  build: {
    lib: {
      entry: "src/shopping-list-card.ts",
      formats: ["es"],
      fileName: () => "ha-shopping-list-card.js",
    },
    outDir: "dist",
    emptyOutDir: false,
    target: "es2021",
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: "/dev/",
  },
});
