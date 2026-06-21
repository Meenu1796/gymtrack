(function () {
  const screens = document.querySelectorAll(".screen");
  function showScreen(id) {
    screens.forEach((s) => s.classList.toggle("active", s.id === id));
  }

  // Splash -> Home auto transition
  setTimeout(() => showScreen("screen-home"), 1600);

  // Home navigation
  document.getElementById("card-bodymap").addEventListener("click", () => {
    showScreen("screen-bodymap");
  });
  document.getElementById("card-plans").addEventListener("click", () => {
    showScreen("screen-plans");
  });

  // Body map: home buttons always return to Home
  document.getElementById("btn-home-from-bodymap").addEventListener("click", () => {
    closeSheet();
    showScreen("screen-home");
  });
  document.getElementById("btn-home-from-plans").addEventListener("click", () => {
    showScreen("screen-home");
  });
  document.getElementById("btn-home-from-detail").addEventListener("click", () => {
    showScreen("screen-home");
  });

  // Plans list -> detail
  document.querySelectorAll(".list-row").forEach((row) => {
    row.addEventListener("click", () => {
      const planKey = row.dataset.plan;
      const plan = window.WORKOUT_PLANS[planKey];
      document.getElementById("plan-detail-title").textContent = plan.title;
      const list = document.getElementById("plan-detail-list");
      list.innerHTML = "";
      plan.exercises.forEach((ex) => {
        const li = document.createElement("li");
        li.textContent = ex;
        list.appendChild(li);
      });
      showScreen("screen-plan-detail");
    });
  });
  document.getElementById("btn-back-to-plans").addEventListener("click", () => {
    showScreen("screen-plans");
  });

  // ---- Body Map: flat 2D muscle map, front/back + gender toggle switches ----
  const state = { side: "front", gender: "female" };
  const partLabel = document.getElementById("part-label");
  const muscleSvg = document.getElementById("muscle-svg");
  const sideToggle = document.getElementById("toggle-side");
  const sideLabel = document.getElementById("side-label");
  const genderToggle = document.getElementById("toggle-gender");
  const genderLabel = document.getElementById("gender-label");

  function renderBody() {
    document.getElementById("view-front").classList.toggle("active", state.side === "front");
    document.getElementById("view-back").classList.toggle("active", state.side === "back");
    muscleSvg.classList.toggle("gender-female", state.gender === "female");
    muscleSvg.classList.toggle("gender-male", state.gender === "male");
    sideLabel.textContent = state.side === "front" ? "Side (Front)" : "Side (Back)";
    genderLabel.textContent = state.gender === "female" ? "Gender (Female)" : "Gender (Male)";
    sideToggle.setAttribute("aria-pressed", state.side === "back");
    genderToggle.setAttribute("aria-pressed", state.gender === "male");
    partLabel.textContent = "Tap a highlighted body part";
    closeSheet();
  }

  sideToggle.addEventListener("click", () => {
    state.side = state.side === "front" ? "back" : "front";
    renderBody();
  });
  genderToggle.addEventListener("click", () => {
    state.gender = state.gender === "female" ? "male" : "female";
    renderBody();
  });

  muscleSvg.addEventListener("click", (e) => {
    const target = e.target.closest(".muscle");
    if (!target) return;
    const part = target.dataset.part;
    document.querySelectorAll(".muscle.selected").forEach((el) => el.classList.remove("selected"));
    document.querySelectorAll(`.muscle[data-part="${part}"]`).forEach((el) => el.classList.add("selected"));
    partLabel.textContent = part.charAt(0).toUpperCase() + part.slice(1);
    openSheet(part);
  });

  // ---- Bottom sheet ----
  const sheet = document.getElementById("sheet");
  const sheetBackdrop = document.getElementById("sheet-backdrop");
  const sheetTitle = document.getElementById("sheet-title");
  const sheetList = document.getElementById("sheet-list");

  function openSheet(part) {
    sheetTitle.textContent = part.charAt(0).toUpperCase() + part.slice(1);
    sheetList.innerHTML = "";
    (window.EXERCISES[part] || []).forEach((ex) => {
      const li = document.createElement("li");
      li.textContent = ex;
      sheetList.appendChild(li);
    });
    sheet.classList.add("open");
    sheetBackdrop.classList.add("visible");
  }
  function closeSheet() {
    sheet.classList.remove("open");
    sheetBackdrop.classList.remove("visible");
    document.querySelectorAll(".muscle.selected").forEach((el) => el.classList.remove("selected"));
  }
  sheetBackdrop.addEventListener("click", closeSheet);

  renderBody();
})();
