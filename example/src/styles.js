import { css } from 'emotion';

export default css`
  ul {
    max-height: 12em;
    overflow: auto;
    padding-left: 1.25em;
    margin: 0;
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
