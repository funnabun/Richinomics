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
  modal
