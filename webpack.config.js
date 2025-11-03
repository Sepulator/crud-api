import { resolve as _resolve } from 'path';
import nodeExternals from 'webpack-node-externals';

export const mode = 'production';
export const entry = './src/server.ts';
export const target = 'node';
export const externals = [nodeExternals()];

export const module = {
  rules: [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    },
  ],
};

export const resolve = {
  extensions: ['.ts', '.js'],
  alias: {
    '@': _resolve(__dirname, 'src'),
    '@controller': _resolve(__dirname, 'src/controller'),
    '@db': _resolve(__dirname, 'src/db'),
    '@services': _resolve(__dirname, 'src/services'),
    '@types': _resolve(__dirname, 'src/types'),
  },
};

export const output = {
  filename: 'bundle.js',
  path: _resolve(__dirname, 'dist'),
};
