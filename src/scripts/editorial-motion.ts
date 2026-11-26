if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Hero title lines
  document.querySelectorAll('.hero--atlas h1').forEach((h1) => {
    const parts = h1.innerHTML.split(/<br\s*\/?>/i);
    h1.innerHTML = parts
      .map((p) => `<span class="line-mask"><span class="line-inner">${p.trim()}</span></span>`)
      .join('');
  });

  // Section headings (h2) line masks
  document.querySelectorAll('main h2').forEach((h2) => {
    if (h2.closest('.hero')) return;
    const html = h2.innerHTML;
    if (html.includes('<br')) {
      const parts = html.split(/<br\s*\/?>/i);
      h2.innerHTML = parts
        .map((p) => `<span class="line-mask"><span class="line-inner">${p.trim()}</span></span>`)
        .join('');
    } else {
      h2.innerHTML = `<span class="line-mask"><span class="line-inner">${html}</span></span>`;
    }
  });
}

if ('IntersectionObserver' in window) {
  const revealGroups = '.card-grid, .archive-grid, .epoch-list, .editorial-path-links';
  document.querySelectorAll(revealGroups).forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      (child as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(index * 90, 270)}ms`);
    });
  });

  const candidates = document.querySelectorAll(
    'main > section:not([data-opening]) > *, main .card-grid > *, main .archive-grid > *, main .epoch, main .trail-stop, main .editorial-path-link, main figure, main .photo-frame, main .home-city-image, main .home-intro-image, main .home-route-image',
  );

  for (const target of candidates) {
    if (target.matches('script, style, [data-opening], .hero')) continue;
    if (target.parentElement?.closest('main [data-reveal]')) continue;

    if (!target.hasAttribute('data-reveal')) {
      let kind = 'text';
      if (target.matches('figure, .photo-frame, .home-city-image, .home-intro-image, .home-route-image')) {
        kind = 'image';
      } else if (target.matches('.feature-card, .archive-tile, .epoch, .trail-stop, .editorial-path-link')) {
        kind = 'card';
      } else if (target.matches('h2, .section-heading, .home-intro-copy, .feature-copy, .route-feature-copy')) {
        kind = 'heading';
      }
      target.setAttribute('data-reveal', kind);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      if (!target.matches(':focus-within')) target.classList.add('has-entered');
      observer.unobserve(target);
    }
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  document.querySelectorAll('main [data-reveal]').forEach((target) => observer.observe(target));
}
