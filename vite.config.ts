import path from 'node:path';

import svgr from '@svgr/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss(), svgr()],
	resolve: {
		alias: [
			{ find: '@', replacement: path.resolve(__dirname, './src') },
			{ find: '@assets', replacement: path.resolve(__dirname, './src/assets') },
			{ find: '@components', replacement: path.resolve(__dirname, './src/components') },
			{ find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
			{ find: '@services', replacement: path.resolve(__dirname, './src/services') },
			{ find: '@utils', replacement: path.resolve(__dirname, './src/utils') },
			{ find: '@hooks', replacement: path.resolve(__dirname, './src/hooks') },
			{ find: '@redux', replacement: path.resolve(__dirname, './src/redux') },
			{ find: '@styles', replacement: path.resolve(__dirname, './src/styles') },
			{ find: '@types', replacement: path.resolve(__dirname, './src/types') },
			{ find: '@language', replacement: path.resolve(__dirname, './src/language') },
			{ find: '@lib', replacement: path.resolve(__dirname, './src/lib') },
		],
	},
	server: {
		host: true,
		port: 3000,
	},
});
