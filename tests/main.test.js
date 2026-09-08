const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');

const scriptPath = path.resolve(__dirname, '../assets/js/main.js');
const scriptContent = fs.readFileSync(scriptPath, 'utf8');

function baseMarkup(extra = '') {
  return `
    <button class="header-toggle bi-list"></button>
    <header id="header"></header>
    <nav id="navmenu"><a href="#section1">Go</a></nav>
    <a class="scroll-top" href="#"></a>
    ${extra}
  `;
}

function setupDom({ html = baseMarkup(), url = 'https://example.test/' } = {}) {
  const dom = new JSDOM(`<!DOCTYPE html><html><body>${html}</body></html>`, {
    url,
    runScripts: 'outside-only'
  });

  const { window } = dom;
  const spies = {
    scrollCalls: [],
    aosInitCalls: 0,
    typedCalls: 0,
    pureCounterCalls: 0,
    waypointCalls: 0,
    glightboxCalls: 0,
    isotopeArrangeCalls: 0,
    swiperCalls: 0
  };

  window.scrollTo = (opts, y) => {
    if (typeof opts === 'object' && opts !== null) {
      spies.scrollCalls.push(opts);
    } else {
      spies.scrollCalls.push({ top: y !== undefined ? y : opts, left: opts });
    }
  };

  Object.defineProperty(window, 'scrollY', {
    value: 0,
    writable: true,
    configurable: true
  });

  window.AOS = {
    init: () => {
      spies.aosInitCalls += 1;
    }
  };

  window.Typed = function Typed() {
    spies.typedCalls += 1;
  };

  window.PureCounter = function PureCounter() {
    spies.pureCounterCalls += 1;
  };

  window.Waypoint = function Waypoint() {
    spies.waypointCalls += 1;
  };

  window.GLightbox = function GLightbox() {
    spies.glightboxCalls += 1;
    return {};
  };

  window.imagesLoaded = (_el, cb) => cb();

  window.Isotope = function Isotope() {
    this.arrange = () => {
      spies.isotopeArrangeCalls += 1;
    };
  };

  window.Swiper = function Swiper() {
    spies.swiperCalls += 1;
  };

  window.eval(scriptContent);

  return { dom, window, document: window.document, spies };
}

test('header toggle button and nav link close mobile menu', () => {
  const { document } = setupDom();

  const header = document.querySelector('#header');
  const toggleBtn = document.querySelector('.header-toggle');
  const navLink = document.querySelector('#navmenu a');

  toggleBtn.dispatchEvent(new document.defaultView.MouseEvent('click', { bubbles: true }));

  assert.equal(header.classList.contains('header-show'), true);
  assert.equal(toggleBtn.classList.contains('bi-x'), true);
  assert.equal(toggleBtn.classList.contains('bi-list'), false);

  navLink.dispatchEvent(new document.defaultView.MouseEvent('click', { bubbles: true }));

  assert.equal(header.classList.contains('header-show'), false);
  assert.equal(toggleBtn.classList.contains('bi-list'), true);
});

test('scroll top visibility toggles with scroll and click scrolls to top', () => {
  const { window, document, spies } = setupDom();

  const scrollTop = document.querySelector('.scroll-top');

  window.scrollY = 150;
  document.dispatchEvent(new window.Event('scroll'));
  assert.equal(scrollTop.classList.contains('active'), true);

  window.scrollY = 0;
  document.dispatchEvent(new window.Event('scroll'));
  assert.equal(scrollTop.classList.contains('active'), false);

  spies.scrollCalls.length = 0;
  scrollTop.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  assert.equal(spies.scrollCalls[0].top, 0);
  assert.equal(spies.scrollCalls[0].behavior, 'smooth');
});

test('smooth anchor scrolling skips # and scrolls to valid target on DOMContentLoaded', () => {
  const html = baseMarkup(`
    <a id="skip" href="#">Skip</a>
    <a id="anchor" href="#section1">Section 1</a>
    <section id="section1" style="scroll-margin-top: 30px;"></section>
  `);

  const { window, document, spies } = setupDom({ html });
  const section = document.querySelector('#section1');

  Object.defineProperty(section, 'offsetTop', { value: 500, configurable: true });

  document.dispatchEvent(new window.Event('DOMContentLoaded', { bubbles: true }));

  spies.scrollCalls.length = 0;
  document.querySelector('#skip').dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  assert.equal(spies.scrollCalls.length, 0);

  document.querySelector('#anchor').dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
  assert.equal(spies.scrollCalls[0].top, 430);
  assert.equal(spies.scrollCalls[0].behavior, 'smooth');
});

test('hash-based load scroll and navmenu scrollspy behavior', async () => {
  const html = `
    <button class="header-toggle bi-list"></button>
    <header id="header"></header>
    <nav id="navmenu" class="navmenu">
      <a id="link1" href="#section1">S1</a>
      <a id="link2" href="#section2">S2</a>
    </nav>
    <a class="scroll-top" href="#"></a>
    <section id="section1" style="scroll-margin-top: 30px;"></section>
    <section id="section2"></section>
  `;

  const { window, document, spies } = setupDom({ html, url: 'https://example.test/#section1' });

  const section1 = document.querySelector('#section1');
  const section2 = document.querySelector('#section2');

  Object.defineProperty(section1, 'offsetTop', { value: 300, configurable: true });
  Object.defineProperty(section1, 'offsetHeight', { value: 400, configurable: true });
  Object.defineProperty(section2, 'offsetTop', { value: 1000, configurable: true });
  Object.defineProperty(section2, 'offsetHeight', { value: 400, configurable: true });

  spies.scrollCalls.length = 0;
  window.dispatchEvent(new window.Event('load'));
  await new Promise((resolve) => setTimeout(resolve, 130));

  assert.equal(spies.scrollCalls[0].top, 270);
  assert.equal(spies.scrollCalls[0].behavior, 'smooth');

  window.scrollY = 150;
  document.dispatchEvent(new window.Event('scroll'));
  assert.equal(document.querySelector('#link1').classList.contains('active'), true);
  assert.equal(document.querySelector('#link2').classList.contains('active'), false);

  window.scrollY = 900;
  document.dispatchEvent(new window.Event('scroll'));
  assert.equal(document.querySelector('#link1').classList.contains('active'), false);
  assert.equal(document.querySelector('#link2').classList.contains('active'), true);
});
