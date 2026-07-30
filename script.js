/* ==========================================
   RUTIKA KOLHAPURE - SOFTWARE ENGINEER PORTFOLIO
   Vanilla JavaScript - Modular & Interactive
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initTypingEffect();
  initParticles();
  initCounters();
  initSkillBars();
  initArchitectureShowcase();
  initProjectModals();
  initGithubHeatmap();
  initContactForm();
  initScrollTop();
});

/* ==========================================
   1. LOADING SCREEN
   ========================================== */
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Fade out loader after 1.8s
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
    }, 600);
  }, 1800);
}

/* ==========================================
   2. NAVBAR & MOBILE DRAWER
   ========================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileCloseBtn = document.querySelector('.mobile-menu-close');

  // Sticky navbar shadow on scroll
  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Toggle drawer helper
  const toggleMenu = (open) => {
    if (!mobileMenu) return;
    const isOpen = open !== undefined ? open : !mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', isOpen);
    if (hamburger) hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMenu());
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', () => toggleMenu(false));
  }

  // Close mobile drawer on link click
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // Active section scroll spy
  const sections = document.querySelectorAll('section[id]');
  const navMenuLinks = document.querySelectorAll('.nav-menu a');
  const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

  const updateScrollSpy = () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navMenuLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
        mobileLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  };

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();
}

/* ==========================================
   3. TYPING ANIMATION
   ========================================== */
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const roles = [
    'Django Backend Developer',
    'AWS Cloud Engineer',
    'DevOps Enthusiast',
    'REST API Developer',
    'Python Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      typingElement.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================
   4. PARTICLES CANVAS
   ========================================== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(width / 25), 65);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.8,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(59, 130, 246, ${p.alpha})`;
      ctx.fill();

      // Connect close particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.15 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================
   5. COUNTER ANIMATION
   ========================================== */
function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseFloat(target.getAttribute('data-count'));
          const isDecimal = countTo % 1 !== 0;
          const suffix = target.getAttribute('data-suffix') || '';

          let current = 0;
          const duration = 1500;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = countTo / steps;

          const timer = setInterval(() => {
            current += increment;
            if (current >= countTo) {
              current = countTo;
              clearInterval(timer);
            }
            target.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
          }, stepTime);

          observer.unobserve(target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach(stat => observer.observe(stat));
}

/* ==========================================
   6. SKILL BARS ANIMATION & FILTER
   ========================================== */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress-bar');
  if (!skillBars.length) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const progress = bar.getAttribute('data-progress');
          bar.style.width = progress + '%';
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillBars.forEach(bar => observer.observe(bar));

  // Category filter tabs
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('btn-primary'));
      filterBtns.forEach(b => b.classList.add('btn-outline'));
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');

      const filter = btn.getAttribute('data-category');

      skillCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================
   7. ARCHITECTURE SHOWCASE SWITCHER
   ========================================== */
const archData = {
  costOptimizer: {
    title: 'AWS Resource Lifecycle & Cost Optimization Architecture',
    subtitle: 'Serverless event-driven architecture that continuously identifies and removes unused cloud assets.',
    flow: [
      { title: 'Amazon EventBridge', sub: 'Cron Trigger / Event', icon: 'clock' },
      { title: 'AWS Lambda', sub: 'Python Cleanup Engine', icon: 'cpu' },
      { title: 'Target Resources', sub: 'EBS / S3 / VPC / EIP', icon: 'server' },
      { title: 'CloudWatch Metrics', sub: 'Telemetry & Logs', icon: 'activity' },
      { title: 'Amazon SNS', sub: 'Email & Slack Alerting', icon: 'bell' }
    ],
    details: 'This serverless architecture operates with least-privilege IAM policies, running dry-run simulations before applying destructive cleanups to ensure maximum cost efficiency with zero unintended downtime.'
  },
  cloudScale: {
    title: 'CloudScale - High Availability Multi-AZ AWS Infrastructure',
    subtitle: 'Production-ready fault-tolerant cloud architecture with automated scaling and secure private subnets.',
    flow: [
      { title: 'Internet Gateway', sub: 'Public Edge Ingress', icon: 'globe' },
      { title: 'App Load Balancer', sub: 'SSL & Traffic Routing', icon: 'layers' },
      { title: 'Nginx Proxy Pool', sub: 'Reverse Proxy / Cache', icon: 'shield' },
      { title: 'Auto Scaling Group', sub: 'Private EC2 Instances', icon: 'cpu' },
      { title: 'RDS MySQL Multi-AZ', sub: 'Primary & Replica DB', icon: 'database' }
    ],
    details: 'Implements custom VPC isolation, bastion host access controls, private subnet EC2 execution, and multi-availability-zone failover redundancy.'
  },
  neuroScope: {
    title: 'NeuroScope-AI Multi-Modal Healthcare Pipeline',
    subtitle: 'Integrated AI diagnostic engine fusing facial landmark, speech analysis, and movement signals.',
    flow: [
      { title: 'Patient Ingress', sub: 'React Interface', icon: 'user' },
      { title: 'FastAPI Backend', sub: 'Async Gateway', icon: 'zap' },
      { title: 'Signal Extractor', sub: 'MediaPipe & Parselmouth', icon: 'eye' },
      { title: 'Feature Fusion', sub: 'Multi-Modal Vectorizer', icon: 'git-merge' },
      { title: 'Ensemble ML', sub: 'Random Forest & SVM', icon: 'cpu' }
    ],
    details: 'Processes high-frequency speech acoustics (pitch jitter, shimmer) and facial biomechanics simultaneously to increase Parkinson\'s detection accuracy.'
  },
  hireFlow: {
    title: 'HireFlow Talent Assessment Engine Architecture',
    subtitle: 'AI-driven candidate verification, resume parser, and fraud detection framework.',
    flow: [
      { title: 'Resume & Repo', sub: 'Candidate Submissions', icon: 'file-text' },
      { title: 'Django REST Engine', sub: 'JWT Authentication', icon: 'lock' },
      { title: 'GitHub Inspector', sub: 'Code Audit API', icon: 'github' },
      { title: 'Trust Score AI', sub: 'Fraud Detection Engine', icon: 'check-circle' },
      { title: 'Employer Portal', sub: 'Analytics Dashboard', icon: 'bar-chart-2' }
    ],
    details: 'Utilizes GitHub commit analysis and resume text verification to identify high-potential candidates while suppressing fraudulent profiles.'
  }
};

function initArchitectureShowcase() {
  const archButtons = document.querySelectorAll('.arch-btn');
  const archTitle = document.getElementById('arch-title');
  const archSubtitle = document.getElementById('arch-subtitle');
  const archCanvas = document.getElementById('arch-canvas');
  const archDetailsText = document.getElementById('arch-details-text');

  if (!archCanvas) return;

  function renderArchitecture(key) {
    const data = archData[key];
    if (!data) return;

    archTitle.textContent = data.title;
    archSubtitle.textContent = data.subtitle;
    archDetailsText.textContent = data.details;

    const svgIcons = {
      clock: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
      cpu: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"/></svg>`,
      server: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/></svg>`,
      activity: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      bell: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
      globe: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
      layers: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
      shield: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      database: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
      user: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
      zap: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
      eye: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
      'git-merge': `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>`,
      'file-text': `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      lock: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
      github: `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`,
      'check-circle': `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
      'bar-chart-2': `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`
    };

    let html = `<div class="diagram-nodes-flow">`;

    data.flow.forEach((step, idx) => {
      html += `
        <div class="arch-node ${idx === 1 ? 'active' : ''}">
          <div class="arch-node-icon">${svgIcons[step.icon] || ''}</div>
          <div class="arch-node-title">${step.title}</div>
          <div class="arch-node-sub">${step.sub}</div>
        </div>
      `;

      if (idx < data.flow.length - 1) {
        html += `
          <div class="arch-arrow">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </div>
        `;
      }
    });

    html += `</div>`;
    archCanvas.innerHTML = html;
  }

  archButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      archButtons.forEach(b => b.classList.remove('btn-primary'));
      archButtons.forEach(b => b.classList.add('btn-outline'));
      btn.classList.remove('btn-outline');
      btn.classList.add('btn-primary');

      const key = btn.getAttribute('data-arch');
      renderArchitecture(key);
    });
  });

  // Default render
  renderArchitecture('costOptimizer');
}

/* ==========================================
   8. PROJECT MODALS
   ========================================== */
function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-body-content');
  const modalClose = document.getElementById('modal-close-btn');

  if (!modalOverlay || !modalContent) return;

  const projectDetailsMap = {
    hireflow: {
      title: 'HireFlow - Talent Assessment Platform',
      tech: 'Python, Django REST Framework, React, MySQL, JWT, GitHub REST API',
      challenges: [
        'Preventing resume fraud and automated bot applications',
        'Parsing diverse resume formats (PDF, DOCX) into normalized schema',
        'Evaluating GitHub commit frequencies and repository quality'
      ],
      solutions: [
        'Implemented custom JWT-secured endpoint with rate limiting',
        'Built a Trust Score engine combining GitHub metrics & skill validation',
        'Designed role-based dashboard for recruiters and candidates'
      ]
    },
    awsOptimizer: {
      title: 'AWS Resource Lifecycle & Cost Optimizer',
      tech: 'AWS Lambda, EventBridge, CloudWatch, SNS, Boto3 SDK, IAM',
      challenges: [
        'Safely identifying orphaned EBS snapshots and unattached Elastic IPs',
        'Ensuring zero accidental termination of critical production assets',
        'Formatting complex automated cost reports into human-readable alerts'
      ],
      solutions: [
        'Engineered a Dry Run safety mode for testing cleanup scripts',
        'Utilized resource tags and Amazon EventBridge scheduled triggers',
        'Configured SNS topics for multi-channel notifications (Email/Slack)'
      ]
    },
    cloudScale: {
      title: 'CloudScale - High Availability AWS Infrastructure',
      tech: 'Custom VPC, Application Load Balancer, Auto Scaling, Nginx, Bastion Host',
      challenges: [
        'Structuring multi-AZ subnets for high availability and failover',
        'Configuring Nginx reverse proxy headers for secure HTTPS termination',
        'Achieving automated scale-up under peak HTTP traffic load'
      ],
      solutions: [
        'Created isolated private subnets for application servers behind ALB',
        'Defined Auto Scaling policies based on average target CPU utilization',
        'Established SSH Bastion hosts for secure administrator access'
      ]
    },
    neuroScope: {
      title: 'NeuroScope-AI - Parkinson\'s Detection Engine',
      tech: 'Python, FastAPI, MediaPipe, Parselmouth, Praat, Scikit-Learn, SVM',
      challenges: [
        'Fusing heterogeneous bio-signals (speech audio + 3D facial landmarks)',
        'Minimizing noise in voice recordings captured over standard webcams',
        'Delivering sub-second latency for real-time webcam inference'
      ],
      solutions: [
        'Extracted acoustic features (jitter, shimmer, HNR) via Parselmouth/Praat',
        'Trained Random Forest and SVM classifiers with feature normalization',
        'Exposed async FastAPI endpoints for zero-lag streaming analysis'
      ]
    },
    agroOptics: {
      title: 'Agro-Optics - AI Agricultural Decision Support',
      tech: 'Python, Flask, TensorFlow, CNN, OpenCV, Weather API, SQLite',
      challenges: [
        'Accurately classifying soil types under variable outdoor lighting',
        'Integrating real-time weather API telemetry into crop recommendation algorithms'
      ],
      solutions: [
        'Trained Convolutional Neural Networks on agricultural leaf & soil datasets',
        'Built NPK nutrient estimation model based on historical yield data',
        'Created clean Flask REST API with query history storage in SQLite'
      ]
    }
  };

  document.querySelectorAll('.open-project-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const pKey = btn.getAttribute('data-project');
      const details = projectDetailsMap[pKey];

      if (!details) return;

      modalContent.innerHTML = `
        <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: var(--text-main);">${details.title}</h3>
        <p style="font-family: var(--font-code); font-size: 0.85rem; color: var(--accent); margin-bottom: 1.5rem;">Stack: ${details.tech}</p>
        
        <div style="margin-bottom: 1.5rem;">
          <h4 style="font-size: 1.1rem; color: var(--warning); margin-bottom: 0.5rem;">Key Engineering Challenges</h4>
          <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
            ${details.challenges.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 style="font-size: 1.1rem; color: var(--success); margin-bottom: 0.5rem;">Architectural Solutions</h4>
          <ul style="padding-left: 1.2rem; color: var(--text-secondary); line-height: 1.7;">
            ${details.solutions.map(s => `<li>${s}</li>`).join('')}
          </ul>
        </div>
      `;

      modalOverlay.classList.add('open');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });
  }

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('open');
    }
  });
}

/* ==========================================
   9. GITHUB HEATMAP GENERATOR
   ========================================== */
function initGithubHeatmap() {
  const heatmapGrid = document.getElementById('heatmap-grid');
  if (!heatmapGrid) return;

  let html = '';
  // Generate 52 weeks (cols) x 7 days (rows)
  for (let w = 0; w < 52; w++) {
    html += `<div class="heatmap-col">`;
    for (let d = 0; d < 7; d++) {
      const rand = Math.random();
      let levelClass = '';
      if (rand > 0.85) levelClass = 'lvl-4';
      else if (rand > 0.65) levelClass = 'lvl-3';
      else if (rand > 0.45) levelClass = 'lvl-2';
      else if (rand > 0.25) levelClass = 'lvl-1';

      html += `<div class="heatmap-cell ${levelClass}" title="Contributions on week ${w + 1}"></div>`;
    }
    html += `</div>`;
  }

  heatmapGrid.innerHTML = html;
}

/* ==========================================
   10. CONTACT FORM & TOASTS
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    // e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      showToast('Thank you! Your message has been sent successfully.', 'success');
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1200);
  });
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="color: var(--success);"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================
   11. BACK TO TOP
   ========================================== */
function initScrollTop() {
  const topBtn = document.getElementById('back-to-top');
  if (!topBtn) return;

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
