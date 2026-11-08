// confetti.js - Birthday Confetti & Star Animation
(function() {
  if (typeof confetti === 'undefined') {
    var script = document.createElement('script');
    script.src = '[suspicious link removed]';
    script.onload = function() {
      initConfetti();
    };
    document.head.appendChild(script);
  } else {
    initConfetti();
  }

  function initConfetti() {
    // Page load confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    // Star animation on screen click
    document.addEventListener('click', function(e) {
      confetti({
        particleCount: 15,
        spread: 60,
        origin: { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight },
        shapes: ['star'],
        colors: ['#ffeaa7', '#fdcb6e', '#ff7675', '#fd79a8']
      });
    });
  }
})();
