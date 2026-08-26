// Copyright (c) 2020 Florian Klampfer <https://qwtel.com/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { join } from 'path';

import { fromEvent } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { render, html } from 'lit-html';
import { repeat } from 'lit-html/directives/repeat';
import { ifDefined } from 'lit-html/directives/if-defined';

import { importTemplate, postMessage, once, stylesheetReady } from '../common';

const SEL_NAVBAR_BTN_BAR = '#_navbar > .content > .nav-btn-bar';

const relativeUrl = (url) => (url.startsWith(window._baseURL) ? url : join(window._baseURL, url));

const smartUrl = (url) => (url.includes('://') ? url : relativeUrl(url));

const calcSrcSet = (srcset) =>
  !srcset
    ? undefined
    : Object.entries(srcset)
        .map(([desc, url]) => `${smartUrl(url)} ${desc}`)
        .join(',');

(async () => {
  await stylesheetReady;

  const pushStateEl = document.getElementById('_pushState');

  const searchFrag = importTemplate('_search-template');
  const workerHref = document.getElementById('_hrefSearch')?.href;
  if (searchFrag && workerHref) {
    const navbarEl = document.querySelector(SEL_NAVBAR_BTN_BAR);
    const [searchBtnEl, searchBoxEl, hitsEl] = searchFrag.children;
    if (!searchBtnEl || !searchBoxEl || !hitsEl || !navbarEl) return;

    navbarEl.insertBefore(searchBtnEl, navbarEl.querySelector('.nav-span'));
    navbarEl.insertBefore(searchBoxEl, navbarEl.querySelector('.nav-span'));
    navbarEl.insertBefore(hitsEl, navbarEl.querySelector('.nav-span'));

    const searchInputEl = searchBoxEl.querySelector('input[type=search]');
    const searchCloseEl = searchBoxEl.querySelector('button[type=reset]');
    if (!searchInputEl || !searchCloseEl) return;

    searchBtnEl.addEventListener('click', () => {
      searchInputEl.focus();
    });

    searchInputEl.addEventListener('focus', () => {
      searchInputEl.select();
      searchBoxEl.classList.add('show');
      if (searchInputEl.value !== '') hitsEl.style.display = '';
    });

    const closeHandler = () => {
      document.activeElement?.blur();
      searchBoxEl.classList.remove('show');
      hitsEl.style.display = 'none';
    };

    hitsEl.style.display = 'none';

    searchCloseEl.addEventListener('click', closeHandler);
    pushStateEl?.addEventListener('hy-push-state-start', closeHandler);

    // Load search worker after user interaction
    await once(document, 'click');

    const worker = new Worker('./search.worker.js', { type: 'module' });
    postMessage(worker, window._search);

    let prevVal = '';
    fromEvent(searchInputEl, 'keyup')
      .pipe(
        tap((e) => {
          if (e.target.value === '' && prevVal === '' && e.keyCode === 27) {
            e.preventDefault();
            closeHandler();
          }
          prevVal = e.target.value;
        }),
        switchMap((e) => postMessage(worker, e.target.value)),
        tap((items) => {
          if (items.length) {
            render(
              html`
                <ul>
                  ${repeat(
                    items,
                    (item) => item.url,
                    (item) => html`
                      <li class="search-item" @click=${() => pushStateEl?.assign?.(item.url)}>
                        <div class="search-img aspect-ratio sixteen-ten">
                          ${!item.image
                            ? null
                            : html`<img
                                src="${smartUrl(item.image.src || item.image.path || item.image)}"
                                srcset="${ifDefined(calcSrcSet(item.image.srcset))}"
                                sizes="4.67rem"
                              />`}
                        </div>
                        <div class="search-text">
                          <p>
                            <a class="heading" href=${relativeUrl(item.url)} tabindex="1">${item.title}</a>
                            <small>${item.url}</small>
                          </p>
                          ${item.description ? html` <p>${item.description}</p> ` : ''}
                        </div>
                      </li>
                    `,
                  )}
                </ul>
              `,
              hitsEl,
            );
            hitsEl.style.display = '';
          } else {
            hitsEl.style.display = 'none';
          }
        }),
      )
      .subscribe();
  }
})();
