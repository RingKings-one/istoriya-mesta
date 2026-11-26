const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function splitLines(el: Element) {
  if (el.querySelector('.line-inner')) return;
  const html = el.innerHTML.trim();
  if (!html) return;
  const parts = html.split(/<br\s*\/?>/i).map((part) => part.trim()).filter(Boolean);
  if (!parts.length) return;
  el.innerHTML = parts
    .map((part) => `<span class="line-mask"><span class="line-inner">${part}</span></span>`)
    .join('');
}

try {
  document.querySelectorAll('main h1, main h2, [data-split]').forEach((el) => {
    if (el.closest('.feature-card')) return;
    splitLines(el);
  });

  if (reduce) {
    document.documentElement.classList.remove('motion');
  } else if ('IntersectionObserver' in window) {
    const hosts = new Set<HTMLElement>();

    const addHost = (el: Element | null) => {
      if (!(el instanceof HTMLElement)) return;
      if (el.closest('[data-opening]')) return;
      hosts.add(el);
    };

    document.querySelectorAll('main [data-reveal]').forEach(addHost);
    document.querySelectorAll('main h2').forEach((heading) => {
      if (heading.closest('.feature-card, [data-opening]')) return;
      addHost(heading.closest('[data-reveal], .cafe-chapter, .trail-copy, .epochs-heading, .ruza-opening-heading, .ruza-directions-heading') || heading);
    });
    document.querySelectorAll('[data-split]').forEach((el) => {
      addHost(el.closest('.home-principle, [data-reveal]') || el);
    });
    document.querySelectorAll('main figure, main .photo-frame, main .home-city-image').forEach((el) => {
      if (el.closest('.feature-card, .archive-record, [data-opening]')) return;
      if (el.matches('figure') && !el.querySelector('img')) return;
      addHost(el);
    });
    document.querySelectorAll('main .feature-card, main .epoch, main .editorial-path-link').forEach(addHost);

    const nested = new Set<HTMLElement>();
    for (const host of hosts) {
      if (host.parentElement?.closest('.feature-card, .epoch, .editorial-path-link') && !host.matches('.feature-card, .epoch, .editorial-path-link')) {
        nested.add(host);
      }
    }
    nested.forEach((host) => hosts.delete(host));

    let imageCount = 0;
    for (const host of hosts) {
      let kind = 'text';
      if (host.matches('.feature-card, .epoch, .editorial-path-link')) kind = 'card';
      else if (host.matches('figure, .photo-frame, .home-city-image, .home-intro-image, .home-route-image') || (host.matches('figure') && host.querySelector('img'))) kind = 'image';
      else if (host.querySelector('h1, h2, [data-split]') || host.matches('h1, h2, [data-split]')) kind = 'heading';
      host.dataset.motion = kind;
      if (kind === 'image') {
        const side = imageCount % 3 === 1 ? 'left' : imageCount % 3 === 2 ? 'right' : 'bottom';
        host.dataset.side = side;
        imageCount += 1;
      }
    }

    document.querySelectorAll('.card-grid, .editorial-path-links').forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        if (child instanceof HTMLElement) child.style.setProperty('--reveal-delay', `${index * 120}ms`);
      });
    });

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('has-entered');
        observer.unobserve(entry.target);
      }
    }, { rootMargin: '0px 0px -4% 0px', threshold: 0.08 });

    hosts.forEach((host) => observer.observe(host));

    document.addEventListener('focusin', (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const host = target.closest<HTMLElement>('[data-motion]');
      host?.classList.add('has-entered');
    });
  }
} catch {
  document.documentElement.classList.remove('motion');
}
