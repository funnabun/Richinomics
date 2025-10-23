const methods = [
  {
    title: "Get Started",
    description: "Start your journey to lifelong wealth.",
    details: "Websites like Upwork and Fiverr let you connect with clients worldwide. Start small and scale.",
  },
  {
    title: "About us",
    description: "What makes Richinomics what it is now?",
    details: "Use Shopify or WooCommerce with suppliers who ship directly to customers.",
  },
  {
    title: "Join the discord server",
    description: "Discord server includes more info, announcements, and updates.",
    details: "Sign up for affiliate programs (Amazon, ClickBank). Share links in blogs or videos.",
    link: "https://discord.gg/yourserverlink" // <-- replace this with your real Discord invite link
  },
];

const grid = document.getElementById("methods");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.getElementById("close-modal");

// render all cards
function renderMethods(filtered = methods) {
  grid.innerHTML = "";
  filtered.forEach((m) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<h2>${m.title}</h2><p>${m.description}</p>`;
    card.addEventListener("click", () => openModal(m));
    grid.appendChild(card);
  });
}

// open modal or redirect
function openModal(method) {
  if (method.title === "Get Started") {
    showPaymentGate();
    return;
  }

  if (method.link) {
    window.open(method.link, "_blank");
    return;
  }

  modalTitle.textContent = method.title;
  modalDetails.textContent = method.details;
  modal.classList.remove("hidden");
}

// modal controls
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

// search filter
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = methods.filter((m) => m.title.toLowerCase().includes(query));
  renderMethods(filtered);
});

// dynamic year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// payment gate overlay
function showPaymentGate() {
  const overlay = document.createElement("div");
  overlay.id = "payment-gate";
  overlay.innerHTML = `
    <div class="pg-backdrop"></div>
    <div class="pg-card">
      <button class="pg-close" id="pgClose" aria-label="Close">×</button>
      <h1>Richinomics — Get Started</h1>
      <p class="pg-sub">
        Unlock the full Richinomics starter kit: exclusive tools, templates, and insider guidance to help you build wealth online.
      </p>
      <ul class="pg-bullets">
        <li>Proven money-making methods</li>
        <li>Beginner-friendly tools</li>
        <li>Step-by-step roadmap</li>
      </ul>
      <div class="pg-price">
        <span class="pg-amount">$29</span>
        <span class="pg-note">one-time access</span>
      </div>
      <label class="pg-label">
        Email for delivery
        <input id="pgEmail" type="email" placeholder="you@example.com" required />
      </label>
      <button id="payNow" class="pg-btn">Continue to Checkout</button>
      <p class="pg-small">Secure checkout handled by Stripe.</p>
    </div>
  `;
  document.body.appendChild(overlay);

  document.getElementById("pgClose").onclick = () => overlay.remove();

  document.getElementById("payNow").onclick = () => {
    const email = document.getElementById("pgEmail").value.trim();
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }
    window.open("https://buy.stripe.com/your_payment_link", "_blank"); // <-- replace this with your real payment link
  };
}

// payment gate CSS
const style = document.createElement("style");
style.textContent = `
  #payment-gate { position: fixed; inset: 0; z-index: 9999; }
  #payment-gate .pg-backdrop { position: absolute; inset:0; background: rgba(0,0,0,.65); }
  #payment-gate .pg-card {
    position: relative; max-width: 520px; margin: 6vh auto; background: #0b0b0b;
    color: #f3f3f3; border-radius: 16px; padding: 28px; box-shadow: 0 20px 60px rgba(0,0,0,.5);
    font-family: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
  }
  #payment-gate .pg-close {
    position:absolute; top:10px; right:12px; border:0; background:transparent; color:#aaa;
    font-size:28px; cursor:pointer; line-height:1;
  }
  #payment-gate h1 { margin: 4px 0 6px; font-size: 28px; }
  #payment-gate .pg-sub { opacity:.9; margin-bottom: 14px; }
  #payment-gate .pg-bullets { margin: 10px 0 14px 18px; }
  #payment-gate .pg-price { display:flex; align-items:baseline; gap:10px; margin: 6px 0 16px; }
  #payment-gate .pg-amount { font-size: 34px; font-weight: 700; }
  #payment-gate .pg-note { opacity:.8; }
  #payment-gate .pg-label { display:block; margin-bottom:12px; font-size:14px; }
  #payment-gate input[type="email"] {
    width:100%; padding:10px 12px; border-radius:10px; border:1px solid #333; background:#121212; color:#eaeaea;
  }
  #payment-gate .pg-btn {
    width:100%; padding:12px 14px; border:0; border-radius:12px; cursor:pointer; margin-top:10px;
    background: linear-gradient(90deg, #FFD166, #E0AA3E); color:#1a1a1a; font-weight:700; font-size:16px;
  }
  #payment-gate .pg-btn:hover { filter: brightness(1.05); }
  #payment-gate .pg-small { margin-top:10px; opacity:.7; font-size:12px; text-align:center; }
`;
document.head.appendChild(style);

renderMethods();
