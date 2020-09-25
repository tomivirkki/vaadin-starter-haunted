// eagerly import theme styles so as we can override them
import '@vaadin/vaadin-lumo-styles/all-imports';

import {registerStyles, css} from '@vaadin/vaadin-themable-mixin/register-styles';

registerStyles('vaadin-app-layout', css`
  :host(:not([dir='rtl']):not([overlay])) [part='drawer'] {
    border-right: none;
    box-shadow: var(--lumo-box-shadow-s);
    background-color: var(--lumo-base-color);
    z-index: 1;
  }
  :host([dir='rtl']:not([overlay])) [part='drawer'] {
    border-left: none;
    box-shadow: var(--lumo-box-shadow-s);
    background-color: var(--lumo-base-color);
    z-index: 1;
  }
  [part='navbar'] {
    box-shadow: var(--lumo-box-shadow-s);
  }
`);
