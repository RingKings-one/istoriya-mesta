const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
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
  document.querySelectorAll('[data-reveal]').forEach((target) => {
    if (target.getBoundingClientRect().top >= viewportHeight) {
      observer.observe(target);
    }
  });
}
