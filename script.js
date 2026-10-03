/* ==========================================================================
   VARUN KUMAR SINGH — FLUTTER DEVELOPER PORTFOLIO V2
   Unique Features:
   - Web Audio SFX Engine
   - Live Flutter Widget Inspector Sandbox
   - 3D Card Tilt Engine
   - Flutter Floating Action Button (FAB) Speed Dial
   - Interactive Terminal & Phone Simulator
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initAudioSFX();
  initParticleCanvas();
  initCursorFollower();
  initMobileNav();
  initPhoneSimulator();
  initPhoneSwiping();
  initDeviceSwitcher();
  initSpotlightTracking();
  initTerminal();
  initProjectFilters();
  initWidgetInspector();
  initStateFlowVisualizer();
  initFigmaComparisonSlider();
  initAppStoreModal();
  initAIPortfolioAssistant();
  initRecruiterTour();
  initFlutterArcadeGame();
  init3DTiltEffect();
  initFABSpeedDial();
  initScrollReveal();
  initEmailCopy();
});

/* --------------------------------------------------------------------------
   0. Dual Theme Toggle System (Dark / Light)
   -------------------------------------------------------------------------- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  const icon = toggleBtn.querySelector('i');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    playSound('toggle');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcon(newTheme);
  });

  function updateIcon(theme) {
    if (!icon) return;
    if (theme === 'light') {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#F59E0B';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = 'var(--text-main)';
    }
  }
}

/* --------------------------------------------------------------------------
   0B. Web Audio API SFX Synthesizer (Zero external audio files needed)
   -------------------------------------------------------------------------- */
let sfxEnabled = true;
let audioCtx = null;

function initAudioSFX() {
  const sfxBtn = document.getElementById('sfx-toggle');
  if (!sfxBtn) return;

  sfxBtn.addEventListener('click', () => {
    sfxEnabled = !sfxEnabled;
    sfxBtn.classList.toggle('active', sfxEnabled);
    sfxBtn.innerHTML = sfxEnabled 
      ? '<i class="fa-solid fa-volume-high"></i> SFX ON' 
      : '<i class="fa-solid fa-volume-xmark"></i> SFX OFF';
    if (sfxEnabled) playSound('click');
  });
}

function playSound(type) {
  if (!sfxEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'toggle') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.06); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.12); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch (e) {
    // Audio context fallback
  }
}

/* --------------------------------------------------------------------------
   1. Canvas Particle & Floating Dart Blueprint Background
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let particles = [];
  const particleCount = 40;
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  window.addEventListener('resize', resize);
  resize();
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 1.8 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    
    draw() {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const color = isLight ? `rgba(2, 86, 155, ${this.alpha})` : `rgba(0, 240, 255, ${this.alpha})`;
      const shadow = isLight ? '#02569B' : '#00F0FF';
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = shadow;
      ctx.fill();
    }
  }
  
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const strokeColor = isLight ? '2, 86, 155' : '84, 197, 248';
    
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(${strokeColor}, ${0.12 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    requestAnimationFrame(animate);
  }
  
  animate();
}

/* --------------------------------------------------------------------------
   2. Cursor Follower
   -------------------------------------------------------------------------- */
function initCursorFollower() {
  const follower = document.querySelector('.cursor-follower');
  if (!follower) return;
  
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function render() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;
    requestAnimationFrame(render);
  }
  render();
}

/* --------------------------------------------------------------------------
   3. Mobile Navigation Menu
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!toggleBtn || !navLinks) return;
  
  toggleBtn.addEventListener('click', () => {
    playSound('click');
    navLinks.classList.toggle('active');
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

/* --------------------------------------------------------------------------
   4. Interactive Phone Simulator
   -------------------------------------------------------------------------- */
