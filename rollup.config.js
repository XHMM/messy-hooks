import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import pkg from './package.json'

const config = {
  input: './src/index.tsx',
  output: [
    {
      file: pkg.module,
      format: 'esm'
    },
    {
      file: pkg.main,
      format: 'cjs'
    }
  ],
  plugins: [
    typescript(),
    commonjs(),
    nodeResolve()
  ],
  external: ['react', 'react-dom']
}

export default config
