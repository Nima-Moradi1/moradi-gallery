import * as T from "three";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";
import {
  mergeGeometries,
  mergeVertices,
} from "three/addons/utils/BufferGeometryUtils.js";
import fs from "node:fs/promises";
// Original Moradi concept geometry. All lengths in model units; face normal +Z.
const root = new T.Group();
root.name = "WatchAssembly";
const mats = {};
function material(name, color, metalness, roughness, extra = {}) {
  return (mats[name] = new T.MeshStandardMaterial({
    name,
    color,
    metalness,
    roughness,
    ...extra,
  }));
}
const gold = material("MetalCase", "#cdb27b", 1, 0.24),
  accent = material("MetalAccent", "#d9c087", 1, 0.22),
  brushed = material("MetalBrushed", "#9c9992", 1, 0.37),
  silver = material("MetalScrew", "#d0d5d7", 1, 0.2),
  dial = material("DialFace", "#141817", 0.55, 0.39),
  leather = material("StrapLeather", "#191511", 0.04, 0.64),
  stitch = material("StrapStitch", "#a68a61", 0.1, 0.7),
  black = material("DarkRecess", "#080a09", 0.1, 0.46),
  jewel = material("JewelRuby", "#8a1741", 0.4, 0.15),
  lume = material("Lume", "#ded9c3", 0.08, 0.5);
const glass = new T.MeshPhysicalMaterial({
  name: "CrystalGlass",
  color: "#d7e8ed",
  metalness: 0,
  roughness: 0.06,
  transparent: true,
  opacity: 0.08,
  clearcoat: 1,
  depthWrite: false,
});
mats.CrystalGlass = glass;
const groups = {};
for (const n of [
  "Case",
  "Bezel",
  "Dial",
  "Hands",
  "Crystal",
  "Movement",
  "Caseback",
  "Crown",
  "Strap",
]) {
  let g = new T.Group();
  g.name = n;
  root.add(g);
  groups[n] = g;
}
function mesh(g, geo, mat, x = 0, y = 0, z = 0) {
  let m = new T.Mesh(geo, mat);
  m.position.set(x, y, z);
  g.add(m);
  return m;
}
function lathe(profile, segments = 96) {
  let g = new T.LatheGeometry(
    profile.map((p) => new T.Vector2(...p)),
    segments,
  );
  g.rotateX(Math.PI / 2);
  return g;
}
function ring(g, r0, r1, z, h, mat) {
  return mesh(
    g,
    lathe([
      [r0, z],
      [r1 - 0.018, z],
      [r1, z + 0.018],
      [r1, z + h - 0.018],
      [r1 - 0.018, z + h],
      [r0, z + h],
      [r0, z],
    ]),
    mat,
  );
}
function disc(g, r, h, z, mat, x = 0, y = 0) {
  let a = new T.CylinderGeometry(r, r, h, 80);
  a.rotateX(Math.PI / 2);
  return mesh(g, a, mat, x, y, z);
}
function box(g, x, y, z, w, h, d, mat, rz = 0) {
  let m = mesh(g, new T.BoxGeometry(w, h, d), mat, x, y, z);
  m.rotation.z = rz;
  return m;
}
function extrusion(shape, depth, bevel = 0.018) {
  return new T.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: bevel,
    bevelThickness: bevel,
    curveSegments: 32,
  });
}
function roundedRect(w, h, r) {
  let s = new T.Shape();
  s.moveTo(-w / 2 + r, -h / 2);
  s.lineTo(w / 2 - r, -h / 2);
  s.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + r);
  s.lineTo(w / 2, h / 2 - r);
  s.quadraticCurveTo(w / 2, h / 2, w / 2 - r, h / 2);
  s.lineTo(-w / 2 + r, h / 2);
  s.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - r);
  s.lineTo(-w / 2, -h / 2 + r);
  s.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + r, -h / 2);
  return s;
}
// Radially machined case with multiple polished bevels and a recessed middle band.
ring(groups.Case, 0.82, 1.055, -0.19, 0.37, gold);
ring(groups.Case, 1.036, 1.061, -0.085, 0.135, brushed);
ring(groups.Bezel, 0.873, 1.046, 0.17, 0.11, gold);
ring(groups.Bezel, 0.883, 0.975, 0.276, 0.033, accent);
ring(groups.Bezel, 0.88, 0.899, 0.278, 0.034, black);
for (let sign of [-1, 1])
  for (let side of [-1, 1]) {
    let s = new T.Shape();
    s.moveTo(-0.13, 0);
    s.bezierCurveTo(-0.13, 0.13, -0.09, 0.29, -0.065, 0.41);
    s.lineTo(0.065, 0.41);
    s.lineTo(0.12, 0.06);
    s.closePath();
    let m = mesh(
      groups.Case,
      extrusion(s, 0.15, 0.025),
      gold,
      side * 0.68,
      sign * 0.79,
      -0.11,
    );
    m.scale.y = sign;
    let pin = mesh(
      groups.Case,
      new T.CylinderGeometry(0.045, 0.045, 1.24, 24),
      silver,
      0,
      sign * 1.16,
      -0.03,
    );
    pin.rotation.z = Math.PI / 2;
  }
