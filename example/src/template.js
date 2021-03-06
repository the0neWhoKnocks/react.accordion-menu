export default ({
  bundleScripts,
  rootContent,
}) => {
  const noscriptMsg = (!rootContent)
    ? `<noscript>
        <div>
          You need to enable JavaScript to view this example. Or you can clone
          this repo and start up the Development server to view server-side
          rendered content or noscript behavior.
        </div>
      </noscript>`
    : '';
  const _rootContent = (rootContent)
    ? rootContent
    : '<div class="loading-msg">Loading Example</div>';
  const _bundleScripts = (bundleScripts)
    ? bundleScripts.map((script) => `<script type="text/javascript" src="${ script }"></script>`).join('\n')
    : '';
  
  return `
    <html>
    <head>
      <title>Module Demo</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <style>
        *, *::before, *::after {
          box-sizing: border-box;
        }
        body {
          font-family: Helvetica, Arial, sans-serif;
          background: #eee;
          overflow-y: scroll;
        }
        body > noscript {
          font-size: 1.2em;
          font-weight: bold;
          text-align: center;
          padding: 1em;
          background: #005180;
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          transform: translateY(-50%);
          z-index: 10;
        }
        body > noscript > div {
          width: 80%;
          color: #fff;
          text-align: left;
          text-shadow: 0px 2px 2px #000;
          display: inline-block;
        }
        code {
          padding: 0.1em 0.5em;
          border-radius: 0.25em;
          margin-bottom: -1px;
          background: #00000020;
          display: inline-block;
          vertical-align: top;
        }
        input[type="checkbox"] + label {
          cursor: pointer;
          user-select: none;
        }
        p:first-of-type {
          margin-top: 0;
        }
        p:last-child {
          margin-bottom: 0;
        }
        .loading-msg {
          text-align: center;
          padding: 0.5em 0.75em 0.5em 0.75em;
          border-radius: 1em;
          background: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      </style>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react/16.7.0/umd/react.development.js"></script>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.7.0/umd/react-dom.development.js"></script>
    </head>
    <body>
      ${ noscriptMsg }
      <div id="root">${ _rootContent }</div>
      ${ _bundleScripts }
    </body>
    </html>
  `;
};