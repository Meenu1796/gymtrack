// Builds a low-poly primitive 3D body (no external model assets/3D pipeline —
// still just procedural geometry, per the "buildable without a 3D artist"
// constraint) rendered in a "hologram scan" style (dark background, glowing
// cyan wireframe), and handles drag-to-rotate + tap-to-pick body parts via
// raycasting.
//
// Unlike a stack of flat cylinders ("bricks"), the torso/hips are built from
// LatheGeometry profiles (a curve revolved around the Y axis) so they taper
// smoothly shoulder->chest->waist->hip, and limbs use cylinders with different
// top/bottom radii so they narrow toward elbows/knees/ankles like real limbs.
//
// Front/back split for any segment is done by only revolving/sweeping half
// the circle: angle [0, PI] faces +Z (front), [PI, 2*PI] faces -Z (back),
// since the camera sits on +Z looking toward the origin.
window.initBody3D = function initBody3D(canvas) {
  const W = canvas.width, H = canvas.height;

  const HOLO_COLOR = 0x22d3ee;
  const SELECTED_COLOR = 0xff6b35;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(W, H, false);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0e27);

  const camera = new THREE.PerspectiveCamera(30, W / H, 0.1, 50);
  camera.position.set(0, 1.05, 6.2);
  camera.lookAt(0, 1.05, 0);

  const rig = new THREE.Group();
  scene.add(rig);

  const FRONT = { start: 0, length: Math.PI };
  const BACK = { start: Math.PI, length: Math.PI };

  // Each part is a small Group: a near-invisible solid "fill" mesh (keeps the
  // silhouette readable and gives the raycaster a real hit target) plus a
  // bright wireframe mesh on top for the glowing hologram look.
  function holoPart(geometry, part) {
    const group = new THREE.Group();
    const fillMat = new THREE.MeshBasicMaterial({
      color: HOLO_COLOR, transparent: true, opacity: 0.08, depthWrite: false, side: THREE.DoubleSide,
    });
    const wireMat = new THREE.MeshBasicMaterial({
      color: HOLO_COLOR, wireframe: true, transparent: true, opacity: 0.85, side: THREE.DoubleSide,
    });
    group.add(new THREE.Mesh(geometry, fillMat));
    group.add(new THREE.Mesh(geometry, wireMat));
    group.userData.fillMat = fillMat;
    group.userData.wireMat = wireMat;
    if (part) group.userData.part = part;
    return group;
  }

  // Tapered cylinder for limbs (different top/bottom radius = narrows toward
  // the joint, instead of a uniform "brick" tube).
  function limb(topR, bottomR, height, centerY, half, part) {
    const geo = new THREE.CylinderGeometry(topR, bottomR, height, 16, 1, false, half.start, half.length);
    const part3d = holoPart(geo, part);
    part3d.position.y = centerY;
    return part3d;
  }

  // Smooth torso/hip segment: profile is an array of [radius, absoluteY]
  // pairs, revolved around Y. Sharing an identical boundary point between
  // adjacent segments (e.g. waist) keeps the silhouette continuous.
  function lathe(profile, half, part) {
    const pts = profile.map((p) => new THREE.Vector2(p[0], p[1]));
    const geo = new THREE.LatheGeometry(pts, 20, half.start, half.length);
    return holoPart(geo, part);
  }

  function sphere(radius, centerY, part) {
    const geo = new THREE.SphereGeometry(radius, 20, 16);
    const part3d = holoPart(geo, part);
    part3d.position.y = centerY;
    return part3d;
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

    // Torso: upper (shoulder -> chest -> waist) tagged chest/back,
    // lower (waist -> hip -> hip-bottom) tagged abs/glutes. They share the
    // waist radius/height exactly so there's no gap or seam between them.
    const upperProfile = [
      [cfg.shoulderR, 1.58],
      [cfg.chestR, 1.34],
      [cfg.waistR, 1.06],
    ];
    const lowerProfile = [
      [cfg.waistR, 1.06],
      [cfg.hipR, 0.88],
      [cfg.hipBottomR, 0.64],
    ];
    const chest = lathe(upperProfile, FRONT, "chest");
    g.add(chest);
    const back = lathe(upperProfile, BACK, "back");
    g.add(back);
    const abs = lathe(lowerProfile, FRONT, "abs");
    g.add(abs);
    const glutes = lathe(lowerProfile, BACK, "glutes");
    g.add(glutes);

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
