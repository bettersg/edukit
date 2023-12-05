import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

// https://vitejs.dev/config/
// typing for Vitest config
const vitestConfig: VitestUserConfigInterface = {
  test: {
    includeSource: ["src/**/*.{ts,tsx}"],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/testing/setup/setup.ts'],
  },
};


export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  test: vitestConfig.test
});
