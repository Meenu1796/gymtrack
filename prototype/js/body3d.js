// Builds a low-poly primitive 3D body (no external model assets/3D pipeline —
// just spheres/cylinders, per the "buildable without a 3D artist" constraint)
// and handles drag-to-rotate + tap-to-pick body parts via raycasting.
//
// Front/back split per limb-or-torso segment is done by cutting each cylinder
// in half around its Y axis: theta in [0, PI] faces +Z (front), [PI, 2*PI]
// faces -Z (back), since the camera sits on +Z looking toward the origin.
window.initBody3D = function initBody3D(canvas) {
  const W = canvas.width, H = canvas.height;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(W, H, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf4f4f4);

  const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 50);
  camera.position.set(0, 1.05, 5.2);
  camera.lookAt(0, 1.0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dir = new THREE.DirectionalLight(0xffffff, 0.7);
  dir.position.set(2, 3, 4);
  scene.add(dir);

  const rig = new THREE.Group();
  scene.add(rig);

  const FRONT = { thetaStart: 0, thetaLength: Math.PI };
  const BACK = { thetaStart: Math.PI, thetaLength: Math.PI };

  function halfCylinder(radius, height, half, color) {
    const geo = new THREE.CylinderGeometry(radius, radius, height, 20, 1, false, half.thetaStart, half.thetaLength);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });
    return new THREE.Mesh(geo, mat);
  }
  function fullCylinder(radius, height, color) {
    const geo = new THREE.CylinderGeometry(radius, radius, height, 20);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });
    return new THREE.Mesh(geo, mat);
  }
  function sphere(radius, color) {
    const geo = new THREE.SphereGeometry(radius, 20, 16);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.7 });
    return new THREE.Mesh(geo, mat);
  }

  const CONFIG = {
    female: {
      skin: 0xffcbb5, core: 0xff8a65,
      shoulderX: 0.30, torsoUpperR: 0.30, torsoLowerR: 0.22,
      armR: 0.10, thighR: 0.18, calfR: 0.12,
    },
    male: {
      skin: 0xd7ae82, core: 0xb97b4b,
      shoulderX: 0.40, torsoUpperR: 0.34, torsoLowerR: 0.30,
      armR: 0.12, thighR: 0.20, calfR: 0.13,
    },
  };

  function buildBody(cfg) {
    const g = new THREE.Group();

    const head = sphere(0.27, cfg.skin);
    head.position.y = 2.0;
    g.add(head);

    const neck = fullCylinder(0.11, 0.14, cfg.skin);
    neck.position.y = 1.75;
    g.add(neck);

    [-1, 1].forEach((side) => {
      const shoulder = sphere(0.15, cfg.skin);
      shoulder.position.set(side * cfg.shoulderX, 1.55, 0);
      shoulder.userData.part = "shoulders";
      g.add(shoulder);

      const biceps = halfCylinder(cfg.armR, 0.55, FRONT, cfg.skin);
      biceps.position.set(side * (cfg.shoulderX + 0.02), 1.27, 0);
      biceps.userData.part = "biceps";
      g.add(biceps);

      const triceps = halfCylinder(cfg.armR, 0.55, BACK, cfg.skin);
      triceps.position.copy(biceps.position);
      triceps.userData.part = "triceps";
      g.add(triceps);

      const forearm = fullCylinder(cfg.armR * 0.85, 0.5, cfg.skin);
      forearm.position.set(side * (cfg.shoulderX + 0.02), 0.74, 0);
      g.add(forearm);

      const thighX = 0.14;
      const quads = halfCylinder(cfg.thighR, 0.62, FRONT, cfg.core);
      quads.position.set(side * thighX, 0.28, 0);
      quads.userData.part = "quads";
      g.add(quads);

      const hamstrings = halfCylinder(cfg.thighR, 0.62, BACK, cfg.core);
      hamstrings.position.copy(quads.position);
      hamstrings.userData.part = "hamstrings";
      g.add(hamstrings);

      const calf = fullCylinder(cfg.calfR, 0.56, cfg.skin);
      calf.position.set(side * thighX, -0.30, 0);
      calf.userData.part = "calves";
      g.add(calf);
    });

    const chest = halfCylinder(cfg.torsoUpperR, 0.5, FRONT, cfg.core);
    chest.position.y = 1.27;
    chest.userData.part = "chest";
    g.add(chest);

    const back = halfCylinder(cfg.torsoUpperR, 0.5, BACK, cfg.core);
    back.position.y = 1.27;
    back.userData.part = "back";
    g.add(back);

    const abs = halfCylinder(cfg.torsoLowerR, 0.4, FRONT, cfg.skin);
    abs.position.y = 0.82;
    abs.userData.part = "abs";
    g.add(abs);

    const glutes = halfCylinder(cfg.torsoLowerR, 0.4, BACK, cfg.skin);
    glutes.position.y = 0.82;
    glutes.userData.part = "glutes";
    g.add(glutes);

    return g;
  }

  const groups = { female: buildBody(CONFIG.female), male: buildBody(CONFIG.male) };
  rig.add(groups.female);
  rig.add(groups.male);
  groups.male.visible = false;

  let currentGender = "female";
  function setGender(gender) {
    currentGender = gender;
    groups.female.visible = gender === "female";
    groups.male.visible = gender === "male";
    clearSelection();
  }

  // ---- selection highlight ----
  let selectedMeshes = [];
  const originalColors = new Map();
  function clearSelection() {
    selectedMeshes.forEach((m) => {
      if (originalColors.has(m)) m.material.color.copy(originalColors.get(m));
    });
    selectedMeshes = [];
  }
  function selectPart(part) {
    clearSelection();
    const group = groups[currentGender];
    group.children.forEach((m) => {
      if (m.userData.part === part) {
        if (!originalColors.has(m)) originalColors.set(m, m.material.color.clone());
        m.material.color.set(0xff6b35);
        selectedMeshes.push(m);
      }
    });
  }

  // ---- drag to rotate + tap to pick ----
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let dragging = false, lastX = 0, moved = 0, velocity = 0;
  let tapCallback = null;

  function pick(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(groups[currentGender].children, false);
    const hit = hits.find((h) => h.object.userData.part);
    if (hit) {
      const part = hit.object.userData.part;
      selectPart(part);
      if (tapCallback) tapCallback(part);
    }
  }

  canvas.addEventListener("pointerdown", (e) => {
    dragging = true; lastX = e.clientX; moved = 0; velocity = 0;
  });
  window.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    lastX = e.clientX;
    moved += Math.abs(dx);
    velocity = dx * 0.01;
    rig.rotation.y += velocity;
  });
  window.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    dragging = false;
    if (moved < 6) pick(e.clientX, e.clientY);
  });

  (function animate() {
    requestAnimationFrame(animate);
    if (!dragging) {
      rig.rotation.y += velocity;
      velocity *= 0.93;
      if (Math.abs(velocity) < 0.0002) velocity = 0;
    }
    renderer.render(scene, camera);
  })();

  return {
    setGender,
    onPartTap(cb) { tapCallback = cb; },
    clearSelection,
  };
};
