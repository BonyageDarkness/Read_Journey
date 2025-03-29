import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/Read_Journey/" : "/",
  plugins: [react()],
  build: {
    sourcemap: true,
  },
});
