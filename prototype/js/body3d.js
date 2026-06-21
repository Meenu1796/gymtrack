// Builds a low-poly primitive 3D body (no external model assets/3D pipeline —
// just spheres/cylinders, per the "buildable without a 3D artist" constraint)
// rendered in a "hologram scan" style (dark background, glowing cyan wireframe)
// and handles drag-to-rotate + tap-to-pick body parts via raycasting.
//
// Front/back split per limb-or-torso segment is done by cutting each cylinder
// in half around its Y axis: theta in [0, PI] faces +Z (front), [PI, 2*PI]
// faces -Z (back), since the camera sits on +Z looking toward the origin.
window.initBody3D = function initBody3D(canvas) {
  const W = canvas.width, H = canvas.height;

  const HOLO_COLOR = 0x22d3ee;
  const SELECTED_COLOR = 0xff6b35;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(W, H, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0e27);

  const camera = new THREE.PerspectiveCamera(32, W / H, 0.1, 50);
  camera.position.set(0, 1.05, 5.2);
  camera.lookAt(0, 1.0, 0);

  const rig = new THREE.Group();
  scene.add(rig);

  const FRONT = { thetaStart: 0, thetaLength: Math.PI };
  const BACK = { thetaStart: Math.PI, thetaLength: Math.PI };

  // Each part is a small Group: a near-invisible solid "fill" mesh (keeps the
  // silhouette readable and gives the raycaster a real hit target) plus a
  // bright wireframe mesh on top for the glowing hologram look.
  function holoPart(geometry, part) {
    const group = new THREE.Group();
    const fillMat = new THREE.MeshBasicMaterial({
      color: HOLO_COLOR, transparent: true, opacity: 0.08, depthWrite: false,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: HOLO_COLOR, wireframe: true, transparent: true, opacity: 0.85,
    });
    group.add(new THREE.Mesh(geometry, fillMat));
    group.add(new THREE.Mesh(geometry, wireMat));
    group.userData.fillMat = fillMat;
    group.userData.wireMat = wireMat;
    if (part) group.userData.part = part;
    return group;
  }
  function halfCylinder(radius, height, half, part) {
    const geo = new THREE.CylinderGeometry(radius, radius, height, 20, 1, false, half.thetaStart, half.thetaLength);
    return holoPart(geo, part);
  }
  function fullCylinder(radius, height, part) {
    const geo = new THREE.CylinderGeometry(radius, radius, height, 20);
    return holoPart(geo, part);
  }
  function sphere(radius, part) {
    const geo = new THREE.SphereGeometry(radius, 20, 16);
    return holoPart(geo, part);
  }

  const CONFIG = {
    female: {
      shoulderX: 0.30, torsoUpperR: 0.30, torsoLowerR: 0.22,
      armR: 0.10, thighR: 0.18, calfR: 0.12,
    },
    male: {
      shoulderX: 0.40, torsoUpperR: 0.34, torsoLowerR: 0.30,
      armR: 0.12, thighR: 0.20, calfR: 0.13,
    },
  };

  function buildBody(cfg) {
    const g = new THREE.Group();

    const head = sphere(0.27, null);
    head.position.y = 2.0;
    g.add(head);

    const neck = fullCylinder(0.11, 0.14, null);
    neck.position.y = 1.75;
    g.add(neck);

    [-1, 1].forEach((side) => {
      const shoulder = sphere(0.15, "shoulders");
      shoulder.position.set(side * cfg.shoulderX, 1.55, 0);
      g.add(shoulder);

      const biceps = halfCylinder(cfg.armR, 0.55, FRONT, "biceps");
      biceps.position.set(side * (cfg.shoulderX + 0.02), 1.27, 0);
      g.add(biceps);

      const triceps = halfCylinder(cfg.armR, 0.55, BACK, "triceps");
      triceps.position.copy(biceps.position);
      g.add(triceps);

      const forearm = fullCylinder(cfg.armR * 0.85, 0.5, null);
      forearm.position.set(side * (cfg.shoulderX + 0.02), 0.74, 0);
      g.add(forearm);

      const thighX = 0.14;
      const quads = halfCylinder(cfg.thighR, 0.62, FRONT, "quads");
      quads.position.set(side * thighX, 0.28, 0);
      g.add(quads);

      const hamstrings = halfCylinder(cfg.thighR, 0.62, BACK, "hamstrings");
      hamstrings.position.copy(quads.position);
      g.add(hamstrings);

      const calf = fullCylinder(cfg.calfR, 0.56, "calves");
      calf.position.set(side * thighX, -0.30, 0);
      g.add(calf);
    });

    const chest = halfCylinder(cfg.torsoUpperR, 0.5, FRONT, "chest");
    chest.position.y = 1.27;
    g.add(chest);

    const back = halfCylinder(cfg.torsoUpperR, 0.5, BACK, "back");
    back.position.y = 1.27;
    g.add(back);

    const abs = halfCylinder(cfg.torsoLowerR, 0.4, FRONT, "abs");
    abs.position.y = 0.82;
    g.add(abs);

    const glutes = halfCylinder(cfg.torsoLowerR, 0.4, BACK, "glutes");
    glutes.position.y = 0.82;
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
  let selectedPart = null;
  function setPartColor(partGroup, color, fillOpacity) {
    partGroup.userData.fillMat.color.set(color);
    partGroup.userData.wireMat.color.set(color);
    partGroup.userData.fillMat.opacity = fillOpacity;
  }
  function clearSelection() {
    if (selectedPart) setPartColor(selectedPart, HOLO_COLOR, 0.08);
    selectedPart = null;
  }
  function selectPart(part) {
    clearSelection();
    const group = groups[currentGender];
    group.children.forEach((g) => {
      if (g.userData.part === part) {
        setPartColor(g, SELECTED_COLOR, 0.22);
        selectedPart = g;
      }
    });
  }

  // ---- drag to rotate + tap to pick ----
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let dragging = false, lastX = 0, moved = 0, velocity = 0;
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
        if (tapCallback) tapCallback(partGroup.userData.part);
        return;
      }
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
