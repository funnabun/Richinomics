document.addEventListener('DOMContentLoaded', () => {
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
      link: "https://discord.gg/SM43yhz6js" // <-- replace with your real link
    },
  ];

  const grid = document.getElementById("methods");
  const searchInput = document.getElementById("search");
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalDetails = document.getElementById("modal-details");
  const closeModal = document.getElementById("close-modal");

  // Render cards
  function renderMethods(filtered = methods) {
    if (!grid) return;
    grid.innerHTML = "";
    filtered.forEach((m) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<h2>${m.title}</h2><p>${m.description}</p>`;
      card.addEventListener("click", () => openModal(m));
      grid.appendChild(card);
    });
  }

  // Click behavior
  function openModal(method) {
    // Show payment gate for option 1
    if (method.title === "Get Started") {
      showPaymentGate();
      return;
    }
    // Open link for items that have one (e.g., Discord)
    if (method.link) {
      window.open(method.link, "_blank");
      return;
    }
    // Default: open modal
    if (modal && modalTitle && modalDetails) {
      modalTitle.textContent = method.title;
      modalDetails.textContent = method.details || "";
      modal.classList.remove("hidden");
    }
  }

  // Modal controls (guard in case modal isn't on this page)
  if (closeModal && modal) {
    closeModal.addEventListener("click", () => modal.classList.add("hidden"));
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.add("hidden");
    });
  }

  // Search filter
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase
