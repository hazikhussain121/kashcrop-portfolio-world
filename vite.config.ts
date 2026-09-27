import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
export default defineConfig({plugins:[reactRouter(),tsconfigPaths({projects:['./tsconfig.json']})],server:{host:'127.0.0.1'},build:{sourcemap:false}});
