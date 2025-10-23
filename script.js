// Run after DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // --- DATA ---------------------------------------------------------------
  const methods = [
    {
      type: 'pay', // <— THIS drives the payment gate
      title: 'Get Started',
      description: 'Start your journey to lifelong wealth.',
      details: 'Websites like Upwork and Fiverr let you connect with clients worldwide. Start small and scale.',
    },
    {
      type: 'info',
      title: 'About us',
      description: 'What makes Richinomics what it is now?',
      details: 'Use Shopify or WooCommerce with suppliers who ship directly to customers.',
    },
    {
      type: 'link',
      title: 'Join the discord server',
      description: 'Discord server includes more info, announcements, and updates.',
      details: 'Sign up for affiliate programs (Amazon, ClickBank). Share links in blogs or videos.',
      link: 'https://discord.gg/SM43yhz6js' // <-- put your real Discord invite
    },
  ];

  // --- ELEMENTS -----------------------------------------------------------
  const grid        = document.getElementById('methods');
  const searchInput = document.getElementById('search');
  const modal       = document.getElementById('modal');
  const modalTitle  = document.getElementById('modal-title');
  const modalDetails= document.getElementById('modal-details');
  const closeModal  = document.getElementById('close-modal');

  // --- RENDER CARDS -------------------------------------------------------
  function renderMethods(list = methods) {
    if (!grid) return;
    grid.innerHTML = '';
    list.forEach((m, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<h2>${m.title}</h2><p>${m.description}</p>`;
      card.addEventListener('click', () => handleCardClick(m));
      grid.appendChild(card);
    });
  }

  // --- CLICK BEHAVIOR -----------------------------------------------------
  function handleCardClick(method) {
    switch (method.type) {
      case 'pay':
        showPaymentGate();     // Option 1
        break;
      case 'link':
        if (method.link) window.open(method.link, '_blank'); // Option 3
        break;
      default:
        openInfoModal(method); // Option 2
    }
  }

  // --- MODAL (info only) --------------------------------------------------
  function openInfoModal(method) {
    if (!modal || !modalTitle || !modalDetails) return;
    modalTitle.textContent  = method.title;
    modalDetails.textContent= method.details || '';
    modal.classList.remove('hidden');
  }

  if (closeModal && modal) {
    closeModal.addEventListener('click', () => modal.classList.add('hidden'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.add('hidden'); });
  }

  // --- SEARCH -------------------------------------------------------------
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      renderMethods(methods.filter(m => m.title.toLowerCase().includes(q)));
    });
  }

  // --- FOOTER YEAR (optional) --------------------------------------------
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- PAYMENT GATE -------------------------------------------------------
  function showPaymentGate() {
    // Remove an existing gate if any (prevents duplicates)
    const old = document.getElementById('payment-gate');
    if (old) old.remove();

    const overlay = document.createElement('div');
    overlay.id = 'payment-gate';
    overlay.innerHTML = `
      <div class="pg-backdrop"></div>
      <div class="pg-card">
        <button class="pg-close" id="pgClose" aria-label="Close">×</button>
        <h1>Richinomics — Get Started</h1>
        <p class="pg-sub">
          Unlock the full Richinomics starter kit: exclusive tools, templates, and a step-by-step roadmap.
        </p>
        <ul class="pg-bullets">
          <li>Proven money-making methods</li>
          <li>Beginner-friendly tools</li>
          <li>Members-only updates</li>
        </ul>
        <div class="pg-price">
          <span class="pg-amount">$29</span>
          <span class="pg-note">one-time access</span>
        </div>
        <label class="pg-label">
          Email for delivery
          <input id="pgEmail" type="email" placeholder="you@example.com" required />
        </label>
        <button id="payNow" class="pg-btn">Continue t
