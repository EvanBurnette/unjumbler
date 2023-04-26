import { sveltekit } from '@sveltejs/kit/vite';
import { comlink } from 'vite-plugin-comlink';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), comlink()],
	worker: {
		plugins: [comlink()]
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
