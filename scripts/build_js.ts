
await Promise.all([
   Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist/js',
    target: 'browser',
    format: 'iife',
    sourcemap: 'linked',
    naming: 'oci.iife.[ext]'  // .iife.js
  }),

  Bun.build({
    entrypoints: ['./src/oci.mjs'],
    outdir: './dist/js',
    target: 'node',
    format: 'cjs',
    external: ['*'],
    sourcemap: 'linked',
    naming: 'oci.c[ext]'  // .cjs
  }),

  Bun.build({
    entrypoints: ['./src/oci.mjs'],
    outdir: './dist/js',
    target: 'node',
    format: 'esm',
    external: ['*'],
    sourcemap: 'linked',
    naming: 'oci.m[ext]'  // .mjs
  })
]);
