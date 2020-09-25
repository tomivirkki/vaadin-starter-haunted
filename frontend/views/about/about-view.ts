import { showNotification } from '@vaadin/flow-frontend/a-notification';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import { virtual, html, useState } from 'haunted';
import styles from './about-view.module.css';

export default virtual(() => {
  const [name, setName] = useState('');

  return html`
    <div class=${styles.host}>
      <vaadin-text-field
        label="Your name"
        @value-changed="${(e: CustomEvent) => setName(e.detail.value)}"
      ></vaadin-text-field>

      <vaadin-button @click="${() => showNotification('Hello ' + name)}">
        Say hello
      </vaadin-button>
    </div>
  `;
});
