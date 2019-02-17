import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { node } from 'prop-types';

/* eslint-disable-next-line */
const NoScript = ({ children }) => (
  <noscript dangerouslySetInnerHTML={{
    __html: renderToStaticMarkup(children),
  }} />
);

NoScript.propTypes = {
  children: node,
};

export default NoScript;