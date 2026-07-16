import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default {
  input: 'src/midea-washer-card.js',
  output: {
    file: 'dist/midea-washer-card.js',
    format: 'es',
    inlineDynamicImports: true,
  },
  plugins: [
    resolve(),
    terser(),
  ],
};
