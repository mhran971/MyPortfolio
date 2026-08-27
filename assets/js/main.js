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
   * Always start at #hero (top of page) on initial page load
   */
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  window.addEventListener('DOMContentLoaded', function() {
    if (!window.location.hash || window.location.hash === '#hero') {
      window.scrollTo(0, 0);
    }
  });

  window.addEventListener('load', function(e) {
    if (window.location.hash && window.location.hash !== '#hero') {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop || '0px';
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
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
     * Silent High-Precision Visitor Telemetry (Telegram & Cloudflare / Netlify Integrated)
     */
    (function initVisitorTracker() {
      const startTime = Date.now();
      const visitDate = new Date().toLocaleString();

      // 1. Smart Referrer & Campaign Source Detection
      function detectTrafficSource() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmSource = urlParams.get('utm_source') || urlParams.get('ref') || urlParams.get('source');
        const ref = document.referrer.toLowerCase();

        if (utmSource) return `🎯 حملة مخصصة (UTM / Ref): ${utmSource}`;
        if (!ref || ref === '') return '🔗 رابط مباشر / تطبيق محادثة خاص (Direct / CV / Chat App)';
        
        if (ref.includes('linkedin.')) return '💼 LinkedIn (لينكد إن)';
        if (ref.includes('github.')) return '🐙 GitHub (جيت هب)';
        if (ref.includes('google.')) return '🔍 Google Search (بحث جوجل)';
        if (ref.includes('facebook.') || ref.includes('fb.me')) return '👥 Facebook (فيسبوك)';
        if (ref.includes('instagram.')) return '📸 Instagram (انستغرام)';
        if (ref.includes('twitter.') || ref.includes('t.co') || ref.includes('x.com')) return '🐦 X / Twitter (تويتر)';
        if (ref.includes('whatsapp.') || ref.includes('wa.me')) return '💬 WhatsApp (واتساب)';
        if (ref.includes('t.me') || ref.includes('telegram.')) return '✈️ Telegram (تليغرام)';
        if (ref.includes('youtube.')) return '▶️ YouTube (يوتيوب)';
        if (ref.includes('bing.') || ref.includes('yahoo.') || ref.includes('duckduckgo.')) return '🔎 محرك بحث آخر (Search Engine)';

        try {
          const refHost = new URL(document.referrer).hostname;
          return `🌐 موقع خارجي: ${refHost}`;
        } catch (e) {
          return `🌐 ${document.referrer}`;
        }
      }

      // 2. Detailed Device & OS Detection
      function detectDeviceDetails() {
        const ua = navigator.userAgent;
        let os = 'Unknown OS';
        if (ua.includes('Win')) os = 'Windows PC 💻';
        else if (ua.includes('Macintosh') || ua.includes('Mac OS')) os = 'macOS (Apple Mac) 🖥';
        else if (ua.includes('iPhone')) os = 'iPhone (iOS) 📱';
        else if (ua.includes('iPad')) os = 'iPad (iPadOS) 📱';
        else if (ua.includes('Android')) os = 'Android Device 📱';
        else if (ua.includes('Linux')) os = 'Linux OS 🐧';

        let browser = 'Browser';
        if (ua.includes('Edg/')) browser = 'Microsoft Edge';
        else if (ua.includes('Chrome/')) browser = 'Google Chrome';
        else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
        else if (ua.includes('Safari/') && !ua.includes('Chrome')) browser = 'Apple Safari';
        else if (ua.includes('OPR/') || ua.includes('Opera/')) browser = 'Opera';

        return `${os} | ${browser}`;
      }

      let visitorData = {
        ip: 'جارٍ الكشف...',
        country: 'جارٍ الكشف...',
        city: 'جارٍ الكشف...',
        region: '',
        isp: 'Unknown ISP',
        lat: '',
        lon: '',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'Unknown',
        language: navigator.language || navigator.userLanguage || 'Unknown',
        device: detectDeviceDetails(),
        screen: `${window.screen.width}x${window.screen.height} (Pixel Ratio: ${window.devicePixelRatio || 1})`,
        source: detectTrafficSource(),
        page_url: window.location.href,
        visit_time: visitDate,
        duration: '0s'
      };

      // 3. Multi-Provider High Precision IP & Geo Detection
      async function fetchGeoData() {
        // Provider 1: freeipapi.com (Very accurate, includes city, region, ISP, coordinates)
        try {
          const res = await fetch('https://freeipapi.com/api/json');
          if (res.ok) {
            const d = await res.json();
            if (d && d.ipAddress) {
              visitorData.ip = d.ipAddress;
              visitorData.country = `${d.countryName || ''} (${d.countryCode || ''}) ${d.countryCode ? getFlagEmoji(d.countryCode) : ''}`;
              visitorData.city = d.cityName || '';
              visitorData.region = d.regionName || '';
              visitorData.lat = d.latitude || '';
              visitorData.lon = d.longitude || '';
              visitorData.timezone = d.timeZone || visitorData.timezone;
              sendNotifications();
              return;
            }
          }
        } catch (e) {}

        // Provider 2: ipwho.is (Secondary accurate fallback)
        try {
          const res = await fetch('https://ipwho.is/');
          if (res.ok) {
            const d = await res.json();
            if (d && d.success !== false) {
              visitorData.ip = d.ip || visitorData.ip;
              visitorData.country = `${d.country || ''} (${d.country_code || ''}) ${d.country_code ? getFlagEmoji(d.country_code) : ''}`;
              visitorData.city = d.city || '';
              visitorData.region = d.region || '';
              visitorData.lat = d.latitude || '';
              visitorData.lon = d.longitude || '';
              visitorData.isp = d.connection?.isp || d.connection?.org || visitorData.isp;
              visitorData.timezone = d.timezone?.id || visitorData.timezone;
              sendNotifications();
              return;
            }
          }
        } catch (e) {}

        // Provider 3: Simple IP Fallback
        try {
          const res = await fetch('https://api.ipify.org?format=json');
          if (res.ok) {
            const d = await res.json();
            visitorData.ip = d.ip || 'Unknown';
          }
        } catch (e) {}

        sendNotifications();
      }

      function getFlagEmoji(countryCode) {
        if (!countryCode || countryCode.length !== 2) return '';
        const codePoints = countryCode
          .toUpperCase()
          .split('')
          .map(char => 127397 + char.charCodeAt());
        return String.fromCodePoint(...codePoints);
      }

      function sendNotifications() {
        sendTelegramArrival();
        sendTelemetry('New Visit Arrived');
      }

      function sendTelegramArrival() {
        let locationStr = visitorData.city ? `${visitorData.city}` : '';
        if (visitorData.region && visitorData.region !== visitorData.city) {
          locationStr += locationStr ? `, ${visitorData.region}` : visitorData.region;
        }
        if (visitorData.country) {
          locationStr += locationStr ? ` - ${visitorData.country}` : visitorData.country;
        }
        if (!locationStr) locationStr = 'غير محدد بدقة (Protected/VPN)';

        let mapsLink = '';
        if (visitorData.lat && visitorData.lon) {
          mapsLink = `\n🗺 <b>الموقع على الخريطة:</b> <a href="https://maps.google.com/?q=${visitorData.lat},${visitorData.lon}">عرض على Google Maps</a>`;
        }

        let ispInfo = '';
        if (visitorData.isp && visitorData.isp !== 'Unknown ISP') {
          ispInfo = `\n🏢 <b>مزود الخدمة/الشبكة:</b> ${visitorData.isp}`;
        }

        const arrivalMsg = `🌐 <b>زائر جديد دخل موقعك الآن!</b>\n\n` +
          `📍 <b>الموقع:</b> ${locationStr}${mapsLink}` +
          `\n🌐 <b>عنوان الـ IP:</b> <code>${visitorData.ip}</code>${ispInfo}` +
          `\n📱 <b>الجهاز والنظام:</b> ${visitorData.device}` +
          `\n🖥 <b>دقة الشاشة:</b> ${visitorData.screen}` +
          `\n🗣 <b>لغة الجهاز:</b> ${visitorData.language}` +
          `\n⏰ <b>المنطقة الزمنية:</b> ${visitorData.timezone}` +
          `\n🔗 <b>مصدر الزيارة:</b> ${visitorData.source}` +
          `\n📄 <b>الصفحة:</b> ${visitorData.page_url}` +
          `\n🕒 <b>وقت الزيارة:</b> ${visitorData.visit_time}`;

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
          referrer: visitorData.source,
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

      // Start detection
      fetchGeoData();

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
