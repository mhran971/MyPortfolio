/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    document.querySelector('#header').classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }
  headerToggleBtn.addEventListener('click', headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-in-out',
        once: true,
        mirror: false
      });
    }
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  function initTyped() {
    const selectTyped = document.querySelector('.typed');
    if (selectTyped && typeof Typed !== 'undefined') {
      let typed_strings = selectTyped.getAttribute('data-typed-items');
      if (typed_strings) {
        typed_strings = typed_strings.split(',');
        new Typed('.typed', {
          strings: typed_strings,
          loop: true,
          typeSpeed: 100,
          backSpeed: 50,
          backDelay: 2000
        });
      }
    }
  }
  window.addEventListener('load', initTyped);

  /**
   * Initiate Pure Counter
   */
  if (typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    if (typeof Waypoint !== 'undefined') {
      new Waypoint({
        element: item,
        offset: '80%',
        handler: function(direction) {
          let progress = item.querySelectorAll('.progress .progress-bar');
          progress.forEach(el => {
            el.style.width = el.getAttribute('aria-valuenow') + '%';
          });
        }
      });
    }
  });

  /**
   * Initiate glightbox
   */
  if (typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({
      selector: '.glightbox'
    });
  }

  /**
   * Init isotope layout and filters
   */
  function initIsotopeLayout() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';
      let container = isotopeItem.querySelector('.isotope-container');

      if (!container || typeof Isotope === 'undefined') return;

      let initIsotope = null;

      function createIsotope() {
        if (!initIsotope) {
          initIsotope = new Isotope(container, {
            itemSelector: '.isotope-item',
            layoutMode: layout,
            filter: filter,
            sortBy: sort
          });
        }
      }

      if (typeof imagesLoaded !== 'undefined') {
        imagesLoaded(container, function() {
          createIsotope();
        });
      } else {
        createIsotope();
      }

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filterBtn) {
        filterBtn.addEventListener('click', function() {
          let activeBtn = isotopeItem.querySelector('.isotope-filters .filter-active');
          if (activeBtn) activeBtn.classList.remove('filter-active');
          this.classList.add('filter-active');

          if (!initIsotope) {
            createIsotope();
          }

          if (initIsotope) {
            initIsotope.arrange({
              filter: this.getAttribute('data-filter')
            });
          }

          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  }
  window.addEventListener('load', initIsotopeLayout);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    if (typeof Swiper === 'undefined') return;
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let configElement = swiperElement.querySelector(".swiper-config");
      if (!configElement) return;
      let config = JSON.parse(configElement.innerHTML.trim());

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Smooth scrolling for navigation links
   */
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 70,
            behavior: "smooth",
          });
        }
      });
    });

    /**
     * Calculate Age dynamically from 2001-06-01
     */
    const ageElement = document.querySelector('#dynamic-age');
    if (ageElement) {
      const birthDate = new Date(2001, 5, 1); // 1 June 2001
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      ageElement.textContent = age;
    }

    /**
     * Telegram Notification Helper Configuration
     */
    const TELEGRAM_CONFIG = {
      botToken: '8654069880:AAHHgwu-OKmgbk4JwgI2qG-OGNZwLgHnlGI', // أدخل Token البوت هنا مثل: '123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ'
      chatId: '843170891',   // أدخل Chat ID الخاص بك هنا مثل: '123456789'
    };

    function sendTelegramAlert(htmlMessage) {
      if (!TELEGRAM_CONFIG.botToken || !TELEGRAM_CONFIG.chatId) return Promise.resolve(false);
      const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.botToken}/sendMessage`;
      return fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CONFIG.chatId,
          text: htmlMessage,
          parse_mode: 'HTML'
        })
      }).catch((err) => console.warn('Telegram notification error:', err));
    }

    /**
     * Contact Form Submission (Telegram & Netlify Dual Support)
     */
    const contactForm = document.querySelector('form[name="contact"]');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const loading = contactForm.querySelector('.loading');
        const errorMessage = contactForm.querySelector('.error-message');
        const sentMessage = contactForm.querySelector('.sent-message');

        if (loading) loading.style.display = 'block';
        if (errorMessage) errorMessage.style.display = 'none';
        if (sentMessage) sentMessage.style.display = 'none';

        const formData = new FormData(contactForm);
        const name = formData.get('name') || 'Anonymous';
        const email = formData.get('email') || 'No Email';
        const subject = formData.get('subject') || 'General Contact';
        const message = formData.get('message') || '';

        const telegramMsg = `📩 <b>رسالة تواصل جديدة عبر الموقع!</b>\n\n` +
          `👤 <b>الاسم:</b> ${name}\n` +
          `📧 <b>البريد:</b> ${email}\n` +
          `🏷 <b>الموضوع:</b> ${subject}\n\n` +
          `💬 <b>الرسالة:</b>\n${message}`;

        // Send to Telegram
        sendTelegramAlert(telegramMsg);

        // Also submit to server / Netlify if available
        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        })
        .then(() => {
          if (loading) loading.style.display = 'none';
          if (sentMessage) {
            sentMessage.textContent = 'Your message has been sent successfully! Thank you.';
            sentMessage.style.display = 'block';
          }
          contactForm.reset();
        })
        .catch(() => {
          // If Netlify/server post fails, as long as form was submitted
          if (loading) loading.style.display = 'none';
          if (sentMessage) {
            sentMessage.textContent = 'Your message has been sent successfully! Thank you.';
            sentMessage.style.display = 'block';
          }
          contactForm.reset();
        });
      });
    }

    /**
     * Silent Visitor Telemetry (Telegram & Cloudflare / Netlify Integrated)
     */
    (function initVisitorTracker() {
      const startTime = Date.now();
      const visitDate = new Date().toLocaleString();
      let visitorData = {
        ip: 'Detecting...',
        country: 'Detecting...',
        city: 'Detecting...',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
        device: /Mobi|Android|iPhone/i.test(navigator.userAgent) ? '📱 Mobile' : '💻 Desktop',
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : (navigator.userAgent.includes('Firefox') ? 'Firefox' : (navigator.userAgent.includes('Safari') ? 'Safari' : 'Browser')),
        screen: `${window.screen.width}x${window.screen.height}`,
        referrer: document.referrer || 'Direct Visit',
        visit_time: visitDate,
        duration: '0s'
      };

      // Fetch IP & Geo data quietly
      if (typeof fetch !== 'undefined') {
        fetch('https://ipwho.is/')
          .then((res) => res.json())
          .then((data) => {
            if (data && data.success !== false) {
              visitorData.ip = data.ip || 'Unknown';
              visitorData.country = `${data.country || 'Unknown'} (${data.country_code || ''})`;
              visitorData.city = `${data.city || ''}, ${data.region || ''}`;
              visitorData.timezone = data.timezone?.id || visitorData.timezone;
            }
            sendTelegramArrival();
            sendTelemetry('New Visit Arrived');
          })
          .catch(() => {
            fetch('https://api.ipify.org?format=json')
              .then((r) => r.json())
              .then((ipData) => {
                visitorData.ip = ipData.ip || 'Unknown';
                sendTelegramArrival();
                sendTelemetry('New Visit Arrived');
              })
              .catch(() => {
                sendTelegramArrival();
                sendTelemetry('New Visit Arrived');
              });
          });
      }

      function sendTelegramArrival() {
        const arrivalMsg = `🌐 <b>زائر جديد دخل موقعك الآن!</b>\n\n` +
          `📍 <b>الموقع:</b> ${visitorData.city} - ${visitorData.country}\n` +
          `🌐 <b>عنوان الـ IP:</b> <code>${visitorData.ip}</code>\n` +
          `📱 <b>الجهاز:</b> ${visitorData.device} (${visitorData.browser})\n` +
          `🖥 <b>دقة الشاشة:</b> ${visitorData.screen}\n` +
          `🔗 <b>مصدر الزيارة:</b> ${visitorData.referrer}\n` +
          `⏰ <b>الوقت:</b> ${visitorData.visit_time}`;

        sendTelegramAlert(arrivalMsg);
      }

      function formatDuration(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        if (minutes > 0) {
          return `${minutes}m ${seconds}s`;
        }
        return `${seconds}s`;
      }

      function sendTelemetry(status = 'Active') {
        const elapsed = Date.now() - startTime;
        visitorData.duration = formatDuration(elapsed);

        const params = new URLSearchParams({
          'form-name': 'visitor-tracker',
          ip: visitorData.ip,
          country: visitorData.country,
          city: visitorData.city,
          timezone: visitorData.timezone,
          device: visitorData.device,
          screen_resolution: visitorData.screen,
          referrer: visitorData.referrer,
          visit_time: visitorData.visit_time,
          duration: visitorData.duration,
          status: status
        });

        if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
          navigator.sendBeacon('/', params);
        } else if (typeof fetch !== 'undefined') {
          fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: params.toString(),
            keepalive: true
          }).catch(() => {});
        }
      }

      // Send update when user stays on the site
      setTimeout(() => sendTelemetry('Stayed 30s'), 30000);
      setTimeout(() => sendTelemetry('Stayed 2min'), 120000);

      // Send final duration upon leaving
      window.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          sendTelemetry('Left Page');
        }
      });
      window.addEventListener('pagehide', () => sendTelemetry('Left Page'));
    })();
  });

})();
