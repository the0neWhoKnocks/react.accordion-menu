/* eslint-disable require-jsdoc-except/require-jsdoc */

const http = require('http');
const { parse } = require('path');
const browserSync = require('browser-sync').create();
const nodemon = require('nodemon');

const port = +process.env.PORT || 8080;

const checkServer = () => new Promise((rootResolve, rootReject) => {
  let count = 0;
  const check = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      http.get(
        `http://localhost:${ port }`,
        (res) => resolve()
      ).on('error', (err) => reject());
    }, 1000);
  });
  const handleError = () => {
    if(count < 3){
      ping();
      count++;
    }
    else{
      rootReject();
    }
  };
  const handleSuccess = () => { rootResolve(); };
  const ping = () => {
    check()
      .then(handleSuccess)
      .catch(handleError);
  };
  
  ping();
});

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
  .on('restart', (files) => {
    const msg = (files.length > 1) ? 'these files' : 'this file';
    console.log(
      `Nodemon restarted because ${ msg } changed:\n`,
      files.map((filePath) => ` • "${ parse(filePath).base }"`).join('\n')
    );
    
    checkServer()
      .then(() => {
        console.log('Server has fully started');
        browserSync.reload();
      })
      .catch(() => {
        console.log("Couldn't detect the server, a manual reload may be required");
      });
  });

// https://www.browsersync.io/docs/options
browserSync.init({
  ghostMode: false, // don't mirror interactions in other browsers
  // logLevel: 'debug',
  open: false,
  port: port + 1,
  proxy: `localhost:${ port }`,
  snippetOptions: {
    rule: {
      match: /<\/body>/i,
      fn: (snippet) => snippet,
    },
  },
  ui: {
    port: port + 2,
  },
});