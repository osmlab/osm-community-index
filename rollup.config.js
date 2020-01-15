import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'index.mjs',
  output: {
    name: 'oci',
    file: 'dist/index.js',
    format: 'umd'
  },
  plugins: [
    resolve(),
    commonjs(),
    json({ indent: '' })
  ]
};
