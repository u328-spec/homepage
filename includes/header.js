(function() {
  var scrollThreshold = 50;

  function loadHeader() {
    var el = document.getElementById('site-header');
    if (!el) return;
    fetch('includes/header.html')
      .then(function(r) { return r.text(); })
      .then(function(html) {
        el.innerHTML = html;
        initHeaderBehavior();
      });
  }

  function initHeaderBehavior() {
    var header = document.getElementById('header');
    if (header) {
      function updateHeader() {
        header.classList.toggle('scrolled', window.scrollY > scrollThreshold);
      }
      window.addEventListener('scroll', updateHeader);
      updateHeader();
    }

    var btn = document.getElementById('mobile-menu-btn');
    var menu = document.getElementById('mobile-menu');
    var closeBtn = document.getElementById('mobile-menu-close');
    if (!btn || !menu) return;

    function openMenu() {
      menu.classList.remove('hidden');
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', '메뉴 닫기');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      menu.classList.add('hidden');
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', '메뉴 열기');
      document.body.style.overflow = '';
    }

    btn.addEventListener('click', function() {
      if (menu.classList.contains('hidden')) openMenu();
      else closeMenu();
    });
    if (closeBtn) closeBtn.addEventListener('click', closeMenu);
    menu.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', closeMenu);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
  } else {
    loadHeader();
  }
})();
