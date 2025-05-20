import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss()
	],
	resolve: {
		alias: {
			'@assets': path.resolve(__dirname, './src/assets'),
			// '@hooks': path.resolve(__dirname, './src/hooks'),
			'@pages': path.resolve(__dirname, './src/pages'),
			// '@styles': path.resolve(__dirname, './src/styles'),
			// '@ui': path.resolve(__dirname, './src/ui'),
			// '@utils': path.resolve(__dirname, './src/utils'),
		}
	},
	server: {
		host: true,
		port: 8080,
	},
});
