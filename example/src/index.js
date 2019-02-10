/* eslint-disable require-jsdoc-except/require-jsdoc */

import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { string } from 'prop-types';
import AccordionItem, {
  ICON__CHEVRON,
  ICON__NONE,
  ICON__TRIANGLE,
} from '../../src';
import styles from './styles';

const Emoji = ({
  label,
  symbol,
}) => (
  <span
    className="emoji"
    role="img"
    aria-label={(label) ? label : ''}
    aria-hidden={(label) ? 'false' : 'true'}
  >{symbol}</span>
);
Emoji.propTypes = {
  label: string,
  symbol: string,
};


/**
 * Example App
 */
class App extends Component {
  constructor() {
    super();

    this.state = {
      maxHeight: true,
    };

    this.handleMaxHeightToggle = this.handleMaxHeightToggle.bind(this);
  }

  // componentDidMount() {
  // 
  // }
  
  handleMaxHeightToggle(ev) {
    const checked = ev.target.checked;
    
    this.setState({
      maxHeight: checked,
    });
  }

  render() {
    const {
      maxHeight,
    } = this.state;
    const items = Array(40).fill().map((item, ndx) => ({
      label: `Item ${ ndx + 1 }`,
    }));
    const rootModifier = (!maxHeight) ? 'no--height' : '';
    
    // fetch('https://baconipsum.com/api/?type=meat-and-filler')
    // .then(res => res.json())
    // .then(response => response.forEach((par) => console.log(par)))
    // .catch(error => console.error('Error:', error));
    
    return (
      <div className={`${ styles } ${ rootModifier }`}>
        <AccordionItem
          label="Accessibility"
          opened
        >
          <p>
            You can <code>TAB</code> onto any item and hit <code>SPACE</code> to
            open or close an item. The content of the item will not
            be <code>TAB</code>-able when the item is closed.
          </p>
        </AccordionItem>
        <AccordionItem
          label="No Re-Flow Interference"
        >
          <p>
            Each item calculates it&apos;s transition height only when required. In
            the below example you can toggle it&apos;s <code>max-height</code> then
            toggle the item to see that it expands and closes without issue.
          </p>
          <p>
            Since the height is only set during transition, the DOM is allowed
            to re-flow without interference. This could be useful in cases like
            a Read More button that would need to display more content to a user.
          </p>
          <nav className="example-nav">
            <input 
              defaultChecked={maxHeight}
              id="maxHeightToggle"
              type="checkbox"
              onChange={ this.handleMaxHeightToggle }
            />
            <label htmlFor="maxHeightToggle">Toggle <code>max-height</code></label>
          </nav>
          <ul>{items.map(({ label }, ndx) => (
            <li key={ndx}><a href="#">{ label }</a></li>
          ))}</ul>
        </AccordionItem>
        <AccordionItem
          label="Nested Children"
        >
          <AccordionItem
            label={
              <Fragment>
                Ima Baby <Emoji label="baby" symbol="👶" />
              </Fragment>
            }
          >
            Goo-goo ga-ga
          </AccordionItem>
          <AccordionItem
            label={
              <Fragment>
                Ima Child <Emoji label="child" symbol="🧒" />
              </Fragment>
            }
          >
            Yo, sup?
          </AccordionItem>
        </AccordionItem>
        <AccordionItem
          label="Toggle Indicators"
        >
          <p>
            The default indicators are the plus/minus, but you can also choose
            a <code>chevron</code>, <code>triangle</code>, or <code>none</code>.
            The nice thing about these indicators is that they use Unicode
            characters so there&apos;s no extra overhead for font-icons or images.
          </p>
          <AccordionItem
            icon={ICON__CHEVRON}
            label="Chevron"
          />
          <AccordionItem
            icon={ICON__TRIANGLE}
            label="Triangle"
          />
          <AccordionItem
            icon={ICON__NONE}
            label="None"
          />
        </AccordionItem>
        <AccordionItem
          label="Lazy DOM"
          lazyDOM
        >
          <p>
            This content won&apos;t be added to the DOM until a user has opened
            this section. You can refresh the page and inspect the DOM before
            and after you open this section.
          </p>
          <p>
            This option is useful in cases where you may be trying to render
            a large tree of data with many nested nodes.
          </p>
        </AccordionItem>
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
