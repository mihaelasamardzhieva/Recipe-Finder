const pagination = document.querySelector(".pagination");

function generatePaginationMarkup(data) {
  const currentPage = data.page;
  const totalPages = Math.ceil(data.totalResults / data.resultsPerPage);

  if (currentPage === 1 && totalPages > 1) {
    return `
    <button
        class="pagination__btn pagination__btn--next"
        data-page="${currentPage + 1}"
      >
        Next →
      </button>
    `;
  }

  if (currentPage === totalPages && totalPages > 1) {
    return `
     <button
        class="pagination__btn pagination__btn--prev"
        data-page="${currentPage - 1}"
      >
        ← Previous
        </button>
    `;
  }

  if (currentPage < totalPages) {
    return `
    <button
        class="pagination__btn pagination__btn--prev"
        data-page="${currentPage - 1}"
      >
        ← Previous
      </button>

      <button
        class="pagination__btn pagination__btn--next"
        data-page="${currentPage + 1}"
      >
        Next →
      </button>
    `;
  }

  return "";
}

export function renderPagination(data) {
  pagination.innerHTML = "";

  pagination.insertAdjacentHTML("afterbegin", generatePaginationMarkup(data));
}

export function addHandlerPagination(handler) {
  pagination.addEventListener("click", function (e) {
    const btn = e.target.closest(".pagination__btn");

    if (!btn) return;

    const page = Number(btn.dataset.page);
    handler(page);
  });
}
