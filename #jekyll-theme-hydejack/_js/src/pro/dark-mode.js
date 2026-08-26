// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>

import { importTemplate, stylesheetReady, once } from '../common';

const SEL_NAVBAR_BTN_BAR = '#_navbar > .content > .nav-btn-bar';

(async () => {
  await stylesheetReady;

  const darkMode = importTemplate('_dark-mode-template');
  if (darkMode) {
    const navbarEl = document.querySelector(SEL_NAVBAR_BTN_BAR);
    navbarEl?.insertBefore(darkMode, navbarEl.querySelector('.nav-span'));

    const navbarBtn = document.getElementById('_dark-mode');

    navbarBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      const list = document.body.classList;
      if (
        list.contains('dark-mode') ||
        ('_sunset' in window && !list.contains('light-mode') && matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        list.remove('dark-mode');
        list.add('light-mode');
        navbarBtn.dispatchEvent(new CustomEvent('hydejack-dark-mode-toggle', { detail: false, bubbles: true }));
      } else {
        list.remove('light-mode');
        list.add('dark-mode');
        navbarBtn.dispatchEvent(new CustomEvent('hydejack-dark-mode-toggle', { detail: true, bubbles: true }));
      }
    });

    await once(document, 'click');

    const styleSheets = Array.from(document.styleSheets);
    const inlineSheet = styleSheets.find((s) => s.ownerNode?.id === '_styleInline');
    const linkSheet = styleSheets.find((s) => s.ownerNode?.id === '_stylePreload');
    const setRule = (sheet) => {
      if (!sheet) return;
      const rule = Array.from(sheet.rules).find((rule) => rule.selectorText.startsWith('.color-transition'));
      if (rule) rule.style.transition = 'background-color 1s ease, border-color 1s ease';
    };
    setRule(inlineSheet);
    setRule(linkSheet);
  }
})();
