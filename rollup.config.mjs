import { nodeResolve } from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
	input: 'src/cookie-consent.js',
  output: [
    {
      file: 'dist/cookie-consent.esm.js',
      format: 'esm', // ES Module for modern usage
    },
    {
      file: 'dist/cookie-consent.umd.js',
      format: 'umd', // UMD for browser usage
      name: 'KbCookieConsent', // Global variable name
    },
  ],
  plugins: [
    postcss({
      extensions: [ '.css' ],
    }),
    nodeResolve()
  ]
};