import { css } from 'emotion';

export const ROOT_CLASS = 'accordion-item';
export const MODIFIER__AUTO_HEIGHT = 'is--auto';
export const MODIFIER__CLOSING = 'is--closing';
export const MODIFIER__ICON__CHEVRON = 'is--chevron';
export const MODIFIER__ICON__PLUS_MINUS = 'is--plus-minus';
export const MODIFIER__ICON__TRIANGLE = 'is--triangle';
export const MODIFIER__OPENING = 'is--opening';
export const MODIFIER__OPEN = 'is--open';
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
      
      &-indicator {
        font-weight: bold;
        position: relative;
        pointer-events: none;
        
        &::after {
          display: inline-block;
        }
        
        &.${ MODIFIER__ICON__CHEVRON } {
          min-width: 1em;
          min-height: 1em;
          transform: rotate(-90deg);
          
          &::after {
            content: '\\276E';
            line-height: 1.1em;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-60%, -50%);
          }
        }
        
        &.${ MODIFIER__ICON__PLUS_MINUS } {
          &::after {
            content: '\\002B'; // plus
          }
        }
        
        &.${ MODIFIER__ICON__TRIANGLE } {
          min-width: 1em;
          min-height: 1em;
          
          &::after {
            content: '\\1F783';
            line-height: 1em;
            position: absolute;
            bottom: 10%;
            left: 3%;
          }
        }
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
  
  &.${ MODIFIER__AUTO_HEIGHT } {
    
    > .${ ROOT_CLASS } {
      
      &__content {
        height: auto;
      }
    }
  }
  
  &.${ MODIFIER__OPENING },
  &.${ MODIFIER__OPEN } {
    
    > .${ ROOT_CLASS }__btn {
      
      .${ ROOT_CLASS }__btn-indicator {
        
        &.${ MODIFIER__ICON__CHEVRON } {
          transform: rotate(90deg);
        }
        
        &.${ MODIFIER__ICON__PLUS_MINUS } {
          &::after {
            content: '\\2212'; // minus
          }
        }
        
        &.${ MODIFIER__ICON__TRIANGLE } {
          transform: scale(-1);
        }
      }
    }
    
    > .${ ROOT_CLASS }__content > .${ ROOT_CLASS }__content-body {
      transform: translateY(0%);
    }
  }
  
  &.${ MODIFIER__OPEN } {
    
    > .${ ROOT_CLASS }__content {
      height: auto;
    }
  }
  
  &:not(.${ MODIFIER__OPENING }):not(.${ MODIFIER__OPEN }):not(.${ MODIFIER__CLOSING }) {
    
    > .${ ROOT_CLASS }__content {
      visibility: hidden; // prevents focus of hidden children
    }
  }
`;

export default styles;