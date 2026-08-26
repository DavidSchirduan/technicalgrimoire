// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>

import { importTemplate, stylesheetReady } from '../common';

(async () => {
  await stylesheetReady;

  if (!navigator.CookiesOK && document.cookie.indexOf('hy--cookies-ok') === -1) {
    const cookiesBanner = importTemplate('_cookies-banner-template');
    if (cookiesBanner) {
      const parent = document.querySelector('hy-push-state');
      parent?.insertBefore(cookiesBanner, parent.firstChild);

      document.getElementById('_cookies-ok')?.addEventListener(
        'click',
        () => {
          const maxAge = 60 * 60 * 24 * 356;
          document.cookie = `hy--cookies-ok=true;path=/;max-age=${maxAge}`;

          const banner = document.getElementById('_cookies-banner');
          banner?.parentNode?.removeChild(banner);

          document.dispatchEvent(new CustomEvent('hy--cookies-ok'));
        },
        { once: true },
      );
    }
  }
})();