// Dial: curved minute chapter and applied diamond-cut indices.
disc(groups.Dial, 0.88, 0.045, 0.202, dial);
ring(groups.Dial, 0.824, 0.876, 0.22, 0.02, brushed);
ring(groups.Dial, 0.817, 0.825, 0.242, 0.008, accent);
for (let i = 0; i < 60; i++) {
  let a = (i * Math.PI) / 30;
  let major = i % 5 === 0,
    r = major ? 0.746 : 0.806;
  box(
    groups.Dial,
    Math.sin(a) * r,
    Math.cos(a) * r,
    0.251,
    major ? 0.039 : 0.01,
    major ? 0.115 : 0.029,
    0.014,
    major ? accent : lume,
    -a,
  );
  if (major)
    box(
      groups.Dial,
      Math.sin(a) * r,
      Math.cos(a) * r,
      0.26,
      0.012,
      0.075,
      0.008,
      lume,
      -a,
    );
}
// Small seconds at six; deeply recessed guilloche concentric rings.
disc(groups.Dial, 0.212, 0.008, 0.234, black, 0, -0.42);
for (let r = 0.19; r > 0.03; r -= 0.012) {
  let ringGeo = new T.TorusGeometry(r, 0.0018, 4, 64);
  mesh(groups.Dial, ringGeo, brushed, 0, -0.42, 0.241);
}
for (let i = 0; i < 60; i++) {
  let a = (i * Math.PI) / 30;
  box(
    groups.Dial,
    Math.sin(a) * 0.185,
    -0.42 + Math.cos(a) * 0.185,
    0.252,
    0.006,
    i % 5 === 0 ? 0.023 : 0.012,
    0.005,
    accent,
    -a,
  );
}
const smallSecond = new T.Group();
smallSecond.name = "SmallSecondHand";
smallSecond.position.set(0, -0.42, 0.27);
groups.Dial.add(smallSecond);
box(smallSecond, 0, 0.07, 0, 0.009, 0.16, 0.008, accent);
disc(smallSecond, 0.015, 0.012, 0.01, accent);
// Applied original M at twelve, created from four narrow facets.
for (const [x, rz] of [
  [-0.082, 0],
  [0.082, 0],
  [-0.036, 0.65],
  [0.036, -0.65],
])
  box(groups.Dial, x, 0.49, 0.265, 0.014, 0.11, 0.012, accent, rz);
