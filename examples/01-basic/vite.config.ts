import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
		svelte(),
		tailwindcss(),
	],
	// Use this app's tsconfig. The repo root config extends SvelteKit's generated $app/tsconfig.
	tsconfig: './tsconfig.app.json',
})
