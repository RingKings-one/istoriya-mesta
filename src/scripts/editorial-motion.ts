if ('IntersectionObserver' in window) {
  const revealGroups = '.card-grid, .archive-grid, .epoch-list, .editorial-path-links';
  const groups = document.querySelectorAll(revealGroups);

  groups.forEach((group) => {
    Array.from(group.children).forEach((child, index) => {
      (child as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(index * 120, 360)}ms`);
    });
  });

  const candidates = document.querySelectorAll(
    'main > section:not([data-opening]) > *, main .card-grid > *, main .archive-grid > *, main .epoch, main .trail-stop, main .editorial-path-link, main figure, main .photo-frame',
  );

  for (const target of candidates) {
    if (target.matches('script, style, [data-opening], .hero')) continue;
    if (target.parentElement?.closest('main [data-reveal]')) continue;

    if (!target.hasAttribute('data-reveal')) {
      const kind = target.matches('figure, .photo-frame')
        ? 'image'
        : target.matches('.feature-card, .archive-tile, .epoch, .trail-stop, .editorial-path-link')
          ? 'card'
          : 'text';
      target.setAttribute('data-reveal', kind);
    }
  }

  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      if (!target.matches(':focus-within')) target.classList.add('has-entered');
      observer.unobserve(target);
    }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  document.querySelectorAll('main [data-reveal]').forEach((target) => observer.observe(target));
}
