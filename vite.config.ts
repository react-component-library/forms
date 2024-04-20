import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), dts({ include: ['lib'] }), libInjectCss()],
    build: {
        lib: {
            entry: [
                resolve(__dirname, 'lib/index.ts'),
                // resolve(__dirname, 'lib/hooks/useControlledState/index.ts'),
                // resolve(__dirname, 'lib/hooks/useDialog/index.ts'),
            ],
            formats: ['es'],
            name: '@react-component-library/forms',
            fileName: 'index',
        },
        copyPublicDir: false,
        sourcemap: true,
        rollupOptions: {
            external: ['react', 'react-dom', 'react/jsx-runtime'],
            output: {
                preserveModules: true,
                preserveModulesRoot: 'lib',
                entryFileNames: ({ name: fileName }) => {
                    return `${fileName}.js`;
                },
                // assetFileNames: 'assets/[name]-[hash][extname]',
            },
        },
    },
});