function initPhoneSimulator() {
  const tabBtns = document.querySelectorAll('.app-nav-tabs .tab-btn');
  const panes = document.querySelectorAll('.app-tab-pane');
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('click');
      tabBtns.forEach(b => b.classList.remove('active'));
      panes.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const pane = document.getElementById(`pane-${targetTab}`);
      if (pane) pane.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   5. Interactive Flutter Terminal CLI
   -------------------------------------------------------------------------- */
function initTerminal() {
  const termBody = document.getElementById('terminal-body');
  const termInput = document.getElementById('terminal-input');
  const presetBtns = document.querySelectorAll('.term-btn');
  if (!termBody) return;

  const commands = {
    'help': `Available CLI commands:
  • <span class="term-cmd">flutter doctor</span>  : Diagnostic report of mobile dev toolchain
  • <span class="term-cmd">cat skills.dart</span>  : Output Riverpod & Clean Arch model
  • <span class="term-cmd">run hrms_app</span>   : Launch simulated HRMS Mobile App
  • <span class="term-cmd">cat experience</span>  : Output career history summary
  • <span class="term-cmd">clear</span>           : Clear terminal screen`,
    
    'flutter doctor': `<span class="term-success">[✓] Flutter (Channel stable, 3.29.0, on Microsoft Windows)</span>
<span class="term-success">[✓] Android toolchain - develop for Android devices (SDK 34.0.0)</span>
<span class="term-success">[✓] Xcode - develop for iOS (iOS SDK 18.0)</span>
<span class="term-success">[✓] State Management (Riverpod 2.5, Provider, Bloc)</span>
<span class="term-success">[✓] Backend Integration (Firebase Auth, Firestore, REST APIs, Dio)</span>
<span class="term-success">[✓] Architecture (Clean Architecture, MVVM, Biometrics)</span>
<span class="term-success">• All 6 checks passed cleanly! Production-ready mobile setup.</span>`,

    'cat skills.dart': `class FlutterSkills {
  static const String framework = 'Flutter 3.x & Dart';
  static const List<String> stateMgmt = ['Riverpod', 'Provider', 'Bloc'];
  static const List<String> backend = ['Firebase Auth', 'Firestore', 'Dio', 'REST APIs'];
  static const List<String> security = ['Biometric Auth', 'Flutter Secure Storage'];
  static const double cleanArchCoverage = 1.00;
}`,

    'run hrms_app': `Building HRMS Mobile App...
[1/4] Querying Firestore database streams... Done (Latency -25%)
[2/4] Initializing Riverpod StateNotifiers... Done
[3/4] Securing tokens via Flutter Secure Storage... Done
[4/4] Rendering Figma responsive mobile screens...
<span class="term-success">✓ App launched cleanly with +30% FPS performance!</span>`,

    'cat experience': `Varun Kumar Singh | Associate Software Engineer (Flutter)
Company: Tamar Software LLP (2024 — Present)
Key Highlights:
 • Reduced API latency by 25% via Firestore optimization
 • Increased app frame performance by 30% via Riverpod migration
 • Built cross-platform HRMS App with 4 role-based workflows`,

    'clear': 'CLEAR_SIGNAL'
  };

  function executeCommand(cmdStr) {
    const rawCmd = cmdStr.trim();
    const cmd = rawCmd.toLowerCase();
    
    if (cmd === 'clear') {
      termBody.innerHTML = `
        <div class="term-line"><span class="term-prompt">varun@flutter-dev:~$</span> <span class="term-out">Terminal cleared. Type <span class="term-cmd">help</span> for commands.</span></div>
      `;
      return;
    }
    
    const line = document.createElement('div');
    line.className = 'term-line';
    line.innerHTML = `<span class="term-prompt">varun@flutter-dev:~$</span> <span class="term-cmd">${rawCmd}</span>`;
    termBody.appendChild(line);
    
    const outDiv = document.createElement('div');
    outDiv.className = 'term-line term-out';
    
    if (commands[cmd]) {
      outDiv.innerHTML = commands[cmd];
      playSound('success');
    } else if (cmd !== '') {
      outDiv.innerHTML = `<span style="color:#ef4444">Command not recognized: '${rawCmd}'. Type <span class="term-cmd">help</span> for commands.</span>`;
    }
    
    termBody.appendChild(outDiv);
    termBody.scrollTop = termBody.scrollHeight;
  }

  if (termInput) {
    termInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        executeCommand(termInput.value);
        termInput.value = '';
      }
    });
  }

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('click');
      const cmdText = btn.getAttribute('data-cmd') || btn.textContent.trim();
      executeCommand(cmdText);
    });
  });
}

/* --------------------------------------------------------------------------
   6. Project Filtering
   -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('click');
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'grid';
          card.classList.add('active');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   7. Interactive Flutter Widget Inspector & Live Sandbox
   -------------------------------------------------------------------------- */
