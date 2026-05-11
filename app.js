const products = Array.isArray(window.PRODUCTOS) ? window.PRODUCTOS : [];

const searchInput = document.querySelector("#searchInput");
const hideZeroPrice = document.querySelector("#hideZeroPrice");
const hideNoStock = document.querySelector("#hideNoStock");
const clearSearch = document.querySelector("#clearSearch");
const totalProducts = document.querySelector("#totalProducts");
const resultCount = document.querySelector("#resultCount");
const queryHint = document.querySelector("#queryHint");
const resultsBody = document.querySelector("#resultsBody");
const emptyState = document.querySelector("#emptyState");

const currency = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function formatNumber(value) {
  return new Intl.NumberFormat("es-CO", { maximumFractionDigits: 2 }).format(value);
}

function formatPrice(value) {
  return value > 0 ? currency.format(value) : "Sin precio";
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function highlight(value, query) {
  const safeValue = escapeHtml(value);
  const firstTerm = normalize(query).split(/\s+/).find(Boolean);
  if (!firstTerm || firstTerm.length < 2) return safeValue;

  const raw = String(value ?? "");
  const normalizedRaw = normalize(raw);
  const index = normalizedRaw.indexOf(firstTerm);
  if (index < 0) return safeValue;

  const before = escapeHtml(raw.slice(0, index));
  const match = escapeHtml(raw.slice(index, index + firstTerm.length));
  const after = escapeHtml(raw.slice(index + firstTerm.length));
  return `${before}<mark>${match}</mark>${after}`;
}

function searchableText(item) {
  return normalize(`${item.codigo} ${item.producto} ${item.medida}`);
}

function findProducts() {
  const query = searchInput.value.trim();
  const terms = normalize(query).split(/\s+/).filter(Boolean);

  return products
    .filter((item) => {
      if (hideZeroPrice.checked && item.precio <= 0) return false;
      if (hideNoStock.checked && item.existencia <= 0) return false;
      if (!terms.length) return true;
      const haystack = searchableText(item);
      return terms.every((term) => haystack.includes(term));
    })
    .sort((a, b) => {
      if (!terms.length) return a.producto.localeCompare(b.producto, "es");
      const queryValue = normalize(query);
      const aCode = normalize(a.codigo) === queryValue ? 0 : 1;
      const bCode = normalize(b.codigo) === queryValue ? 0 : 1;
      if (aCode !== bCode) return aCode - bCode;
      return a.producto.localeCompare(b.producto, "es");
    });
}

function renderRows(items) {
  const visible = items.slice(0, 250);
  resultsBody.innerHTML = visible
    .map(
      (item) => `
        <tr>
          <td class="code" data-label="Codigo">${highlight(item.codigo, searchInput.value)}</td>
          <td class="product" data-label="Producto">${highlight(item.producto, searchInput.value)}</td>
          <td class="measure" data-label="Medida">${escapeHtml(item.medida)}</td>
          <td class="stock" data-label="Existencia">${formatNumber(item.existencia)}</td>
          <td class="price ${item.precio <= 0 ? "zero-price" : ""}" data-label="Precio">${formatPrice(item.precio)}</td>
        </tr>
      `,
    )
    .join("");
}

function updateView() {
  const items = findProducts();
  const query = searchInput.value.trim();
  const hiddenCount = Math.max(items.length - 250, 0);

  renderRows(items);
  resultCount.textContent = `${formatNumber(items.length)} resultado${items.length === 1 ? "" : "s"}`;
  queryHint.textContent = hiddenCount
    ? `Mostrando los primeros 250. Afina la busqueda para ver menos resultados.`
    : query
      ? `Filtro activo: "${query}".`
      : "Escribe para filtrar la lista.";
  emptyState.hidden = items.length > 0;
}

totalProducts.textContent = formatNumber(products.length);
searchInput.addEventListener("input", updateView);
hideZeroPrice.addEventListener("change", updateView);
hideNoStock.addEventListener("change", updateView);
clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  searchInput.focus();
  updateView();
});

updateView();