// Separate hands with centered pivots.
for (const [name, length, width, angle] of [
  ["HourHand", 0.43, 0.046, 0.85],
  ["MinuteHand", 0.64, 0.031, -1.12],
  ["SecondHand", 0.7, 0.009, 2.4],
]) {
  let g = new T.Group();
  g.name = name;
  groups.Hands.add(g);
  g.position.z =
    name === "HourHand" ? 0.285 : name === "MinuteHand" ? 0.304 : 0.325;
  g.rotation.z = angle;
  let s = new T.Shape();
  s.moveTo(-width * 0.6, -0.085);
  s.lineTo(-width, length * 0.7);
  s.lineTo(0, length);
  s.lineTo(width, length * 0.7);
  s.lineTo(width * 0.6, -0.085);
  s.closePath();
  mesh(g, extrusion(s, 0.008, 0.002), name === "SecondHand" ? accent : silver);
  if (name !== "SecondHand")
    box(g, 0, length * 0.36, 0.012, width * 0.42, length * 0.53, 0.004, lume);
  disc(g, 0.035, 0.018, 0.017, accent);
}
mesh(
  groups.Crystal,
  new T.SphereGeometry(0.896, 80, 24, 0, Math.PI * 2, 0, 0.34),
  glass,
).rotation.x = Math.PI / 2;
groups.Crystal.children[0].geometry = new T.CylinderGeometry(
  0.88,
  0.88,
  0.024,
  80,
);
groups.Crystal.children[0].rotation.x = Math.PI / 2;
groups.Crystal.children[0].position.z = 0.351;
// Back exhibition window and retaining screws.
ring(groups.Caseback, 0.7, 1.01, -0.25, 0.066, gold);
disc(groups.Caseback, 0.7, 0.018, -0.251, glass);
for (let i = 0; i < 8; i++) {
  let a = (i * Math.PI) / 4;
  disc(
    groups.Caseback,
    0.034,
    0.015,
    -0.289,
    silver,
    Math.sin(a) * 0.87,
    Math.cos(a) * 0.87,
  );
  box(
    groups.Caseback,
    Math.sin(a) * 0.87,
    Math.cos(a) * 0.87,
    -0.3,
    0.045,
    0.006,
    0.004,
    black,
    a,
  );
}
// Crown with actual machined knurls, axis X.
let crown = disc(groups.Crown, 0.13, 0.15, 0, gold);
crown.rotation.y = Math.PI / 2;
crown.position.set(1.14, 0, 0.02);
for (let i = 0; i < 36; i++) {
  let a = (i * Math.PI) / 18;
  let m = box(
    groups.Crown,
    1.14,
    Math.cos(a) * 0.13,
    0.02 + Math.sin(a) * 0.13,
    0.13,
    0.013,
    0.013,
    accent,
  );
  m.rotation.x = a;
}
let cap = disc(groups.Crown, 0.104, 0.012, 0, accent);
cap.rotation.y = Math.PI / 2;
cap.position.set(1.224, 0, 0.02);
// Curved, padded leather strap. Sculpted as a swept cross-section, not a flat rectangle.
for (const sign of [-1, 1]) {
  const positions = [],
    uv = [],
    indices = [];
  const rows = 44,
    cols = 12;
  for (let j = 0; j <= rows; j++) {
    let t = j / rows,
      y = sign * (1.13 + 1.43 * t),
      z = -0.03 - 0.95 * t * t,
      w = 0.55 - 0.11 * t;
    for (let i = 0; i <= cols; i++) {
      let u = i / cols,
        x = (u - 0.5) * 2 * w,
        top = 0.09 * Math.sin(Math.PI * u);
      positions.push(x, y, z + top);
      uv.push(u, t * 3);
    }
  }
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      let a = j * (cols + 1) + i,
        b = a + cols + 1;
      indices.push(a, b, a + 1, b, b + 1, a + 1);
    }
  let geo = new T.BufferGeometry();
  geo.setAttribute("position", new T.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new T.Float32BufferAttribute(uv, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  let m = mesh(groups.Strap, geo, leather);
  m.material.side = T.DoubleSide;
  for (let side of [-1, 1]) {
    let pts = [];
    for (let j = 0; j <= rows; j++) {
      let t = j / rows;
      pts.push(
        new T.Vector3(
          side * (0.51 - 0.11 * t),
          sign * (1.14 + 1.42 * t),
          0.005 - 0.95 * t * t,
        ),
      );
    }
    mesh(
      groups.Strap,
      new T.TubeGeometry(new T.CatmullRomCurve3(pts), 48, 0.009, 5, false),
      black,
    );
    for (let j = 0; j < 26; j++) {
      let t = j / 27 + 0.018;
      let m = box(
        groups.Strap,
        side * (0.47 - 0.11 * t),
        sign * (1.14 + 1.42 * t),
        0.035 - 0.95 * t * t,
        0.008,
        0.038,
        0.005,
        stitch,
      );
      m.rotation.x = sign * Math.atan(0.95 * t);
    }
  }
  for (let j = 0; j < 6; j++)
    disc(
      groups.Strap,
      0.019,
      0.006,
      -0.24 - 0.04 * j,
      black,
      0,
      sign * (1.87 + 0.105 * j),
    );
}
// Continuous leather return around the wrist: original curved rear strap and clasp.
{
  const positions = [],
    uv = [],
    indices = [],
    rows = 64,
    cols = 12;
  for (let j = 0; j <= rows; j++) {
    const a = (j / rows) * Math.PI,
      y = 2.56 * Math.cos(a),
      z = -0.98 - 1.4 * Math.sin(a);
    for (let i = 0; i <= cols; i++) {
      const u = i / cols;
      positions.push((u - 0.5) * 0.88, y, z - 0.065 * Math.sin(Math.PI * u));
      uv.push(u, (j / rows) * 5);
    }
  }
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++) {
      let a = j * (cols + 1) + i,
        b = a + cols + 1;
      indices.push(a, a + 1, b, b, a + 1, b + 1);
    }
  const geo = new T.BufferGeometry();
  geo.setAttribute("position", new T.Float32BufferAttribute(positions, 3));
  geo.setAttribute("uv", new T.Float32BufferAttribute(uv, 2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  mesh(groups.Strap, geo, leather);
  for (const side of [-1, 1])
    for (let i = 0; i < 65; i++) {
      const a = ((i + 0.4) / 66) * Math.PI;
      const m = box(
        groups.Strap,
        side * 0.395,
        2.56 * Math.cos(a),
        -0.987 - 1.4 * Math.sin(a),
        0.009,
        0.035,
        0.006,
        stitch,
      );
      m.rotation.x = Math.atan2(-1.4 * Math.cos(a), -2.56 * Math.sin(a));
    }
  const buckle = new T.Shape();
  buckle.moveTo(-0.48, -0.19);
  buckle.lineTo(0.48, -0.19);
  buckle.lineTo(0.48, 0.19);
  buckle.lineTo(-0.48, 0.19);
  buckle.closePath();
  const hole = new T.Path();
  hole.moveTo(-0.4, -0.12);
  hole.lineTo(-0.4, 0.12);
  hole.lineTo(0.4, 0.12);
  hole.lineTo(0.4, -0.12);
  hole.closePath();
  buckle.holes.push(hole);
  mesh(groups.Strap, extrusion(buckle, 0.035, 0.016), gold, 0, 0, -2.47);
  box(groups.Strap, 0, 0, -2.46, 0.024, 0.35, 0.025, accent);
}
// Open-work mechanical calibre: pierced plate, visible wheels, bridges, ruby bearings.
const mov = groups.Movement;
let plate = new T.Shape();
plate.absarc(0, 0, 0.795, 0, Math.PI * 2, false);
for (let [x, y, r] of [
  [-0.31, 0.23, 0.205],
  [0.27, 0.25, 0.24],
  [-0.2, -0.31, 0.19],
  [0.35, -0.27, 0.16],
]) {
  let h = new T.Path();
  h.absarc(x, y, r, 0, Math.PI * 2, true);
  plate.holes.push(h);
}
mesh(mov, extrusion(plate, 0.045, 0.006), brushed, 0, 0, -0.13);
ring(mov, 0.748, 0.79, -0.085, 0.044, accent);
function gear(name, x, y, r, z, teeth) {
  let g = new T.Group();
  g.name = name;
  g.position.set(x, y, z);
  mov.add(g);
  let shape = new T.Shape();
  for (let i = 0; i < teeth * 4; i++) {
    let a = (i / (teeth * 4)) * Math.PI * 2,
      rad = r * (i % 4 < 2 ? 1 : 0.9);
    if (!i) shape.moveTo(Math.cos(a) * rad, Math.sin(a) * rad);
    else shape.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
  }
  shape.closePath();
  let hole = new T.Path();
  hole.absarc(0, 0, r * 0.55, 0, Math.PI * 2, true);
  shape.holes.push(hole);
  mesh(g, extrusion(shape, 0.025, 0.0015), accent);
  for (let i = 0; i < 5; i++) {
    let a = (i * Math.PI * 2) / 5;
    box(
      g,
      Math.cos(a) * r * 0.32,
      Math.sin(a) * r * 0.32,
      0.013,
      r * 0.62,
      r * 0.085,
      0.028,
      accent,
      a,
    );
  }
  disc(g, r * 0.18, 0.045, 0.02, silver);
  disc(g, r * 0.065, 0.05, 0.025, jewel);
  return g;
}
gear("Barrel", -0.31, 0.23, 0.2, -0.055, 40);
gear("CenterWheel", 0.115, 0.16, 0.255, -0.032, 48);
gear("ThirdWheel", 0.4, -0.21, 0.145, -0.012, 32);
gear("EscapeWheel", 0.16, -0.4, 0.13, 0.025, 24);
gear("BalanceWheel", -0.31, -0.34, 0.23, 0.034, 48);
gear("RatchetWheel", 0.43, 0.43, 0.125, -0.08, 30);
for (let [x, y, w, h, a] of [
  [-0.28, 0.43, 0.6, 0.09, 0.22],
  [0.2, -0.02, 0.73, 0.095, -0.55],
  [-0.16, -0.33, 0.41, 0.06, 0.3],
]) {
  let m = mesh(
    mov,
    extrusion(roundedRect(w, h, 0.03), 0.035, 0.009),
    brushed,
    x,
    y,
    0.075,
  );
  m.rotation.z = a;
  for (let s of [-1, 1]) {
    let px = x + s * w * 0.4 * Math.cos(a),
      py = y + s * w * 0.4 * Math.sin(a);
    disc(mov, 0.026, 0.02, 0.132, silver, px, py);
    box(mov, px, py, 0.145, 0.031, 0.006, 0.003, black, a);
  }
}
for (let i = 0; i < 9; i++) {
  let a = (i * Math.PI * 2) / 9;
  disc(mov, 0.024, 0.016, 0.004, jewel, 0.67 * Math.cos(a), 0.67 * Math.sin(a));
  disc(mov, 0.01, 0.022, 0.008, silver, 0.67 * Math.cos(a), 0.67 * Math.sin(a));
}
let rotor = new T.Group();
rotor.name = "Rotor";
mov.add(rotor);
rotor.position.z = -0.193;
let rs = new T.Shape();
rs.absarc(0, 0, 0.71, 0, Math.PI, false);
rs.lineTo(-0.22, 0);
rs.absarc(0, 0, 0.22, Math.PI, 0, true);
rs.closePath();
mesh(rotor, extrusion(rs, 0.034, 0.01), accent);
box(rotor, 0, 0.1, 0.02, 0.13, 0.27, 0.027, brushed);
disc(rotor, 0.085, 0.07, 0.02, silver);
// Merge static children sharing a material. Articulated children keep their own pivots.
function consolidate(g) {
  for (const c of [...g.children]) if (c.isGroup) consolidate(c);
  const buckets = new Map();
  for (const c of [...g.children])
    if (c.isMesh) {
      c.updateMatrix();
      let geo = c.geometry.clone();
      geo.applyMatrix4(c.matrix);
      if (geo.index) geo = geo.toNonIndexed();
      const key = c.material.uuid;
      if (!buckets.has(key)) buckets.set(key, { mat: c.material, geos: [] });
      buckets.get(key).geos.push(geo);
      g.remove(c);
    }
  for (const { mat, geos } of buckets.values()) {
    const geo = mergeVertices(mergeGeometries(geos), 0.00001);
    geo.computeBoundingSphere();
    let m = mesh(g, geo, mat);
    m.name = `${g.name}_${mat.name}`;
  }
}
consolidate(root);
root.updateMatrixWorld(true);
// Node FileReader bridge required by Three's standard GLB exporter.
globalThis.FileReader = class {
  readAsArrayBuffer(b) {
    b.arrayBuffer().then((x) => {
      this.result = x;
      this.onloadend?.();
    });
  }
  readAsDataURL(b) {
    b.arrayBuffer().then((x) => {
      this.result = `data:${b.type};base64,${Buffer.from(x).toString("base64")}`;
      this.onloadend?.();
    });
  }
};
const glb = await new GLTFExporter().parseAsync(root, { binary: true });
await fs.writeFile("public/models/moradi-calibre-m.glb", Buffer.from(glb));
let meshes = 0,
  triangles = 0;
root.traverse((o) => {
  if (o.isMesh) {
    meshes++;
    triangles +=
      (o.geometry.index?.count ?? o.geometry.attributes.position.count) / 3;
  }
});
let report = {
  bytes: glb.byteLength,
  meshes,
  triangles,
  materials: Object.keys(mats),
  groups: Object.keys(groups),
  bounds: new T.Box3().setFromObject(root).getSize(new T.Vector3()).toArray(),
};
await fs.writeFile(
  "docs/3d/model-metrics.json",
  JSON.stringify(report, null, 2),
);
console.log(report);
