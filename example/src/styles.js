import { css } from 'emotion';

export default css`
  ul {
    max-height: 12em;
    overflow: auto;
    padding-left: 1.25em;
    margin: 0;
  }
  
  .note {
    padding-left: 3.5em;
    position: relative;
    
    &::before {
      content: 'Note';
      color: #007e92;
      font-family: cursive;
      font-weight: bold;
      padding: 0.25em 0.5em;
      background: #ffe3c0;
      background-image: linear-gradient(rgba(0, 0, 0, 0.1), transparent 60%);
      display: block;
      position: absolute;
      top: -0.25em;
      left: 0;
      transform: rotate(-6deg);
      box-shadow: -2px 5px 8px -2px rgba(0,0,0,0.25);
    }
  }
  
  .example-nav {
    padding: 0.5em;
    background: #eee;
    margin-bottom: 0.5em;
    text-align: right;
  }
  
  &.no--height ul {
    max-height: none;
  }
`;
