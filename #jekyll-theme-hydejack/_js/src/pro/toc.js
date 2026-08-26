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

import { fromEvent, NEVER, combineLatest, of } from 'rxjs';
import { map, tap, switchMap, startWith, share, finalize, mergeAll } from 'rxjs/operators';
import scrollIntoView from 'scroll-into-view-if-needed';

import {
  BREAK_POINT_DYNAMIC,
  getScrollTop,
  createIntersectionObservable,
  stylesheetReady,
  fromMediaQuery,
} from '../common';

(async () => {
  await stylesheetReady;

  const isLarge$ = fromMediaQuery(window.matchMedia(BREAK_POINT_DYNAMIC)).pipe(
    startWith(window.matchMedia(BREAK_POINT_DYNAMIC)),
    map((m) => m.matches),
  );

  const pushState = document.getElementById('_pushState');
  const drawerEl = document.getElementById('_drawer');
  if (!pushState) return;

  if (drawerEl && !window._noDrawer) await drawerEl.initialized;
  await pushState.initialized;

  const load$ = !window._noPushState ? fromEvent(pushState, 'load').pipe(startWith({})) : of({});

  const toc$ = load$.pipe(
    map(() => document.querySelector('#markdown-toc')),
    share(),
  );

  combineLatest([toc$, isLarge$])
    .pipe(
      switchMap(([toc, isLarge]) => {
        if (!toc || !isLarge) return NEVER;

        const scrollspy = document.createElement('div');
        scrollspy.style.position = 'relative';
        scrollspy.style.top = '-1rem';
        toc.parentNode.insertBefore(scrollspy, toc);

        return createIntersectionObservable(scrollspy).pipe(
          mergeAll(),
          map((x) => !x.isIntersecting && x.boundingClientRect.top < 0),
          tap((affix) => {
            if (affix) {
              toc.classList.add('affix');
            } else {
              toc.classList.remove('affix');
            }
          }),
          finalize(() => {
            scrollspy.parentNode.removeChild(scrollspy);
          }),
        );
      }),
    )
    .subscribe();

  combineLatest([toc$, isLarge$])
    .pipe(
      switchMap(([toc, isLarge]) => {
        if (!toc || !isLarge) return NEVER;

        const intersecting = new Set();
        const top = new WeakMap();

        const hasGuardRail = getComputedStyle(toc).overscrollBehaviorY === 'contain';

        const toObserve = Array.from(toc.querySelectorAll('li'))
          .map((el) => el.children[0].getAttribute('href') || '')
          .map((hash) => document.getElementById(hash.substr(1)))
          .filter((el) => !!el);

        let init = true;
        let timer;
        return createIntersectionObservable(toObserve).pipe(
          tap((entries) => {
            if (init) {
              entries.forEach(({ target, boundingClientRect }) =>
                top.set(target, getScrollTop() + boundingClientRect.top),
              );
              init = false;
            }

            entries.forEach(({ isIntersecting, target }) => {
              isIntersecting ? intersecting.add(target) : intersecting.delete(target);
            });

            const curr = Array.from(intersecting).reduce((min, el) => (top.get(el) >= top.get(min) ? min : el), null);
            if (curr) {
              toc.querySelectorAll('a').forEach((el) => {
                el.style.fontWeight = '';
              });
              const el = toc.querySelector(`a[href="#${curr.id}"]`);
              if (el) {
                el.style.fontWeight = 'bold';
                if (hasGuardRail) {
                  clearTimeout(timer);
                  timer = setTimeout(() => {
                    if (toc.classList.contains('affix')) {
                      scrollIntoView(el, { scrollMode: 'if-needed' });
                    }
                  }, 100);
                }
              }
            }
          }),
          finalize(() => {
            toc.querySelectorAll('a').forEach((el) => {
              el.style.fontWeight = '';
            });
          }),
        );
      }),
    )
    .subscribe();
})();
