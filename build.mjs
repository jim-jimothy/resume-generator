import esbuild from 'esbuild';

const isProduction = process.env.NODE_ENV === 'production';

await esbuild.build({
  entryPoints: ['src/cli/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outfile: 'dist/index.js',
  external: ['playwright', 'commander', 'chalk', 'ora', 'handlebars', 'ajv', 'ajv-formats', 'fs-extra'], // Don't bundle dependencies
  minify: isProduction,
  sourcemap: !isProduction,
  keepNames: true,
  banner: {
    js: '#!/usr/bin/env node',
  },
});

console.log('Build completed successfully!');