
(() => {
  // ==========================================
  // MOBILE NAVIGATION
  // ==========================================

  const menuButton = document.querySelector('#menuToggle');
  const navbar = document.querySelector('#navbar');

  const closeMenu = () => {
    navbar?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
  };

  menuButton?.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') === 'true';

    menuButton.setAttribute('aria-expanded', String(!open));
    menuButton.setAttribute(
      'aria-label',
      open ? 'Open navigation' : 'Close navigation'
    );

    navbar?.classList.toggle('open', !open);
  });

  navbar?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });


  // ==========================================
  // AUTOMATIC COPYRIGHT YEAR
  // ==========================================

  const year = document.querySelector('#year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  // ==========================================
  // TYPING / ROTATING PROFESSION TEXT
  // ==========================================

  const role = document.querySelector('.typed-role');

  const roles = [
    'AI/ML Engineer',
    'LLM Developer',
    'Agentic AI Builder',
    'Research Enthusiast'
  ];

  let roleIndex = 0;

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (role && !reduceMotion) {
    window.setInterval(() => {
      role.style.opacity = '0';

      window.setTimeout(() => {
        roleIndex = (roleIndex + 1) % roles.length;
        role.textContent = roles[roleIndex];
        role.style.opacity = '1';
      }, 220);

    }, 2600);

    role.style.transition = 'opacity .22s ease';
  }


  // ==========================================
  // PROJECT CATEGORY FILTERS
  // ==========================================

  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.project-card');

  filters.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      filters.forEach(item => {
        const active = item === button;

        item.classList.toggle('active', active);
        item.setAttribute('aria-pressed', String(active));
      });

      cards.forEach(card => {
        card.hidden = !(
          filter === 'all' ||
          card.dataset.category === filter
        );
      });
    });
  });


  // ==========================================
  // REVEAL ANIMATIONS FOR INDIVIDUAL ELEMENTS
  // ==========================================

  const revealItems = document.querySelectorAll('.reveal');

  if (
    reduceMotion ||
    !('IntersectionObserver' in window)
  ) {
    revealItems.forEach(item => {
      item.classList.add('visible');
    });

  } else {
    const observer = new IntersectionObserver(entries => {

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          observer.unobserve(entry.target);
        }
      });

    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -35px 0px'
    });

    revealItems.forEach(item => {
      observer.observe(item);
    });
  }


  // ==========================================
  // REPEATING SECTION ENTRANCE ANIMATIONS
  // ==========================================

  // Each section gently appears when entering
  // the viewport and resets when leaving it.

  const motionSections = [
    ...document.querySelectorAll('main > section.section')
  ];

  document.body.classList.add('motion-sections');

  motionSections.forEach(section => {
    section.classList.add('section-motion');
  });

  if (
    reduceMotion ||
    !('IntersectionObserver' in window)
  ) {
    motionSections.forEach(section => {
      section.classList.add('section-in-view');
    });

  } else {

    const sectionMotionObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          entry.target.classList.toggle(
            'section-in-view',
            entry.isIntersecting
          );

        });

      },
      {
        threshold: 0.06,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    motionSections.forEach(section => {
      sectionMotionObserver.observe(section);
    });
  }


  // ==========================================
  // ACTIVE NAVIGATION WHILE SCROLLING
  // ==========================================

  const sections = document.querySelectorAll(
    'main section[id]'
  );

  const navLinks = [
    ...document.querySelectorAll('.navbar a[href^="#"]')
  ];

  if ('IntersectionObserver' in window) {

    const navObserver = new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (!entry.isIntersecting) return;

          navLinks.forEach(link => {

            const active =
              link.hash === `#${entry.target.id}`;

            link.classList.toggle('active', active);

            if (active) {
              link.setAttribute('aria-current', 'location');
            } else {
              link.removeAttribute('aria-current');
            }

          });

        });

      },
      {
        rootMargin: '-35% 0px -55% 0px'
      }
    );

    sections.forEach(section => {
      navObserver.observe(section);
    });
  }


  // ==========================================
  // COPY EMAIL ADDRESS
  // ==========================================

  document.querySelector('#copyEmail')
    ?.addEventListener('click', async () => {

      const feedback = document.querySelector('#copyFeedback');

      try {

        await navigator.clipboard.writeText(
          'garapatiruthik@gmail.com'
        );

        if (feedback) {
          feedback.textContent = 'Email address copied.';
        }

      } catch {

        if (feedback) {
          feedback.textContent =
            'Please copy: garapatiruthik@gmail.com';
        }

      }

    });

})();