function initWidgetInspector() {
  const radiusSlider = document.getElementById('sandbox-radius');
  const colorSelect = document.getElementById('sandbox-color');
  const counterBtn = document.getElementById('sandbox-counter-btn');
  const previewWidget = document.getElementById('sandbox-target-widget');
  const codeDisplay = document.getElementById('sandbox-code-display');
  const counterVal = document.getElementById('sandbox-counter-val');

  if (!radiusSlider || !previewWidget || !codeDisplay) return;

  let count = 0;

  function updateSandbox() {
    const radius = radiusSlider.value;
    const colorHex = colorSelect.value;
    
    previewWidget.style.borderRadius = `${radius}px`;
    previewWidget.style.backgroundColor = colorHex;
    
    if (counterVal) counterVal.textContent = count;

    codeDisplay.textContent = `// Live Dart Code Generation
Container(
  decoration: BoxDecoration(
    color: Color(${colorHex.replace('#', '0xFF')}),
    borderRadius: BorderRadius.circular(${radius}.0),
    boxShadow: [BoxShadow(blurRadius: 15)],
  ),
  child: Consumer(
    builder: (context, ref, child) {
      final counter = ref.watch(counterProvider); // ${count}
      return ElevatedButton(
        onPressed: () => ref.read(counterProvider.notifier).increment(),
        child: Text('Riverpod Counter: $counter'),
      );
    },
  ),
);`;
  }

  radiusSlider.addEventListener('input', updateSandbox);
  colorSelect.addEventListener('change', () => {
    playSound('toggle');
    updateSandbox();
  });

  if (counterBtn) {
    counterBtn.addEventListener('click', () => {
      playSound('click');
      count++;
      updateSandbox();
    });
  }

  updateSandbox();
}

/* --------------------------------------------------------------------------
   8. 3D Tilt Effect on Hover Cards
   -------------------------------------------------------------------------- */
function init3DTiltEffect() {
  const tiltCards = document.querySelectorAll('.project-card, .metric-card, .skill-category-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 25;
      const rotateY = (centerX - x) / 25;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
    });
  });
}

/* --------------------------------------------------------------------------
   9. Flutter Floating Action Button (FAB) Speed Dial
   -------------------------------------------------------------------------- */
function initFABSpeedDial() {
  const fabBtn = document.getElementById('fab-main');
  const fabMenu = document.getElementById('fab-menu');

  if (!fabBtn || !fabMenu) return;

  fabBtn.addEventListener('click', () => {
    playSound('click');
    fabBtn.classList.toggle('active');
    fabMenu.classList.toggle('open');
  });
}

/* --------------------------------------------------------------------------
   10. Scroll Reveal Animation
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.1 });
  
  reveals.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   11. Email Clipboard Copy
   -------------------------------------------------------------------------- */
function initEmailCopy() {
  const emailBox = document.getElementById('email-copy-box');
  const toast = document.getElementById('toast');
  
  if (!emailBox || !toast) return;
  
  emailBox.addEventListener('click', () => {
    playSound('success');
    const email = 'varunkrsingh0511@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3000);
    });
  });
}

/* --------------------------------------------------------------------------
   12. Figma ➔ Flutter Split Comparison Slider Engine
   -------------------------------------------------------------------------- */
function initFigmaComparisonSlider() {
  const wrapper = document.querySelector('.comparison-wrapper');
  const afterOverlay = document.querySelector('.comparison-after');
  const handle = document.querySelector('.comparison-handle');

  if (!wrapper || !afterOverlay || !handle) return;

  let isDragging = false;

  function updateSlider(x) {
    const rect = wrapper.getBoundingClientRect();
    let position = ((x - rect.left) / rect.width) * 100;
    if (position < 5) position = 5;
    if (position > 95) position = 95;

    afterOverlay.style.width = `${position}%`;
    handle.style.left = `${position}%`;
  }

  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Touch support for mobile devices
  wrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSlider(e.touches[0].clientX);
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
}

/* --------------------------------------------------------------------------
   13. App Store / Play Store Product Modal Engine
   -------------------------------------------------------------------------- */
