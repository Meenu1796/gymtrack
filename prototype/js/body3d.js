// Builds a low-poly primitive 3D body (no external model assets/3D pipeline —
// procedural geometry only) using LatheGeometry profiles for the torso/hips
// (smooth taper shoulder->chest->waist->hip) and tapered cylinders for limbs
// (narrowing toward elbows/knees/ankles), so it reads as an organic human
// shape rather than stacked "brick" cylinders.
//
// Each of the 10 muscle groups has its own permanent color (used for both the
// 3D highlight and the matching text label). Front/back is controlled by the
// toggle switch (setSide), not a drag gesture — it animates with a smooth
// rotation tween rather than snapping instantly.
//
// Front/back split for any segment: angle [0, PI] faces +Z (front), [PI, 2*PI]
// faces -Z (back), since the camera sits on +Z looking toward the origin.
window.initBody3D = function initBody3D(canvas) {
  const W = canvas.width, H = canvas.height;

  window.PART_COLORS = {
    shoulders: 0xf4a261, chest: 0xe63946, biceps: 0x8e44ad, abs: 0x00b4d8, quads: 0xffd60a,
    back: 0x06d6a0, triceps: 0xf15bb5, glutes: 0x6d4c41, hamstrings: 0xfb8b24, calves: 0x118ab2,
  };
  const SKIN_NEUTRAL = 0xd9d9dc;
  const REST_OPACITY = 0.55;
  const SELECTED_OPACITY = 0.92;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(W, H, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 50);
  camera.position.set(0, 1.05, 6.2);
  camera.lookAt(0, 1.05, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dir = new THREE.DirectionalLight(0xffffff, 0.5);
  dir.position.set(2, 3, 4);
  scene.add(dir);

  const rig = new THREE.Group();
  scene.add(rig);

  const FRONT = { start: 0, length: Math.PI };
  const BACK = { start: Math.PI, length: Math.PI };

  function holoPart(geometry, part) {
    const color = part ? window.PART_COLORS[part] : SKIN_NEUTRAL;
    const group = new THREE.Group();
    const fillMat = new THREE.MeshStandardMaterial({
      color, transparent: true, opacity: REST_OPACITY, roughness: 0.6, side: THREE.DoubleSide,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color, wireframe: true, transparent: true, opacity: part ? 0.5 : 0.15, side: THREE.DoubleSide,
    });
    group.add(new THREE.Mesh(geometry, fillMat));
    group.add(new THREE.Mesh(geometry, wireMat));
    group.userData.fillMat = fillMat;
    group.userData.wireMat = wireMat;
    group.userData.baseColor = color;
    if (part) group.userData.part = part;
    return group;
  }

  function limb(topR, bottomR, height, centerY, half, part) {
    const geo = new THREE.CylinderGeometry(topR, bottomR, height, 16, 1, false, half.start, half.length);
    const p = holoPart(geo, part);
    p.position.y = centerY;
    return p;
  }
  function lathe(profile, half, part) {
    const pts = profile.map((p) => new THREE.Vector2(p[0], p[1]));
    const geo = new THREE.LatheGeometry(pts, 20, half.start, half.length);
    return holoPart(geo, part);
  }
  function sphere(radius, centerY, part) {
    const geo = new THREE.SphereGeometry(radius, 20, 16);
    const p = holoPart(geo, part);
    p.position.y = centerY;
    return p;
  }

  const CONFIG = {
    female: {
      headR: 0.25,
      shoulderR: 0.27, chestR: 0.30, waistR: 0.19, hipR: 0.33, hipBottomR: 0.23,
      armTopR: 0.10, armBottomR: 0.08, forearmTopR: 0.08, forearmBottomR: 0.06,
      thighX: 0.12, thighTopR: 0.17, thighBottomR: 0.12,
      calfTopR: 0.12, calfBottomR: 0.075,
    },
    male: {
      headR: 0.26,
      shoulderR: 0.37, chestR: 0.39, waistR: 0.30, hipR: 0.32, hipBottomR: 0.25,
      armTopR: 0.135, armBottomR: 0.10, forearmTopR: 0.10, forearmBottomR: 0.075,
      thighX: 0.135, thighTopR: 0.19, thighBottomR: 0.135,
      calfTopR: 0.135, calfBottomR: 0.085,
    },
  };

  function buildBody(cfg) {
    const g = new THREE.Group();

    const head = sphere(cfg.headR, 1.93, null);
    head.scale.set(1, 1.12, 1);
    g.add(head);

    const neck = limb(0.14, cfg.shoulderR * 0.55, 0.18, 1.66, { start: 0, length: Math.PI * 2 }, null);
    g.add(neck);

    const upperProfile = [[cfg.shoulderR, 1.58], [cfg.chestR, 1.34], [cfg.waistR, 1.06]];
    const lowerProfile = [[cfg.waistR, 1.06], [cfg.hipR, 0.88], [cfg.hipBottomR, 0.64]];
    g.add(lathe(upperProfile, FRONT, "chest"));
    g.add(lathe(upperProfile, BACK, "back"));
    g.add(lathe(lowerProfile, FRONT, "abs"));
    g.add(lathe(lowerProfile, BACK, "glutes"));

    [-1, 1].forEach((side) => {
      const armX = side * (cfg.shoulderR + cfg.armTopR * 0.2);

      const shoulder = sphere(cfg.armTopR * 1.2, 1.56, "shoulders");
      shoulder.position.x = armX;
      g.add(shoulder);

      const biceps = limb(cfg.armTopR, cfg.armBottomR, 0.52, 1.30, FRONT, "biceps");
      biceps.position.x = armX;
      g.add(biceps);

      const triceps = limb(cfg.armTopR, cfg.armBottomR, 0.52, 1.30, BACK, "triceps");
      triceps.position.x = armX;
      g.add(triceps);

      const forearm = limb(cfg.forearmTopR, cfg.forearmBottomR, 0.46, 0.81, { start: 0, length: Math.PI * 2 }, null);
      forearm.position.x = armX;
      g.add(forearm);

      const legX = side * cfg.thighX;

      const quads = limb(cfg.thighTopR, cfg.thighBottomR, 0.58, 0.36, FRONT, "quads");
      quads.position.x = legX;
      g.add(quads);

      const hamstrings = limb(cfg.thighTopR, cfg.thighBottomR, 0.58, 0.36, BACK, "hamstrings");
      hamstrings.position.x = legX;
      g.add(hamstrings);

      const calf = limb(cfg.calfTopR, cfg.calfBottomR, 0.5, -0.14, { start: 0, length: Math.PI * 2 }, "calves");
      calf.position.x = legX;
      g.add(calf);
    });

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

  // ---- front/back via toggle switch (smooth tween, no drag) ----
  let targetY = 0, currentY = 0;
  function setSide(side) {
    targetY = side === "back" ? Math.PI : 0;
  }

  // ---- selection highlight ----
  let selectedPart = null;
  function applyState(partGroup, opacity) {
    partGroup.userData.fillMat.opacity = opacity;
    partGroup.userData.wireMat.opacity = opacity > REST_OPACITY ? 1 : 0.5;
  }
  function clearSelection() {
    if (selectedPart) applyState(selectedPart, REST_OPACITY);
    selectedPart = null;
  }
  function selectPart(part) {
    clearSelection();
    groups[currentGender].children.forEach((g) => {
      if (g.userData.part === part) {
        applyState(g, SELECTED_OPACITY);
        selectedPart = g;
      }
    });
  }

  // ---- tap to pick (no drag-rotate; rotation is toggle-driven) ----
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let tapCallback = null;

  function findPartGroup(obj) {
    while (obj) {
      if (obj.userData && obj.userData.part) return obj;
      obj = obj.parent;
    }
    return null;
  }

  function pick(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(groups[currentGender].children, true);
    for (const h of hits) {
      const partGroup = findPartGroup(h.object);
      if (partGroup) {
        selectPart(partGroup.userData.part);
        if (tapCallback) tapCallback(partGroup.userData.part, window.PART_COLORS[partGroup.userData.part]);
        return;
      }
    }
  }

  canvas.addEventListener("click", (e) => pick(e.clientX, e.clientY));

  (function animate() {
    requestAnimationFrame(animate);
    currentY += (targetY - currentY) * 0.15;
    rig.rotation.y = currentY;
    renderer.render(scene, camera);
  })();

  return {
    setGender,
    setSide,
    onPartTap(cb) { tapCallback = cb; },
    clearSelection,
  };
};
