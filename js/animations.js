/* ============================================
   v4sil.sec - Custom Animations JS
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

// Glitch effect on banner title
const bannerTitle = document.querySelector('.banner-title');
if (bannerTitle) {
  bannerTitle.setAttribute('data-text', bannerTitle.textContent);
}

  // ---------------------------
  // 1. Fade-in on scroll
  // ---------------------------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 100); // stagger cards slightly
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.card').forEach(card => {
    observer.observe(card);
  });


  // ---------------------------
  // 2. Smooth navbar on scroll
  // ---------------------------
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }


  // ---------------------------
  // 3. Cursor trail effect
  // ---------------------------
  const canvas = document.createElement('canvas');
  canvas.id = 'cursor-trail';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const particles = [];
  let mouse = { x: 0, y: 0 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    for (let i = 0; i < 3; i++) {
      particles.push({
        x: mouse.x,
        y: mouse.y,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        alpha: 0.7,
        size: Math.random() * 3 + 1,
        color: Math.random() > 0.5 ? '0, 180, 216' : '72, 202, 228'
      });
    }
  });

  function animateTrail() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.025;
      p.size *= 0.97;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
      ctx.fill();
    }

    requestAnimationFrame(animateTrail);
  }

  animateTrail();

});
