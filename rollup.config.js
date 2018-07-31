import json from 'rollup-plugin-json';

export default {
    input: 'index.mjs',
    output: {
        name: 'oci',
        file: 'dist/index.js',
        format: 'umd'
    },
    plugins: [
        json({ indent: '' })
    ]
};
