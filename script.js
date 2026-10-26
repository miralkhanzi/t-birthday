(function () {
  'use strict';

  /* =======================================================
     1. CONFETTI — pink & lavender
     ======================================================= */
  const COLORS = ['#FFB6D5', '#FF9CC8', '#FFE1EE', '#C7B6FF', '#E4DBFF', '#FFFFFF'];

  // Check whether the CDN library loaded successfully
  function confettiReady() {
    return typeof window.confetti === 'function';
  }

  /**
   * Fire a confetti burst.
   * @param {number} x     horizontal position (0–1)
   * @param {number} y     vertical position (0–1)
   * @param {number} angle direction of the burst (degrees)
   */
  function fire(x, y, angle) {
    if (!confettiReady()) return;
    window.confetti({
      particleCount: 58,
      spread: 68,
      angle: angle,
      startVelocity: 38,
      origin: { x: x, y: y },
      colors: COLORS,
      scalar: 0.85,
      gravity: 0.9,
      ticks: 190,
      disableForReducedMotion: true // respect OS "reduce motion" setting
    });
  }

  // Opening confetti on page load (from both sides)
  window.addEventListener('load', function () {
    setTimeout(function () { fire(0.15, 0.75, 60); }, 260);
    setTimeout(function () { fire(0.85, 0.75, 120); }, 430);
  });

  /* =======================================================
     2. "CLICK ME 🥺" BUTTON — rotating playful messages
     ======================================================= */
  const btn   = document.getElementById('clickBtn');
  const msgEl = document.getElementById('btnMsg');

  const MESSAGES = [
    'You\'re like 5GHz WiFi: hard to catch, but you make everything run smoother 😭📶',
    'I tried writing you a poem. Forgot every word except your name. So: Tiara, Tiara, Tiara 🥀',
    'They say 17 is sweet. You\'re sweeter. I checked. Twice 🍯',
    'If charm were currency, you\'d buy an island. I\'m still looking for change 🏝️',
    'You gained a year, I gained haters. Not a fair trade, honestly 😪',
    'I\'d volunteer to be your neighbor\'s cat, just to hear you laugh every day 🐈',
    'The stars have nothing on your eyes. Allegedly. I haven\'t checked them all ',
    'Congrats — you\'re officially an adult. I\'m proud 🧋'
  ];

  let lastIndex = -1; // prevent the same message from repeating twice in a row

  btn.addEventListener('click', function () {
    // --- pick a random message that isn't the previous one ---
    let i = Math.floor(Math.random() * MESSAGES.length);
    if (MESSAGES.length > 1) {
      while (i === lastIndex) {
        i = Math.floor(Math.random() * MESSAGES.length);
      }
    }
    lastIndex = i;

    // --- fade-out then fade-in ---
    msgEl.classList.remove('show');
    setTimeout(function () {
      msgEl.textContent = MESSAGES[i];
      msgEl.classList.add('show');
    }, 170);

    // --- confetti bursts from the button position ---
    const r = btn.getBoundingClientRect();
    const x = (r.left + r.width  / 2) / window.innerWidth;
    const y = (r.top  + r.height / 2) / window.innerHeight;
    fire(x, y, 90);
  });

  /* =======================================================
     3. SCROLL FADE-IN (IntersectionObserver)
     ======================================================= */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target); // reveal once, then stop observing
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback for older browsers: show everything
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }
})();