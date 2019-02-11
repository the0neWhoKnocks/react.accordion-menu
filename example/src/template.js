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
      background: #ff4800;
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      z-index: 10;
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
  <noscript>
    You need to enable JavaScript to view this example.
  </noscript>
  <div id="root">
    <div class="loading-msg">
      Loading Example
    </div>
  </div>
</body>
</html>
