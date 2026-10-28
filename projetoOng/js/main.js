/* ==========================================================================
   Interações mínimas de interface (o visual fica todo no CSS)
   - menu hambúrguer e submenus
   - toasts, modals e alerts
   - validação visual do formulário
   - filtros de projetos
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Menu hambúrguer ---------- */
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  const closeNav = () => {
    toggle?.setAttribute("aria-expanded", "false");
    nav?.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  toggle?.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
    document.body.classList.toggle("nav-open", !open);
  });

  window.matchMedia("(min-width: 1024px)").addEventListener("change", closeNav);

  /* ---------- Submenus (clique / teclado) ---------- */
  document.querySelectorAll(".has-submenu > .nav-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.parentElement;
      const open = item.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    document.querySelectorAll(".has-submenu.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".nav-link")?.setAttribute("aria-expanded", "false");
    });
    closeNav();
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest(".has-submenu")) return;
    document.querySelectorAll(".has-submenu.is-open").forEach((item) => {
      item.classList.remove("is-open");
      item.querySelector(".nav-link")?.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Alerts fecháveis ---------- */
  document.querySelectorAll(".alert__close").forEach((btn) =>
    btn.addEventListener("click", () => btn.closest(".alert").remove())
  );

  /* ---------- Modals (<dialog>) ---------- */
  document.querySelectorAll("[data-modal-open]").forEach((btn) =>
    btn.addEventListener("click", () =>
      document.getElementById(btn.dataset.modalOpen)?.showModal()
    )
  );

  document.querySelectorAll(".modal").forEach((modal) => {
    modal.querySelectorAll("[data-modal-close]").forEach((btn) =>
      btn.addEventListener("click", () => modal.close())
    );
    // fecha ao clicar no fundo escuro
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.close();
    });
  });

  /* ---------- Toasts ---------- */
  window.showToast = (message, type = "info") => {
    let region = document.querySelector(".toast-region");
    if (!region) {
      region = document.createElement("div");
      region.className = "toast-region";
      region.setAttribute("aria-live", "polite");
      document.body.append(region);
    }
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.setAttribute("role", "status");
    toast.innerHTML = `<span class="toast__dot" aria-hidden="true"></span>
      <span></span>
      <button class="toast__close" aria-label="Fechar notificação">&times;</button>`;
    toast.children[1].textContent = message;

    const remove = () => {
      toast.classList.add("is-leaving");
      toast.addEventListener("animationend", () => toast.remove(), { once: true });
    };
    toast.querySelector(".toast__close").addEventListener("click", remove);
    setTimeout(remove, 4500);
    region.append(toast);
  };

  document.querySelectorAll("[data-toast]").forEach((btn) =>
    btn.addEventListener("click", () =>
      showToast(btn.dataset.toast, btn.dataset.toastType)
    )
  );

  /* ---------- Formulário com validação visual ---------- */
  const form = document.querySelector("#form-cadastro");
  if (form) {
    // Máscaras simples
    const mask = (el, fn) => el?.addEventListener("input", () => (el.value = fn(el.value)));
    mask(form.querySelector("#cpf"), (v) =>
      v.replace(/\D/g, "").slice(0, 11)
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    );
    mask(form.querySelector("#telefone"), (v) =>
      v.replace(/\D/g, "").slice(0, 11)
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
    );
    mask(form.querySelector("#cep"), (v) =>
      v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2")
    );

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      form.classList.add("is-touched");
      const alertBox = document.querySelector("#form-alert");

      if (!form.checkValidity()) {
        alertBox.className = "alert alert--error";
        alertBox.hidden = false;
        alertBox.querySelector(".alert__title").textContent = "Confira os campos destacados";
        alertBox.querySelector(".alert__text").textContent =
          "Alguns dados obrigatórios estão vazios ou em formato inválido.";
        form.querySelector(":invalid")?.focus();
        showToast("Formulário com erros. Revise os campos.", "error");
        return;
      }

      const btn = form.querySelector('[type="submit"]');
      btn.classList.add("is-loading");
      setTimeout(() => {
        btn.classList.remove("is-loading");
        alertBox.hidden = true;
        document.getElementById("modal-sucesso")?.showModal();
        form.reset();
        form.classList.remove("is-touched");
      }, 900);
    });
  }

  /* ---------- Filtros de projetos ---------- */
  const filters = document.querySelectorAll(".filter[data-filter]");
  const cards = document.querySelectorAll("[data-category]");
  const empty = document.querySelector("#sem-resultados");
  const search = document.querySelector("#busca-projetos");
  let current = "todos";

  const apply = () => {
    const term = (search?.value || "").trim().toLowerCase();
    let visible = 0;
    cards.forEach((card) => {
      const okCat = current === "todos" || card.dataset.category === current;
      const okTerm = !term || card.textContent.toLowerCase().includes(term);
      const show = okCat && okTerm;
      card.hidden = !show;
      if (show) visible++;
    });
    if (empty) empty.hidden = visible > 0;
  };

  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      filters.forEach((b) => b.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      current = btn.dataset.filter;
      apply();
    })
  );
  search?.addEventListener("input", apply);

  // Pré-seleciona categoria vinda do submenu (ex.: projetos.html#educacao)
  const hash = location.hash.replace("#", "");
  const fromHash = document.querySelector(`.filter[data-filter="${hash}"]`);
  if (fromHash) fromHash.click();
  window.addEventListener("hashchange", () => {
    document.querySelector(`.filter[data-filter="${location.hash.slice(1)}"]`)?.click();
  });

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
});
