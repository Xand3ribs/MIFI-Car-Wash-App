import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Raises the warning limit to 1000 kB
  },
  // server: {
  //   watch: {
  //     usePolling: true,
  //     interval: 10,
  //   },
  // },
  // base: '/MIFI-Car-Wash-App/',
});