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

  // ---- Body Map: gender toggle + rotate + hotspots ----
  const state = { gender: "female", view: "front" };
  const stage = document.getElementById("body-stage");
  const partLabel = document.getElementById("part-label");

  function renderBody() {
    document.querySelectorAll(".bodyview").forEach((g) => {
      const active = g.dataset.gender === state.gender && g.dataset.view === state.view;
      g.classList.toggle("active", active);
    });
    closeSheet();
    partLabel.textContent = "Tap a highlighted body part";
  }

  document.getElementById("btn-gender").addEventListener("click", () => {
    state.gender = state.gender === "female" ? "male" : "female";
    renderBody();
  });

  // Drag-to-rotate (front <-> back)
  let dragStartX = null;
  stage.addEventListener("pointerdown", (e) => {
    dragStartX = e.clientX;
    stage.style.cursor = "grabbing";
  });
  window.addEventListener("pointerup", (e) => {
    if (dragStartX === null) return;
    const dx = e.clientX - dragStartX;
    if (Math.abs(dx) > 40) {
      state.view = dx < 0 ? "back" : "front";
      renderBody();
    }
    dragStartX = null;
    stage.style.cursor = "grab";
  });

  // Hotspot taps (event delegation, works across all 4 body groups)
  document.getElementById("body-svg").addEventListener("click", (e) => {
    const hot = e.target.closest(".hot");
    if (!hot) return;
    const part = hot.dataset.part;
    document.querySelectorAll(".hot.selected").forEach((el) => el.classList.remove("selected"));
    hot.classList.add("selected");
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
    document.querySelectorAll(".hot.selected").forEach((el) => el.classList.remove("selected"));
  }
  sheetBackdrop.addEventListener("click", closeSheet);

  renderBody();
})();
