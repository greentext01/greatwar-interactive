import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), visualizer() as PluginOption, ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          quill: ["quill"],
          firebase: ["@firebase/app", "@firebase/auth"],
          firestore: ["@firebase/firestore"],
        }
      }
    }
  }
});
