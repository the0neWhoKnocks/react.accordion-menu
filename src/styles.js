import { css } from 'emotion';

export const ROOT_CLASS = 'accordion-item';
export const MODIFIER__IS_AUTO = 'is--auto';
export const MODIFIER__IS_CLOSING = 'is--closing';
export const MODIFIER__IS_OPENING = 'is--opening';
export const MODIFIER__IS_OPEN = 'is--open';
const BTN_COLOR = '#d4d4d4';

const styles = css`
  position: relative;
  
  .${ ROOT_CLASS } {
    
    &__checkbox {
      position: absolute;
      pointer-events: none;
      opacity: 0;
    }
    
    &__btn {
      padding: 0.3em 0.5em;
      border-top: solid 1px #eee;
      border-bottom: solid 1px #888;
      background: ${ BTN_COLOR };
      user-select: none;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
      
      &-label {
        font-weight: bold;
        flex: 1 0 0;
      }

      &::before {
        content: '';
        width: 0.25em;
        background: rgba(0,0,0,0.5);
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        transition: opacity 0.25s;
      }

      &::after {
        content: '\\002B'; // plus
        font-weight: bold;
      }

      &:focus,
      &:hover {
        outline: none;
        
        &::before {
          opacity: 1;
        }
      }
    }
    
    &__content {
      height: 0;
      overflow: hidden;
      transition-property: height; // duration controlled by component
      
      &-body {
        padding: 0.5em;
        border: solid 2px ${ BTN_COLOR };
        border-top: none;
        background: #fff;
        transition-property: transform; // duration controlled by component
        transform: translateY(-100%);
      }
    }
  }
  
  &.${ MODIFIER__IS_AUTO } {
    
    > .${ ROOT_CLASS } {
      
      &__content {
        height: auto;
      }
    }
  }
  
  &.${ MODIFIER__IS_OPENING },
  &.${ MODIFIER__IS_OPEN } {
    
    > .${ ROOT_CLASS }__btn::after {
      content: '\\2212'; // minus
    }
    
    > .${ ROOT_CLASS }__content > .${ ROOT_CLASS }__content-body {
      transform: translateY(0%);
    }
  }
  
  &.${ MODIFIER__IS_OPEN } {
    
    > .${ ROOT_CLASS }__content {
      height: auto;
    }
  }
  
  &:not(.${ MODIFIER__IS_OPENING }):not(.${ MODIFIER__IS_OPEN }):not(.${ MODIFIER__IS_CLOSING }) {
    
    > .${ ROOT_CLASS }__content {
      visibility: hidden; // prevents focus of hidden children
    }
  }
`;

export default styles;