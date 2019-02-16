{
  // Settings used for building npm distributable module
  // https://babeljs.io/docs/en/6.26.3/babel-preset-env
  env: {
    cjs: {
      plugins: [
        ['webpack-alias', {
          config: './webpack.config.js',
        }],
        'emotion',
      ],
      presets: [
        ['env', {
          modules: 'commonjs',
          targets: {
            node: '8.9.1',
          },
        }],
        'react',
      ],
    },
    esm: {
      plugins: [
        'emotion',
      ],
      presets: [
        ['env', {
          modules: false,
        }],
        'react',
      ],
    },
  }
}
