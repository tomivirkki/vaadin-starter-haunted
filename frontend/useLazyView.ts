import { hook, Hook, State } from 'haunted';
import { TemplateResult } from 'lit-html';

const cache: { [key: string]: (...params: any[]) => TemplateResult } = {};

export type LazyView = {
  slug: string;
  name: string;
  viewParams?: any[];
  viewImport: () => Promise<any>;
};

export default hook(
  class extends Hook {
    constructor(id: number, state: State<unknown>, view?: LazyView) {
      super(id, state);
    }

    update(view: LazyView): TemplateResult | undefined {
      if (view) {
        if (cache[view.slug]) {
          return cache[view.slug](...(view.viewParams || []));
        } else {
          view.viewImport().then((imported: any) => {
            cache[view.slug] = imported.default;
            this.state.update();
          });
        }
      }
    }
  }
);
