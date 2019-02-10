const browserSync = require('browser-sync').create();
const nodemon = require('nodemon');

const port = +process.env.PORT || 8080;
let firstLoadComplete = false;

nodemon({
  execMap: {
    js: 'babel-node',
  },
  script: './example/server.js',
})
  .on('start', () => {
    if(firstLoadComplete) {
      console.log('nodemon restarted, refresh browser');
      browserSync.reload();
    }
    
    firstLoadComplete = true;
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