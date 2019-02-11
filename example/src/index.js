import React from 'react';
import { render } from 'react-dom';
import App, { DEBUG_NAMESPACE } from './App';

// if(process.env.NODE_ENV !== 'production'){
//   localStorage.setItem('debug', `${ DEBUG_NAMESPACE }:*'`);
// }
localStorage.setItem('debug', `${ DEBUG_NAMESPACE }:*`);

render(<App />, document.getElementById('root'));
