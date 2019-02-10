/* eslint-disable require-jsdoc-except/require-jsdoc */

import debug from 'debug';

const COLORS = {
  error: 'red',
  info: 'blue',
  trace: 'lightblue',
  warn: 'orange',
};

export default class Logger {
  constructor(namespace) {
    this.namespace = namespace;
  }
  
  generateMessage(level, ...args) {
    const namespace = `${ this.namespace }:${ level }`;
    const debugInst = debug(namespace);
    
    debugInst.color = COLORS[level];
    
    debugInst(...args);
  }
  
  error(...args) {
    return this.generateMessage('error', ...args);
  }
  
  info(...args) {
    return this.generateMessage('info', ...args);
  }
  
  trace(...args) {
    return this.generateMessage('trace', ...args);
  }
  
  warn(...args) {
    return this.generateMessage('warn', ...args);
  }
}