function initAppStoreModal() {
  const modal = document.getElementById('app-store-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const openBtns = document.querySelectorAll('.open-store-sheet');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      playSound('click');
      modal.classList.add('open');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('open');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });
}

/* --------------------------------------------------------------------------
   14. Flutter Arcade Canvas Mini-Game (Catch the Flutter Dash Logos)
   -------------------------------------------------------------------------- */
function initFlutterArcadeGame() {
  const canvas = document.getElementById('game-canvas');
  const startBtn = document.getElementById('start-game-btn');
  const scoreDisplay = document.getElementById('game-score');

  if (!canvas || !startBtn) return;

  const ctx = canvas.getContext('2d');
  let gameLoop = null;
  let score = 0;
  let basketX = canvas.width / 2 - 30;
  let items = [];

  function spawnItem() {
    items.push({
      x: Math.random() * (canvas.width - 20) + 10,
      y: 0,
      speed: Math.random() * 2 + 1.5,
      radius: 10
    });
  }

  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    basketX = e.clientX - rect.left - 30;
  });

  startBtn.addEventListener('click', () => {
    playSound('success');
    score = 0;
    items = [];
    if (scoreDisplay) scoreDisplay.textContent = '0';
    if (gameLoop) clearInterval(gameLoop);

    gameLoop = setInterval(updateGame, 1000 / 60);
  });

  function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.04) spawnItem();

    // Draw Basket (Flutter Paddle)
    ctx.fillStyle = '#00F0FF';
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00F0FF';
    ctx.fillRect(basketX, canvas.height - 20, 60, 10);

    // Update & Draw Items
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i];
      item.y += item.speed;

      ctx.beginPath();
      ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#54C5F8';
      ctx.fill();

      // Catch collision
      if (item.y >= canvas.height - 25 && item.x >= basketX && item.x <= basketX + 60) {
        items.splice(i, 1);
        score += 10;
        if (scoreDisplay) scoreDisplay.textContent = score;
        playSound('click');
      } else if (item.y > canvas.height) {
        items.splice(i, 1);
      }
    }
  }
}

/* --------------------------------------------------------------------------
   15. Phone Touch & Drag Swiping
   -------------------------------------------------------------------------- */
function initPhoneSwiping() {
  const appScreen = document.querySelector('.simulated-app');
  if (!appScreen) return;

  let startX = 0;

  appScreen.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  appScreen.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 40) {
      const activeTab = document.querySelector('.app-nav-tabs .tab-btn.active');
      if (!activeTab) return;
      
      const tabBtns = Array.from(document.querySelectorAll('.app-nav-tabs .tab-btn'));
      const currentIndex = tabBtns.indexOf(activeTab);

      if (diffX > 0 && currentIndex < tabBtns.length - 1) {
        tabBtns[currentIndex + 1].click();
      } else if (diffX < 0 && currentIndex > 0) {
        tabBtns[currentIndex - 1].click();
      }
    }
  });
}

/* --------------------------------------------------------------------------
   16. 3D Device Switcher (iPhone 16 Pro vs Pixel 9 vs Flutter Web)
   -------------------------------------------------------------------------- */
function initDeviceSwitcher() {
  const btns = document.querySelectorAll('.device-btn');
  const mockup = document.querySelector('.phone-mockup');
  if (!btns || !mockup) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      playSound('toggle');
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const mode = btn.getAttribute('data-device');
      mockup.classList.remove('mode-pixel', 'mode-tablet');
      if (mode === 'pixel') mockup.classList.add('mode-pixel');
      if (mode === 'tablet') mockup.classList.add('mode-tablet');
    });
  });
}

/* --------------------------------------------------------------------------
   17. Interactive Riverpod vs Bloc State Flow Visualizer
   -------------------------------------------------------------------------- */
