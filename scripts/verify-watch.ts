import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { createAssemblyController } from "../src/features/experience3d/assembly/assemblyConfig.ts";
import {
  desktopKeyframes,
  mobileKeyframes,
} from "../src/features/experience3d/narrative/referenceKeyframes.ts";
const bytes = await fs.readFile("public/models/moradi-calibre-m.glb");
const gltf = await new GLTFLoader().parseAsync(
  bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  "",
);
const assembly = createAssemblyController(gltf.scene);
const snapshot = () =>
  assembly.parts.map((p) => ({
    name: p.object.name,
    p: p.object.position.toArray(),
    q: p.object.quaternion.toArray(),
    s: p.object.scale.toArray(),
  }));
const rest = snapshot();
assembly.apply(1, 0);
const peak = snapshot();
assert.notDeepEqual(peak, rest, "Explosion must separate actual geometry");
for (let i = 0; i < 200; i++) {
  assembly.apply(((i * 73) % 201) / 200, (i % 3) / 2);
  assembly.apply(0.54, 0);
  const forward = snapshot();
  assembly.apply(1, 0);
  assembly.apply(0.54, 0);
  assert.deepEqual(
    snapshot(),
    forward,
    "Same progress must produce same transforms after a reverse",
  );
  assembly.apply(0, 0);
  assert.deepEqual(
    snapshot(),
    rest,
    "Reassembly must restore exact positions, quaternions and scales",
  );
  assert.equal(assembly.restError(), 0);
}
for (const frames of [desktopKeyframes, mobileKeyframes]) {
  assert.equal(frames[0].p, 0);
  assert.equal(frames.at(-1)!.p, 1);
  for (let i = 1; i < frames.length; i++) {
    assert.ok(
      frames[i].p > frames[i - 1].p,
      "Keyframes must be strictly ordered",
    );
    assert.ok(frames[i].fov >= 20 && frames[i].fov <= 50);
  }
}
assert.notDeepEqual(
  desktopKeyframes.map((f) => f.camera),
  mobileKeyframes.map((f) => f.camera),
  "Mobile must have independently authored camera poses",
);
console.log(
  "PASS: 200 interrupted/reverse assembly cycles, exact rest transforms, live geometry separation, monotonic desktop/mobile keyframes and independent cameras.",
);
