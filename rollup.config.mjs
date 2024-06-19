import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';

export default {
	input: 'src/cookie-consent.js',
	output: {
		file: 'dist/cookie-consent.js',
		format: 'iife',
    name: 'KBCC'
	},
  plugins: [
    postcss({
      extensions: [ '.css' ],
    }),
    nodeResolve(),
    json()
  ]
};