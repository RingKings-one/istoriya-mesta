const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
  const addReveal = (target: Element, order = 0) => {
    if (target.matches('[data-opening], .hero, [data-reveal]')) return;
    target.setAttribute('data-reveal', target.matches('figure, picture, .photo-frame') ? 'image' : '');
    if (order > 0) (target as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(order * 75, 300)}ms`);
  };

  // Keep the entrance rhythm consistent on pages whose editorial blocks were
  // not individually tagged, and let card/timeline groups arrive in sequence.
  document.querySelectorAll('main > section:not([data-opening])').forEach((section) => {
    if (section.matches('[data-epochs]')) return;
    section.querySelectorAll(':scope > :not(script):not(style)').forEach((target) => addReveal(target));
  });
  document.querySelectorAll('.card-grid, .editorial-path-links, .epoch-list, .journal-list, .route-stops').forEach((group) => {
    Array.from(group.children).forEach((target, index) => addReveal(target, index));
  });

  const observer = new IntersectionObserver((entries) => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;

      // Content is visible at rest and stays still when navigated to by keyboard.
      if (!reducedMotion.matches && !target.matches(':focus-within')) {
        target.classList.add('has-entered');
      }
      observer.unobserve(target);
    }
  }, { rootMargin: '0px 0px -4% 0px', threshold: 0.04 });

  const viewportHeight = document.documentElement.clientHeight;
  document.querySelectorAll('main [data-reveal]').forEach((target) => {
    if (target.getBoundingClientRect().top >= viewportHeight) {
      observer.observe(target);
    }
  });
}
