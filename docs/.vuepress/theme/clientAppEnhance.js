import { defineClientAppEnhance } from '@vuepress/client'
import { Quasar } from "quasar";

import './css/index.scss';

export default defineClientAppEnhance(({
  app,
  router,
  siteData
}) => {
  app.use(Quasar, {
    config: {
      brand: {
        primary: '#ffffff',
        secondary: '#7f7f7f',
        accent: '#ffffff',

        dark: '#333333',

        positive: '#ffffff',
        negative: '#000000',
        info: '#ffffff',
        warning: '#999999'
      },
      extras: [
        'svg-ionicons-v5'
      ]
    }
  });
});
