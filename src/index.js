import React, { Component } from 'react';
import { bool, node, number, oneOfType, string } from 'prop-types';
import { css } from 'emotion';
import { transitionEnd } from './utils/prefixTransition';
import setTransitionState from './utils/setTransitionState';
import styles, {
  MODIFIER__IS_AUTO,
  MODIFIER__IS_CLOSING,
  MODIFIER__IS_OPENING,
  MODIFIER__IS_OPEN,
  ROOT_CLASS,
} from './styles';

const TRANSITION_TIME = 300;

class AccordionItem extends Component {
  constructor(props) {
    const {
      children,
      lazyDOM,
      opened,
      transitionTime,
      uid,
    } = props;

    super();

    this.state = {
      content: (lazyDOM && !opened) ? null : children,
      contentStyles: undefined,
      transitionDurationClass: css`transition-duration: ${ transitionTime }ms;`,
      opened,
      transitionClass: (opened) ? MODIFIER__IS_OPEN : '',
      uid: uid || (''+performance.now()).replace('.',''),
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
   * To ensure a branch has the correct height during it's opening or closing
   * transition, we have to calculate the expanded height. That's done via by
   * adding a class that sets height to `auto`, we then grab the height of the
   * branch (including any opened or closed children), and then reset the height
   * back to what it was.
   *
   * @return {Number}
   */
  getExpandedHeight() {
    this.rootRef.classList.add(MODIFIER__IS_AUTO);
    const height = this.contentRef.offsetHeight;
    this.rootRef.classList.remove(MODIFIER__IS_AUTO);

    return height;
  }

  /**
   * Animates the opening/closing of the component.
   *
   * @param {Boolean} opened - Whether or not the item is opened or closed.
   */
  executeTransition(checked) {
    const newState = {
      contentStyles: {
        height: `${ this.getExpandedHeight() }px`,
      },
      transitionClass: (checked) ? MODIFIER__IS_OPENING : MODIFIER__IS_CLOSING,
      opened: checked,
    };
    
    // TODO - if you open and close quickly the event never finishes, causing
    // a broken state.

    /**
     * Waiting on CSS transitions to end after an open or close allows us to
     * set the height of a branch to `auto` so that heights aren't locked in.
     * If the heights were locked, we'd end up with bad height calculations if
     * nested branches were opened or closed.
     */
    this.transitionCB = this.handleTransitionEnd.bind(this);
    this.contentRef.addEventListener(transitionEnd, this.transitionCB, false);

    setTransitionState(this, newState, () => {
      if(!checked){
        /**
         * When a user is closing a branch, we have to temporarily set the
         * height to a pixel value of zero so that the CSS transition kicks in.
         */
        setTransitionState(this, {
          contentStyles: {
            height: '0px',
          },
        });
      }
    });
  }
  
  /**
   * Allows for accessible controls
   *
   * @param {Event} ev - keydown
   */
  handleKeyDown(ev) {
    switch(ev.which){
      case 32: // SPACE
        this.checkboxRef.click();
        break;
    }
  }

  /**
   * Handles the toggling of a branch.
   */
  handleToggle() {
    const {
      children,
      lazyDOM,
    } = this.props;
    const {
      content,
    } = this.state;
    const checked = this.checkboxRef.checked;
    
    if(checked && lazyDOM && !content){
      this.setState({
        content: children,
      }, () => {
        this.executeTransition(checked);
      });
    }
    else{
      this.executeTransition(checked);
    }
  }

  /**
   * After a branch has opened, the height needs to be set to auto to allow for
   * internal branches to open or close and not be locked in by the parent's
   * hard-coded height.
   */
  handleTransitionEnd() {
    this.contentRef.removeEventListener(transitionEnd, this.transitionCB);
    this.setState({
      contentStyles: {
        height: '',
      },
      transitionClass: (this.state.opened) ? 'is--open' : '',
    });
  }

  render() {
    const {
      className,
      label,
      tabIndex,
    } = this.props;
    const {
      content,
      contentStyles,
      transitionDurationClass,
      opened,
      transitionClass,
      uid,
    } = this.state;
    const _uid = `${ ROOT_CLASS }_${ uid }`;

    return (
      <div 
        className={`${ ROOT_CLASS } ${ styles } ${ transitionClass } ${ className }`}
        ref={(ref) => { this.rootRef = ref; }}
      >
        <input
          checked={opened}
          className={`${ ROOT_CLASS }__checkbox`}
          id={_uid}
          onChange={this.handleToggle}
          ref={(ref) => { this.checkboxRef = ref; }}
          tabIndex="-1"
          type="checkbox"
        />
        <label
          className={`${ ROOT_CLASS }__btn`}
          htmlFor={_uid}
          onKeyDown={this.handleKeyDown}
          tabIndex={tabIndex}
        >
          <div className={`${ ROOT_CLASS }__btn-label`}>{label}</div>
        </label>
        <div
          className={`${ ROOT_CLASS }__content ${ transitionDurationClass }`}
          style={contentStyles}
          ref={(ref) => { this.contentRef = ref; }}
        >
          <div className={`${ ROOT_CLASS }__content-body ${ transitionDurationClass }`}>
            {content}
          </div>
        </div>
      </div>
    );
  }
}

AccordionItem.propTypes = {
  children: node,
  className: string,
  label: oneOfType([
    node,
    string,
  ]).isRequired,
  lazyDOM: bool,
  opened: bool,
  tabIndex: number,
  transitionTime: number,
  uid: string,
};
AccordionItem.defaultProps = {
  className: '',
  opened: false,
  tabIndex: 0,
  transitionTime: TRANSITION_TIME,
};

export default AccordionItem;