function initStateFlowVisualizer() {
  const cards = document.querySelectorAll('.state-step-card');
  const architectureSelector = document.getElementById('arch-selector');

  if (!cards || !architectureSelector) return;

  architectureSelector.addEventListener('change', () => {
    playSound('toggle');
    const selectedArch = architectureSelector.value;
    const step2Title = document.getElementById('state-step-2-title');
    const step2Desc = document.getElementById('state-step-2-desc');

    if (selectedArch === 'riverpod') {
      if (step2Title) step2Title.textContent = 'StateNotifier / AsyncValue';
      if (step2Desc) step2Desc.textContent = 'Riverpod manages global reactive state with zero BuildContext dependency.';
    } else if (selectedArch === 'bloc') {
      if (step2Title) step2Title.textContent = 'Event ➔ BLoC ➔ State';
      if (step2Desc) step2Desc.textContent = 'BLoC processes incoming user events and emits immutable state streams.';
    } else {
      if (step2Title) step2Title.textContent = 'ChangeNotifier Provider';
      if (step2Desc) step2Desc.textContent = 'Provider listens to data changes and calls notifyListeners() for rebuilds.';
    }
  });
}

/* --------------------------------------------------------------------------
   18. Varun's AI Portfolio Assistant Chat Widget (Smart Intent Engine)
   -------------------------------------------------------------------------- */
function initAIPortfolioAssistant() {
  const fab = document.getElementById('ai-chat-fab');
  const box = document.getElementById('ai-chat-box');
  const close = document.getElementById('ai-chat-close');
  const input = document.getElementById('ai-chat-input');
  const send = document.getElementById('ai-chat-send');
  const msgContainer = document.getElementById('ai-messages');

  if (!fab || !box) return;

  fab.addEventListener('click', () => {
    playSound('click');
    box.classList.toggle('open');
  });

  if (close) {
    close.addEventListener('click', () => {
      box.classList.remove('open');
    });
  }

  const aiKnowledgeBase = [
    {
      keywords: ['company', 'work', 'tamar', 'job', 'current', 'employer', 'office', 'where'],
      response: "I am currently working as an <b>Associate Software Engineer (Flutter Developer)</b> at <b>Tamar Software LLP</b> in Noida, UP (2024 — Present). I previously completed my Flutter Internship here!"
    },
    {
      keywords: ['experience', 'years', 'background', 'history', 'role', 'seniority'],
      response: "I have <b>1.5+ years of hands-on experience</b> building production cross-platform Android & iOS apps with Flutter, Dart, Firebase, and REST APIs."
    },
    {
      keywords: ['metrics', 'impact', 'performance', 'boost', 'speed', 'latency', 'bugs'],
      response: "🚀 <b>My Key Achievements:</b><br>• <b>30%</b> App Performance boost via Riverpod & rebuild audits<br>• <b>25%</b> API latency cut by optimizing Firestore queries<br>• <b>15+</b> production QA bugs resolved."
    },
    {
      keywords: ['hrms', 'attendance', 'leave', 'project 1', 'timesheet'],
      response: "I built the <b>HRMS App</b> — a production Flutter application featuring role-based access for 4 employee roles (Admin, HR, Manager, Staff), real-time Firestore sync, and Biometric login."
    },
    {
      keywords: ['pulse', 'ai app', 'assistant', 'project 2', 'llm'],
      response: "I built <b>PulseAI</b> — a smart mobile assistant app with Flutter, REST APIs, and Dio HTTP client featuring real-time AI response streaming and voice interface."
    },
    {
      keywords: ['skills', 'riverpod', 'bloc', 'provider', 'architecture', 'state', 'flutter', 'dart', 'tech', 'stack'],
      response: "<b>My Core Toolkit:</b><br>• <b>Mobile:</b> Flutter 3.x, Dart, Material Design<br>• <b>State:</b> Riverpod 2.x, Provider, Bloc<br>• <b>Backend:</b> Firebase Auth, Firestore, REST APIs (Dio/http)<br>• <b>Architecture:</b> Clean Architecture, MVVM, Biometric Auth."
    },
    {
      keywords: ['education', 'college', 'degree', 'btech', 'university', 'study'],
      response: "I completed my <b>B.Tech in Computer Science & Engineering</b> from Delhi Technical Campus, GGSIPU · Noida (2020 — 2024)."
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'resume', 'hire'],
      response: "📧 <b>Email me:</b> varunkrsingh0511@gmail.com<br>🔗 <b>LinkedIn:</b> linkedin.com/in/varun-k-8a9b961b4<br>💻 <b>GitHub:</b> github.com/ImVarunkr<br>📄 <b>Resume:</b> Click the top header button to download my PDF Resume!"
    },
    {
      keywords: ['location', 'noida', 'delhi', 'remote', 'relocate', 'available', 'notice'],
      response: "I am based in <b>Noida, UP (Delhi NCR), India</b>, and I am actively open to full-time Flutter & Mobile Developer opportunities."
    }
  ];

  function processQuery(text) {
    const raw = text.trim();
    if (!raw) return;

    // Append User Message
    const userMsg = document.createElement('div');
    userMsg.className = 'msg-user';
    userMsg.textContent = raw;
    msgContainer.appendChild(userMsg);
    msgContainer.scrollTop = msgContainer.scrollHeight;

    playSound('click');

    // Generate Smart Response
    setTimeout(() => {
      const aiMsg = document.createElement('div');
      aiMsg.className = 'msg-ai';
      
      const q = raw.toLowerCase();
      let matchedResponse = null;

      for (let item of aiKnowledgeBase) {
        if (item.keywords.some(k => q.includes(k))) {
          matchedResponse = item.response;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = "I am a Flutter Developer with 1.5+ years of experience at Tamar Software LLP. Feel free to ask about <b>'my company'</b>, <b>'my skills'</b>, <b>'HRMS app'</b>, or <b>'contact'</b>!";
      }

      aiMsg.innerHTML = matchedResponse;
      msgContainer.appendChild(aiMsg);
      msgContainer.scrollTop = msgContainer.scrollHeight;
      playSound('success');
    }, 450);
  }

  if (send && input) {
    send.addEventListener('click', () => {
      processQuery(input.value);
      input.value = '';
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        processQuery(input.value);
        input.value = '';
      }
    });
  }

  // Quick Suggestion Chips Handler
  document.querySelectorAll('.ai-chip-suggest').forEach(chip => {
    chip.addEventListener('click', () => {
      const query = chip.getAttribute('data-query') || chip.textContent.trim();
      processQuery(query);
    });
  });
}

