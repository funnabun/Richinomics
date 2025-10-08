const methods = [
  {
    title: "Freelancing Online",
    description: "Offer skills like writing, design, or coding for pay.",
    details: "Websites like Upwork and Fiverr let you connect with clients worldwide. Start small and scale.",
  },
  {
    title: "Dropshipping",
    description: "Sell products without holding inventory.",
    details: "Use Shopify or WooCommerce with suppliers who ship directly to customers.",
  },
  {
    title: "Affiliate Marketing",
    description: "Earn commissions by promoting products.",
    details: "Sign up for affiliate programs (Amazon, ClickBank). Share links in blogs or videos.",
  },
];

const grid = document.getElementById("methods");
const searchInput = document.getElementById("search");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDetails = document.getElementById("modal-details");
const closeModal = document.getElementById("close-modal");

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

function openModal(method) {
  modalTitle.textContent = method.title;
  modalDetails.textContent = method.details;
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filtered = methods.filter((m) =>
    m.title.toLowerCase().includes(query)
  );
  renderMethods(filtered);
});

document.getElementById("year").textContent = new Date().getFullYear();

renderMethods();

