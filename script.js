/**
 * DEEPAK CHOUDHARY — SPATIAL UI INTERACTIVITY SCRIPT
 */

// 1. DYNAMIC SPATIAL CURSOR SPOTLIGHT
const spotlight = document.getElementById('spatialSpotlight');
if (spotlight) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateSpotlight() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    spotlight.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
    requestAnimationFrame(updateSpotlight);
  }
  updateSpotlight();
}

// 2. 3D SPATIAL CARD TILT EFFECT
const tiltCards = document.querySelectorAll('[data-tilt]');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
});

// 3. SHOWCASE FILTER TABS
const filterButtons = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filterVal = btn.getAttribute('data-filter');

    workCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      if (filterVal === 'all' || category === filterVal) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 10);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 250);
      }
    });
  });
});

// 4. ACTIVE SECTION DOCK TRACKER
const sections = document.querySelectorAll('section');
const dockItems = document.querySelectorAll('.dock-item');

window.addEventListener('scroll', () => {
  let currentSec = '';
  sections.forEach((sec) => {
    const secTop = sec.offsetTop - 180;
    if (window.scrollY >= secTop) {
      currentSec = sec.getAttribute('id');
    }
  });

  dockItems.forEach((item) => {
    item.classList.remove('active');
    if (item.getAttribute('href') === `#${currentSec}`) {
      item.classList.add('active');
    }
  });
});

// 5. COPY TO CLIPBOARD HELPER & TOAST
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`Copied "${text}" to clipboard!`);
    if (btnElement) {
      const originalHTML = btnElement.innerHTML;
      btnElement.innerHTML = `<i class="fa-solid fa-check text-cyan"></i>`;
      setTimeout(() => {
        btnElement.innerHTML = originalHTML;
      }, 2000);
    }
  }).catch(() => {
    showToast(`Failed to copy automatically.`);
  });
}

function showToast(message) {
  const toast = document.getElementById('spatialToast');
  const toastMsg = document.getElementById('toastMsg');
  if (toast && toastMsg) {
    toastMsg.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
}

// 6. SPATIAL MODAL DATA & CONTROLLER
const modalDatabase = {
  viral1: {
    category: "High-Performance Viral Reel #01",
    title: "Sub-2s Hook & Cut Synchronization",
    metrics: "1M+ Views | High Share Rate | 100K+ Likes",
    url: "https://www.instagram.com/reel/DRW4OZoiWk2/",
    strategy: "Rapid visual pattern interrupt within the opening 2 seconds paired with hard sound-transient cuts. This stops mindless feed scrolling and signals high content density to the Instagram recommendation algorithm.",
    technical: "Cut in CapCut Pro & Premiere Pro. Audio pitch normalized with micro-frame sync."
  },
  viral2: {
    category: "High-Performance Viral Reel #02",
    title: "Trend Adaptation & Kinetic Motion",
    metrics: "1M+ Views | Algorithmic Momentum | Repeat Loops",
    url: "https://www.instagram.com/reel/DRbZAieiS4O/",
    strategy: "Adapting an emerging audio trend while injecting distinct personal styling and dynamic speed ramps. Built to incentivize repeat loop replays, heavily multiplying watch time percentage.",
    technical: "Speed ramping curve manipulation with optical flow motion smoothing."
  },
  viral3: {
    category: "High-Performance Viral Reel #03",
    title: "Emotional Relatability & Discussion Driver",
    metrics: "1M+ Views | High Comment-to-Share Ratio",
    url: "https://www.instagram.com/reel/DReh1yAjIlu/",
    strategy: "Crafted around relatable cultural humor and lifestyle dilemmas. The scenario drives intense peer-to-peer sharing via Instagram Direct and high commentary volume.",
    technical: "Natural lighting optimization, contextual subtitle typography, and emotional narrative arc."
  },
  viral4: {
    category: "High-Performance Viral Reel #04",
    title: "Platform-Native Framing & Clean Delivery",
    metrics: "1M+ Views | 9:16 Full Screen Immersion",
    url: "https://www.instagram.com/reel/DUSwu7HkuiO/",
    strategy: "Strict adherence to Instagram vertical safe zones to ensure titles and captions are never obscured by platform UI elements. Pristine visual color grade with balanced contrast.",
    technical: "Custom LUT color treatment and precise margin typography alignment."
  },
  viral5: {
    category: "High-Performance Viral Reel #05",
    title: "Short-Form Retention & Beat Alignment",
    metrics: "1M+ Views | 85%+ Completion Velocity",
    url: "https://www.instagram.com/reel/DUTVLpaEpJj/",
    strategy: "Micro-cutting video scenes directly to the waveform transients of the audio track. The sync generates subconscious visual satisfaction that retains viewers past the final frame.",
    technical: "Rhythmic timeline markers and kinetic impact sound effects."
  },
  edit1: {
    category: "Editing, Pacing & Shoot Planning #01",
    title: "Shoot Planning & Narrative Flow",
    metrics: "Cinematic Event Production | Smooth Flow",
    url: "https://www.instagram.com/reel/DOtBKhKDLkq/",
    strategy: "Detailed shot-list pre-planning prior to filming on ground. Seamless camera whip transitions executed during the shoot and tightened in the timeline.",
    technical: "Shot on location with match-cut camera angles and focal length variation."
  },
  edit2: {
    category: "Editing, Pacing & Shoot Planning #02",
    title: "Production, Cut Pacing & Sound Design",
    metrics: "Dynamic Typography & Multi-Layer Audio",
    url: "https://www.instagram.com/reel/DI_X949tCex/",
    strategy: "Multi-layered sound design featuring bespoke whooshes, atmospheric risers, and bass drops synced to on-screen kinetic titles for high perceived production value.",
    technical: "Adobe Premiere Pro sound engineering and kinetic title animation."
  },
  edit3: {
    category: "Editing, Pacing & Shoot Planning #03",
    title: "Creative Framing & Brand Tone Consistency",
    metrics: "On-Ground Curation | Brand Identity",
    url: "https://www.instagram.com/reel/DGs23SJzwE3/",
    strategy: "Maintaining coherent luxury/street brand aesthetic under fast-paced live conditions. Ensuring every frame preserves correct exposure and brand color balance.",
    technical: "Handheld gimbal stabilization, manual exposure control, and mobile lens curation."
  },
  personal1: {
    category: "Personal Brand & Creator Content",
    title: "Personal Showcase & Lifestyle Reel 01",
    metrics: "60K+ Audience Community | High Engagement",
    url: "https://www.instagram.com/reel/DeRtTSNTTWG/",
    strategy: "Elevating personal creator aesthetic with sharp wardrobe framing, ambient natural light, and immediate visual engagement that builds authentic community trust.",
    technical: "Mobile gimbal cinematography and warm cinematic color grading."
  },
  personal2: {
    category: "Personal Brand & Creator Content",
    title: "Personal Showcase & Lifestyle Reel 02",
    metrics: "High Bookmark & DM Rate | Streetwear Aesthetic",
    url: "https://www.instagram.com/reel/DTGMaV1k4Vu/",
    strategy: "Showcasing relatable styling combinations with rhythm and pacing. Viewers frequently bookmark the video for outfit inspiration and leave comment inquiries.",
    technical: "Paced cut sequencing with urban architectural background framing."
  }
};

function openPreviewModal(key) {
  const item = modalDatabase[key];
  if (!item) return;

  const modal = document.getElementById('spatialModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');

  modalTitle.textContent = item.category;

  modalContent.innerHTML = `
    <div style="margin-bottom: 20px;">
      <span class="media-badge viral-tag" style="position: static; display: inline-block; margin-bottom: 12px;">
        <i class="fa-solid fa-chart-simple"></i> ${item.metrics}
      </span>
      <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #fff; margin-bottom: 10px;">${item.title}</h3>
    </div>

    <div style="background: rgba(255, 255, 255, 0.04); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; padding: 20px; margin-bottom: 24px;">
      <h4 style="color: var(--accent-green-bright); font-size: 0.92rem; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.05em;">
        <i class="fa-solid fa-lightbulb"></i> Strategic Hook & Algorithm Architecture
      </h4>
      <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${item.strategy}</p>
    </div>

    <div style="background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 16px; padding: 18px; margin-bottom: 28px;">
      <h4 style="color: #fff; font-size: 0.88rem; margin-bottom: 6px;">
        <i class="fa-solid fa-sliders text-pink"></i> Post-Production & Technical Stack
      </h4>
      <p style="color: var(--text-dim); font-size: 0.88rem;">${item.technical}</p>
    </div>

    <div style="display: flex; gap: 14px; flex-wrap: wrap;">
      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-spatial-primary" style="flex: 1;">
        <i class="fa-brands fa-instagram"></i>
        <span>Watch on Instagram</span>
      </a>
      <button class="btn btn-spatial-glass" onclick="copyToClipboard('${item.url}', this)">
        <i class="fa-regular fa-copy"></i>
        <span>Copy Link</span>
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function openImageModal(imgSrc, title, postUrl) {
  const modal = document.getElementById('spatialModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');

  modalTitle.textContent = "Creative Asset Inspector";

  modalContent.innerHTML = `
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="${imgSrc}" alt="${title}" style="max-width: 100%; max-height: 480px; object-fit: contain; border-radius: 18px; border: 1px solid rgba(255,255,255,0.15); box-shadow: 0 16px 40px rgba(0,0,0,0.8);" />
    </div>
    <h3 style="font-family: var(--font-heading); font-size: 1.35rem; color: #fff; margin-bottom: 12px; text-align: center;">${title}</h3>
    <div style="display: flex; justify-content: center; gap: 14px; margin-top: 18px;">
      <a href="${postUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-spatial-primary">
        <i class="fa-brands fa-instagram"></i>
        <span>View Original Post on Instagram</span>
      </a>
      <button class="btn btn-spatial-glass" onclick="closeSpatialModal()">
        <span>Close</span>
      </button>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeSpatialModal(e) {
  if (e && e.target && e.target !== e.currentTarget && !e.target.classList.contains('spatial-modal-backdrop') && !e.target.classList.contains('modal-close-btn') && !e.target.closest('.modal-close-btn') && !e.target.classList.contains('dot-red')) {
    return;
  }
  const modal = document.getElementById('spatialModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// 7. CONTACT FORM HANDLER
function handleContactSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();
  const project = document.getElementById('userProject').value;
  const message = document.getElementById('userMessage').value.trim();

  const successEl = document.getElementById('formSuccessMessage');
  if (successEl) {
    successEl.classList.remove('d-none');
  }

  // Construct mailto link as fallback to launch mail client directly
  const subject = encodeURIComponent(`Portfolio Inquiry: ${project} - from ${name}`);
  const body = encodeURIComponent(`Hi Deepak,\n\nName: ${name}\nEmail: ${email}\nProject Type: ${project}\n\nMessage:\n${message}\n\nBest regards,\n${name}`);
  
  setTimeout(() => {
    window.location.href = `mailto:deepakchoudhary8658@gmail.com?subject=${subject}&body=${body}`;
  }, 1000);
}

// Close modal on Escape key
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeSpatialModal();
  }
});
