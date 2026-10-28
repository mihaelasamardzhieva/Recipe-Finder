const shoppingList = document.querySelector(".shopping-list");
const summary = document.querySelector(".shopping-list__summary");
const emptyState = document.querySelector(".shopping-list__empty");
const clearCompletedBtn = document.querySelector(".shopping-list__clear-btn");

const formatItem = function (item) {
  const quantity = item.amount === null ? "" : `${item.amount} `;
  const unit = item.unit ? `${item.unit} ` : "";

  return `${quantity}${unit}${item.name}`;
};

export const addHandlerShowShoppingList = function (handler) {
  const link = document.querySelector("#shopping-list");

  link.addEventListener("click", function (e) {
    e.preventDefault();
    handler();
  });
};

export const renderShoppingList = function (items) {
  shoppingList.innerHTML = "";
  const sortedItems = [...items].sort(
    (a, b) => Number(a.checked) - Number(b.checked),
  );
  emptyState.classList.toggle("hidden", items.length > 0);

  sortedItems.forEach((item) => {
    const html = `
  <li class="shopping-item ${item.checked ? "shopping-item--checked" : ""}"
      data-id="${item.id}">

<div class="shopping-item__display">
      <label class="shopping-item__checkbox">
        <input
          type="checkbox"
          class="shopping-item__check"
          ${item.checked ? "checked" : ""}
        />
        <span class="shopping-item__checkmark"></span>
      </label>

      <span class="shopping-item__data">${formatItem(item)}</span>

     ${
       item.checked
         ? ""
         : `
  <button
    class="shopping-item__btn shopping-item__edit"
    type="button"
    aria-label="Edit item"
  >
    <i class="bi bi-pencil" aria-hidden="true"></i>
  </button>
`
     }

      <button
        class="shopping-item__btn shopping-item__remove"
        type="button"
        aria-label="Remove item"
      >
        <i class="bi bi-trash" aria-hidden="true"></i>
      </button>
    </div>

    <form class="shopping-item__edit-form hidden">
      <div class="shopping-item__edit-fields">
        <input
          class="shopping-item__edit-amount"
          name="amount"
          type="number"
          min="0"
          step="any"
          value="${item.amount ?? ""}"
          placeholder="Qty"
          aria-label="Quantity"
        />

        <input
          class="shopping-item__edit-unit"
          name="unit"
          type="text"
          value="${item.unit}"
          placeholder="Unit"
          aria-label="Unit"
        />

        <input
          class="shopping-item__edit-name"
          name="name"
          type="text"
          value="${item.name}"
          required
          aria-label="Item name"
        />
      </div>

      <div class="shopping-item__edit-actions">
        <button
          class="shopping-item__btn shopping-item__save"
          type="submit"
          aria-label="Save changes"
        >
          <i class="bi bi-check-lg" aria-hidden="true"></i>
        </button>

        <button
          class="shopping-item__btn shopping-item__cancel"
          type="button"
          aria-label="Cancel editing"
        >
          <i class="bi bi-x-lg" aria-hidden="true"></i>
        </button>
      </div>
    </form>
  </li>
`;

    shoppingList.insertAdjacentHTML("beforeend", html);
  });

  const total = items.length;
  const remaining = items.filter((item) => !item.checked).length;

  summary.textContent = `${total} Total • ${remaining} Left to buy`;
  clearCompletedBtn.classList.toggle("hidden", total === remaining);
};

export const addHandlerToggleShoppingItem = function (handler) {
  shoppingList.addEventListener("change", function (e) {
    const checkbox = e.target.closest(".shopping-item__check");

    if (!checkbox) return;

    const item = checkbox.closest(".shopping-item");
    const id = item.dataset.id;

    handler(id);
  });
};

export const addHandlerRemoveShoppingItem = function (handler) {
  shoppingList.addEventListener("click", function (e) {
    const btn = e.target.closest(".shopping-item__remove");

    if (!btn) return;

    const item = btn.closest(".shopping-item");
    const id = item.dataset.id;

    handler(id);
  });
};

export const addHandlerEditShoppingItem = function () {
  shoppingList.addEventListener("click", function (e) {
    const editBtn = e.target.closest(".shopping-item__edit");
    const cancelBtn = e.target.closest(".shopping-item__cancel");

    if (editBtn) {
      const item = editBtn.closest(".shopping-item");

      if (item.classList.contains("shopping-item--checked")) return;

      item.querySelector(".shopping-item__display").classList.add("hidden");
      item
        .querySelector(".shopping-item__edit-form")
        .classList.remove("hidden");

      item.querySelector(".shopping-item__edit-name").focus();
      return;
    }

    if (cancelBtn) {
      const item = cancelBtn.closest(".shopping-item");

      item.querySelector(".shopping-item__edit-form").classList.add("hidden");
      item.querySelector(".shopping-item__display").classList.remove("hidden");
    }
  });
};

export const addHandlerSaveShoppingItem = function (handler) {
  shoppingList.addEventListener("submit", function (e) {
    const form = e.target.closest(".shopping-item__edit-form");

    if (!form) return;

    e.preventDefault();

    const item = form.closest(".shopping-item");

    const updates = {
      name: form.querySelector(".shopping-item__edit-name").value.trim(),
      amount:
        form.querySelector(".shopping-item__edit-amount").value === ""
          ? null
          : Number(form.querySelector(".shopping-item__edit-amount").value),
      unit: form.querySelector(".shopping-item__edit-unit").value.trim(),
    };

    if (!updates.name) return;

    handler(item.dataset.id, updates);
  });
};

export const addHandlerToggleCustomForm = function () {
  const addBtn = document.querySelector(".shopping-list__add-btn");
  const form = document.querySelector(".shopping-list__custom-form");
  const nameInput = document.querySelector(".shopping-list__custom-name");

  addBtn.addEventListener("click", function () {
    const isHidden = form.classList.toggle("hidden");

    addBtn.setAttribute("aria-expanded", String(!isHidden));

    if (!isHidden) nameInput.focus();
  });
};

export const addHandlerAddCustomItem = function (handler) {
  const form = document.querySelector(".shopping-list__custom-form");
  const addBtn = document.querySelector(".shopping-list__add-btn");
  const nameInput = document.querySelector(".shopping-list__custom-name");
  const amountInput = document.querySelector(".shopping-list__custom-amount");
  const unitInput = document.querySelector(".shopping-list__custom-unit");
  const cancelBtn = document.querySelector(".shopping-list__custom-cancel");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    if (!name) {
      nameInput.focus();
      return;
    }

    const amountValue = amountInput.value;

    const item = {
      name,
      amount: amountValue === "" ? null : Number(amountValue),
      unit: unitInput.value.trim(),
    };

    handler(item);

    form.reset();
    form.classList.add("hidden");
    addBtn.setAttribute("aria-expanded", "false");
  });

  cancelBtn.addEventListener("click", function () {
    form.reset();
    form.classList.add("hidden");
    addBtn.setAttribute("aria-expanded", "false");
  });
};

export const addHandlerClearCompleted = function (handler) {
  clearCompletedBtn.addEventListener("click", function () {
    handler();
  });
};
