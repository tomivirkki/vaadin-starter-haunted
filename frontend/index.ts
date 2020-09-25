import { useEffect, useState, virtual } from 'haunted';

import { render, html } from 'lit-html';
import './global-styles';
import useLazyView, { LazyView } from './useLazyView';
import page from 'page';

page.base('/');

const CHILD_VIEWS: LazyView[] = [
  {
    name: 'Hello World',
    slug: 'hello',
    viewImport: () => import('./views/helloworld/hello-world-view'),
  },
  {
    name: 'About',
    slug: 'about',
    viewImport: () => import('./views/about/about-view'),
  },
];

const App = virtual(() => {
  const [activeView, setActiveView] = useState(null);

  const activeChildViewInstance = useLazyView(activeView);

  useEffect(() => {
    CHILD_VIEWS.forEach((view) =>
      page(view.slug, () => {
        // TODO: Figure out why this is needed. Should just need setActiveView(view)
        setActiveView(null);
        setTimeout(() => setActiveView(view));
      })
    );
    page();
  }, []);

  const mainView = useLazyView({
    slug: '',
    name: 'main',
    viewParams: [CHILD_VIEWS, activeView, activeChildViewInstance],
    viewImport: () => import('./views/main/main-view'),
  });

  return html`${mainView}`;
});

render(App(), document.getElementById('outlet')!);
