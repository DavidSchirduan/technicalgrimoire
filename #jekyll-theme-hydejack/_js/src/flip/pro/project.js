// Copyright (c) 2019 Florian Klampfer <https://qwtel.com/>

import { fromEvent, Observable, of, zip } from 'rxjs';
import { tap, finalize, filter, switchMap } from 'rxjs/operators';

import { animate, empty } from '../../common';

/**
 * @param {Observable<any>} start$
 * @param {Observable<any>} ready$
 * @param {Observable<any>} fadeIn$
 * @param {any} opts
 */
export function setupFLIPProject(start$, ready$, fadeIn$, { animationMain, settings }) {
  if (!animationMain) return start$;

  const flip$ = start$.pipe(
    filter(({ flipType }) => flipType === 'project'),
    switchMap(({ anchor }) => {
      const img = anchor.querySelector('.flip-project-img');
      if (!anchor || !img) return of({});

      const page = animationMain.querySelector('.page');
      if (!page) return of({});

      const titleNode = anchor.parentNode.querySelector('.flip-project-title');
      const title = (titleNode && titleNode.textContent) || '|';

      const h1 = document.createElement('h1');
      h1?.classList.add('page-title');
      if (h1) h1.style.opacity = '0';
      if (h1) h1.textContent = title;

      const postDate = document.createElement('div');
      postDate?.classList.add('post-date');
      postDate?.classList.add('heading');
      if (postDate) postDate.style.opacity = '0';
      if (postDate) postDate.textContent = '|';

      empty.call(page);
      page.appendChild(h1);
      page.appendChild(postDate);

      const placeholder = document.createElement('div');
      placeholder.setAttribute('class', img.classList);
      placeholder.classList.remove('project-card-img');

      img.parentNode.insertBefore(placeholder, img);
      img.classList.add('lead');
      img.style.transformOrigin = 'left top';

      page.appendChild(img);
      animationMain.style.position = 'fixed';
      animationMain.style.opacity = '1';

      const first = placeholder.getBoundingClientRect();
      const last = img.getBoundingClientRect();

      const invertX = first.left - last.left;
      const invertY = first.top - last.top;
      const invertScale = first.width / last.width;

      const transform = [
        { transform: `translate3d(${invertX}px, ${invertY}px, 0) scale(${invertScale})` },
        { transform: 'translate3d(0, 0, 0) scale(1)' },
      ];

      return animate(img, transform, settings).pipe(
        tap({
          complete() {
            animationMain.style.position = 'absolute';
          },
        }),
      );
    }),
  );

  start$
    .pipe(
      switchMap(({ flipType }) =>
        ready$.pipe(
          filter(() => flipType === 'project'),
          switchMap(({ replaceEls: [main] }) => {
            const imgWrapper = main.querySelector('.aspect-ratio');
            imgWrapper && (imgWrapper.style.opacity = 0);

            const img = imgWrapper && imgWrapper.querySelector('img');

            return zip(img ? fromEvent(img, 'load') : of({}), fadeIn$).pipe(
              tap(() => (imgWrapper && (imgWrapper.style.opacity = 1), (animationMain.style.opacity = 0))),
              switchMap(() =>
                img != null ? animate(animationMain, [{ opacity: 1 }, { opacity: 0 }], { duration: 500 }) : of({}),
              ),
              finalize(() => {
                animationMain.style.opacity = 0;

                const page = animationMain.querySelector('.page');
                empty.call(page);
              }),
            );
          }),
        ),
      ),
    )
    .subscribe();

  return flip$;
}