/* --------------------------------------------------------------------------
   19. Recruiter 60-Second Express Guided Tour Engine (Interactive HUD)
   -------------------------------------------------------------------------- */
let activeTourInterval = null;

function initRecruiterTour() {
  const tourBtn = document.getElementById('recruiter-tour-btn');
  const tourHud = document.getElementById('tour-hud-bar');
  const tourTitle = document.getElementById('tour-hud-title');
  const tourCount = document.getElementById('tour-hud-count');
  const stopBtn = document.getElementById('tour-stop-btn');

  if (!tourBtn || !tourHud) return;

  const tourSteps = [
    { selector: '#home', name: 'Hero Overview & Live Phone Simulator' },
    { selector: '.metrics-section', name: 'Impact Stats (+30% Speed, 25% Latency)' },
    { selector: '#experience', name: 'Career Journey (Tamar Software LLP)' },
    { selector: '#work', name: 'Production HRMS & PulseAI Apps' },
    { selector: '#sandbox', name: 'Interactive Flutter Widget Inspector' },
    { selector: '#skills', name: 'Technical Stack (Riverpod, Clean Arch)' },
    { selector: '#contact', name: 'Direct Contact & Resume Download' }
  ];

  function stopTour() {
    if (activeTourInterval) clearInterval(activeTourInterval);
    tourHud.classList.remove('active');
    playSound('toggle');
  }

  if (stopBtn) {
    stopBtn.addEventListener('click', stopTour);
  }

  tourBtn.addEventListener('click', () => {
    playSound('success');
    if (activeTourInterval) clearInterval(activeTourInterval);

    tourHud.classList.add('active');
    let index = 0;

    function runStep() {
      if (index >= tourSteps.length) {
        stopTour();
        return;
      }

      const step = tourSteps[index];
      const target = document.querySelector(step.selector);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        if (tourTitle) tourTitle.textContent = `Tour Active: ${step.name}`;
        if (tourCount) tourCount.textContent = `(${index + 1} of ${tourSteps.length})`;
      }

      index++;
    }

    runStep();
    activeTourInterval = setInterval(runStep, 4200);
  });
}

/* --------------------------------------------------------------------------
   20. Vercel/Apple Spotlight Cursor Tracker
   -------------------------------------------------------------------------- */
function initSpotlightTracking() {
  const spotlightCards = document.querySelectorAll('.project-card, .metric-card, .skill-category-card');

  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}





