import '@vaadin/vaadin-app-layout/theme/lumo/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-tabs/theme/lumo/vaadin-tab';
import '@vaadin/vaadin-tabs/theme/lumo/vaadin-tabs';
import { virtual, html, useState } from 'haunted';
import { LazyView } from '../../useLazyView';
import { TemplateResult } from 'lit-html';
import styles from './main-view.module.css';

const PROJECT_NAME = 'My Project';

export default virtual(
  (
    views: LazyView[],
    activeView: LazyView,
    activeViewInstance: TemplateResult
  ) => {
    const [appLayoutDrawerOpened, setAppLayoutDrawerOpened] = useState(true);

    // TODO: When should this trigger?
    if (document.documentElement.offsetWidth < 800) {
      setAppLayoutDrawerOpened(false);
    }

    return html`
      <div class=${styles.host}>
        <vaadin-app-layout
          primary-section="drawer"
          @drawer-opened-changed=${(e: CustomEvent) =>
            setAppLayoutDrawerOpened(e.detail.value)}
          .drawerOpened=${appLayoutDrawerOpened}
        >
          <header class=${styles.header} slot="navbar" theme="dark">
            <vaadin-drawer-toggle></vaadin-drawer-toggle>
            <h1>${activeView ? activeView.name : ''}</h1>
            <img src="images/user.svg" alt="Avatar" />
          </header>

          <div slot="drawer">
            <div id="logo" class=${styles.logo}>
              <img src="images/logo.png" alt="${PROJECT_NAME} logo" />
              <span>${PROJECT_NAME}</span>
            </div>
            <hr />
            <vaadin-tabs
              orientation="vertical"
              theme="minimal"
              id="tabs"
              .selected=${views.indexOf(activeView)}
            >
              ${views.map(
                (view) => html`
                  <vaadin-tab>
                    <a href="${view.slug}" tabindex="-1">${view.name}</a>
                  </vaadin-tab>
                `
              )}
            </vaadin-tabs>
          </div>
          ${activeViewInstance}
        </vaadin-app-layout>
      </div>
    `;
  }
);
