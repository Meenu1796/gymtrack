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

  // ---- Body Map: 3D model, front/back + gender toggle switches, per-part color ----
  const state = { side: "front", gender: "female" };
  const partLabel = document.getElementById("part-label");
  const sideToggle = document.getElementById("toggle-side");
  const sideLabel = document.getElementById("side-label");
  const genderToggle = document.getElementById("toggle-gender");
  const genderLabel = document.getElementById("gender-label");
  const legendRow = document.getElementById("legend-row");

  const body3d = window.initBody3D(document.getElementById("body-canvas"));

  const FRONT_PARTS = ["shoulders", "chest", "biceps", "abs", "quads"];
  const BACK_PARTS = ["back", "triceps", "glutes", "hamstrings", "calves"];
  function toHex(num) { return "#" + num.toString(16).padStart(6, "0"); }
  function renderLegend() {
    const parts = state.side === "front" ? FRONT_PARTS : BACK_PARTS;
    legendRow.innerHTML = "";
    parts.forEach((part) => {
      const chip = document.createElement("span");
      chip.className = "legend-chip";
      chip.innerHTML = `<span class="dot" style="background:${toHex(window.PART_COLORS[part])}"></span>${part.charAt(0).toUpperCase() + part.slice(1)}`;
      legendRow.appendChild(chip);
    });
  }

  function renderBody() {
    body3d.setSide(state.side);
    body3d.setGender(state.gender);
    sideLabel.textContent = state.side === "front" ? "Side (Front)" : "Side (Back)";
    genderLabel.textContent = state.gender === "female" ? "Gender (Female)" : "Gender (Male)";
    sideToggle.setAttribute("aria-pressed", state.side === "back");
    genderToggle.setAttribute("aria-pressed", state.gender === "male");
    partLabel.textContent = "Tap a highlighted body part";
    partLabel.style.color = "var(--text-dark)";
    renderLegend();
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

  body3d.onPartTap((part, colorNum) => {
    const hex = toHex(colorNum);
    partLabel.textContent = part.charAt(0).toUpperCase() + part.slice(1);
    partLabel.style.color = hex;
    openSheet(part, hex);
  });

  // ---- Bottom sheet ----
  const sheet = document.getElementById("sheet");
  const sheetBackdrop = document.getElementById("sheet-backdrop");
  const sheetTitle = document.getElementById("sheet-title");
  const sheetList = document.getElementById("sheet-list");

  function openSheet(part, hex) {
    sheetTitle.textContent = part.charAt(0).toUpperCase() + part.slice(1);
    sheetTitle.style.color = hex || "var(--text-dark)";
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
    body3d.clearSelection();
  }
  sheetBackdrop.addEventListener("click", closeSheet);

  renderBody();
})();
