import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 3000,
		proxy: {
			"/api": {
				target: "http://vercel-deployment-server-trial.vercel.app",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});