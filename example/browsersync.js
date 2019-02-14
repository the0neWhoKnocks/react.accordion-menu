const browserSync = require('browser-sync').create();
const nodemon = require('nodemon');

const port = +process.env.PORT || 8080;

nodemon({
  execMap: {
    js: 'babel-node',
  },
  // this file will have `babel-node` run on it
  script: './example/server.js',
  watch: [
    // WP bundled new code
    './example/dist/manifest.json',
    // The server has updated
    './example/server.js',
  ],
})
  .on('restart', () => {
    console.log('nodemon restarted, refresh browser');
    // TODO - not sure why `setTimeout` is needed now. May be because of
    // synchronous file actions for server (reading the manifest.json).
    setTimeout(() => { browserSync.reload(); }, 1000);
  });

browserSync.init({
  ghostMode: false, // don't mirror interactions in other browsers
  open: false,
  port: port + 1,
  proxy: `localhost:${ port }`,
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: (snippet) => snippet,
    },
  },
});