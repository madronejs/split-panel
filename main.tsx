import {
  createApp, defineComponent, reactive, computed, watch, toRaw, h,
} from 'vue';
import Madrone, { MadroneVue3 } from '@madronejs/core';
import { SplitPanel } from './src';
// import SplitPanelView from './src/render/webComponent';
import VueSplitPanelView from './src/render/vue3';
import configureAnimate from './src/plugins/animate';

import './src/style.scss';
import './testStyle.scss';

Madrone.use(MadroneVue3({
  reactive, computed, watch, toRaw,
}));

function createTestPanel() {
  const panel = SplitPanel.create({
    id: 'foo',
    resizeElSize: 20,
    // showFirstResizeEl: true,
    children: [
      { id: 'foo1' },
      {
        id: 'foo2',
        direction: 'column',
        children: [
          { id: 'foo5' },
          { id: 'foo6' },
        ],
      },
      { id: 'foo7', constraints: { size: '10%' } },
      // { id: 'foo8', constraints: { size: '20%' } },
      // { id: 'foo3' },
      // { id: 'foo4' },
    ],
  });

  panel.setAnimateStrategy(configureAnimate());

  return panel;
}

const vSplitPanel = createTestPanel();

(window as any).splitPanel = vSplitPanel;

// vue app
const app = createApp(defineComponent({
  name: 'TestApp',
  render: () => (
    <VueSplitPanelView
      class="h-100 w-100"
      splitPanel={vSplitPanel}
    >
      {{
        resize: (scope) => (
          <div class="panel-resize w-100 h-100">
            {`${scope.panel.id}: ${scope.panel.sizeInfo.formatted}`}
          </div>
        ),
        item: (scope) => (
          <div class="panel-item w-100 h-100">
            {`${scope.panel.id}: ${scope.panel.sizeInfo.formatted}`}
          </div>
        ),
      }}
    </VueSplitPanelView>
  ),
}));

app.mount('#app');

// // web component
// SplitPanelView.register().then(() => {
//   const el = document.querySelector('#webc') as SplitPanelView;

//   el.splitPanel = createTestPanel();
// });