import React, { Component } from 'react';
import { bool, func, node, number, oneOf, oneOfType, string } from 'prop-types';
import { css } from 'emotion';
import { transitionEnd } from 'UTILS/prefixTransition';
import setTransitionState from 'UTILS/setTransitionState';
import styles, {
  MODIFIER__AUTO_HEIGHT,
  MODIFIER__CLOSING,
  MODIFIER__ICON__CHEVRON,
  MODIFIER__ICON__PLUS_MINUS,
  MODIFIER__ICON__TRIANGLE,
  MODIFIER__LOADING,
  MODIFIER__NO_SCRIPT,
  MODIFIER__OPEN,
  MODIFIER__OPENING,
  ROOT_CLASS,
} from './styles';

export const ICON__CHEVRON = 'chevron';
export const ICON__NONE = 'none';
export const ICON__PLUS_MINUS = 'plusMinus';
export const ICON__TRIANGLE = 'triangle';
const TRANSITION_TIME = 300;

class AccordionItem extends Component {
  
  /**
   * Determines the icon class that should be applied.
   *
   * @param {String} iconType - The type of icon.
   * @return {String}
   */
  static iconModifier(iconType) {
    let modifier = '';
    
    switch(iconType) {
      case ICON__CHEVRON: modifier = MODIFIER__ICON__CHEVRON; break;
      case ICON__PLUS_MINUS: modifier = MODIFIER__ICON__PLUS_MINUS; break;
      case ICON__TRIANGLE: modifier = MODIFIER__ICON__TRIANGLE; break;
    }
    
    return modifier;
  }
  
  constructor(props) {
    const {
      asyncContent,
      children,
      lazyDOM,
      opened,
      transitionTime,
      uid,
    } = props;

    super();

    this.state = {
      content: (!opened || asyncContent, lazyDOM) ? null : children,
      contentStyles: undefined,
      loading: false,
      opened,
      rootModifier: MODIFIER__NO_SCRIPT,
      transitionClass: '',
      transitionDurationClass: css`transition-duration: ${ transitionTime }ms;`,
      uid: uid || (''+performance.now()).replace('.',''),
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }
  
  componentDidMount() { this.init(); }
  
  /**
   * Initializes the component after DOM load
   */
  init() {
    const { opened } = this.state;
    
    this.setState({
      rootModifier: '',
      transitionClass: (opened) ? MODIFIER__OPEN : '',
    });
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
    this.rootRef.classList.add(MODIFIER__AUTO_HEIGHT);
    const height = this.contentRef.offsetHeight;
    this.rootRef.classList.remove(MODIFIER__AUTO_HEIGHT);

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
      transitionClass: (checked) ? MODIFIER__OPENING : MODIFIER__CLOSING,
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
   * Handles loading async content.
   */
  handleAsyncContent() {
    const { asyncContent } = this.props;
    const promise = asyncContent();
    
    if(promise && promise.then){
      promise.then((children) => {
        this.setState({
          content: children,
          loading: false,
        }, () => {
          this.executeTransition(true);
        });
      });
    }
    else{
      console.error('`asyncContent` requires a Promise to be returned');
    }
  }

  /**
   * Handles the toggling of a branch.
   */
  handleToggle() {
    const {
      asyncContent,
      children,
      lazyDOM,
    } = this.props;
    const {
      content,
    } = this.state;
    const checked = this.checkboxRef.checked;
    
    if(
      (checked && !content)
      && (lazyDOM || asyncContent)
    ){
      if(lazyDOM){
        this.setState({
          content: children,
        }, () => {
          this.executeTransition(checked);
        });
      }
      else if(asyncContent){
        this.setState({
          loading: true,
        }, this.handleAsyncContent);
      }
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
      transitionClass: (this.state.opened) ? MODIFIER__OPEN : '',
    });
  }

  render() {
    const {
      className,
      icon,
      label,
      tabIndex,
    } = this.props;
    const {
      content,
      contentStyles,
      loading,
      rootModifier,
      transitionDurationClass,
      opened,
      transitionClass,
      uid,
    } = this.state;
    const _uid = `${ ROOT_CLASS }_${ uid }`;
    let _rootModifier = rootModifier;
    
    if(loading) _rootModifier += ` ${ MODIFIER__LOADING }`;

    return (
      <div 
        className={`${ ROOT_CLASS } ${ styles } ${ transitionClass } ${ className } ${ _rootModifier }`}
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
          {icon !== ICON__NONE && (
            <div className={`${ ROOT_CLASS }__btn-indicator ${ AccordionItem.iconModifier(icon) }`} />
          )}
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
  asyncContent: func,
  children: node,
  className: string,
  icon: oneOf([
    ICON__CHEVRON,
    ICON__NONE,
    ICON__PLUS_MINUS,
    ICON__TRIANGLE,
  ]),
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
  icon: ICON__PLUS_MINUS,
  opened: false,
  tabIndex: 0,
  transitionTime: TRANSITION_TIME,
};

export default AccordionItem;