const searchForm = document.querySelector(".search");
const searchInput = document.querySelector(".search__input");

export function getQuery() {
  const query = searchInput.value.trim();

  searchInput.value = "";
  return query;
}

export function addHandlerSearch(handler) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    handler();
  });
}
