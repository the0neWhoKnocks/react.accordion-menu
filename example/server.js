/* eslint-disable require-jsdoc-except/require-jsdoc */

const http = require('http');
const React = require('react');
const {
  renderToStaticMarkup,
  // renderToString,
} = require('react-dom/server');

const port = +process.env.PORT || 3001;

const App = (props) => (
  <div>Hello World!!</div>
);

const handleRootRequest = (res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  // renderToString(App(props))
  const html = renderToStaticMarkup(
    <body>
      <App />
    </body>
  );

  res.end(html);
};

const handle404 = (res) => {
  res.statusCode = 404;
  res.end();
};

http.createServer((req, res) => {
  console.log('--', req.url);
  
  switch(req.url){
    case '/':
      handleRootRequest(res);
      break;
    
    default:
      console.log('Unhandled request:', req.url);
      handle404(res);
  }

  // if (req.url === '/bundle.js') {
  // 
  //   res.setHeader('Content-Type', 'text/javascript')
  // 
  //   // If we've already bundled, send the cached result
  //   if (BUNDLE != null) {
  //     return res.end(BUNDLE)
  //   }
  // 
  //   // Otherwise, invoke browserify to package up browser.js and everything it requires.
  //   // We also use literalify to transform our `require` statements for React
  //   // so that it uses the global variable (from the CDN JS file) instead of
  //   // bundling it up with everything else
  //   browserify()
  //     .add('./browser.js')
  //     .transform(literalify.configure({
  //       'react': 'window.React',
  //       'react-dom': 'window.ReactDOM',
  //       'react-dom-factories': 'window.ReactDOMFactories',
  //       'create-react-class': 'window.createReactClass',
  //     }))
  //     .bundle(function(err, buf) {
  //       // Now we can cache the result and serve this up each time
  //       BUNDLE = buf
  //       res.statusCode = err ? 500 : 200
  //       res.end(err ? err.message : BUNDLE)
  //     })
  // }
})
  .listen(port, (err) => {
    if(err) throw err;
    console.log(`Server running at http://localhost:${ port }/`);
  });


// // A utility function to safely escape JSON for embedding in a <script> tag
// function safeStringify(obj) {
//   return JSON.stringify(obj)
//     .replace(/<\/(script)/ig, '<\\/$1')
//     .replace(/<!--/g, '<\\!--')
//     .replace(/\u2028/g, '\\u2028') // Only necessary if interpreting as JS, which we do
//     .replace(/\u2029/g, '\\u2029') // Ditto
// }