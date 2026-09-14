import { Object3D, Quaternion, Vector3 } from "three";
export const assemblyConfig = [
  { name: "Crystal", start: 0, end: 0.46, translation: [0, 0, 3.5] },
  { name: "Bezel", start: 0.05, end: 0.55, translation: [0, 0, 2.65] },
  { name: "Hands", start: 0.13, end: 0.65, translation: [0, 0, 1.95] },
  { name: "Dial", start: 0.2, end: 0.75, translation: [0, 0, 1.3] },
  { name: "Movement", start: 0.3, end: 0.85, translation: [0, 0, 0] },
  { name: "Caseback", start: 0.15, end: 0.8, translation: [0, 0, -2.1] },
  { name: "Crown", start: 0.1, end: 0.65, translation: [1.1, 0, 0] },
  { name: "Case", start: 0.25, end: 1, translation: [0, 0, -1.05] },
  { name: "Strap", start: 0.3, end: 1, translation: [0, 0, -1.05] },
] as const;
export function createAssemblyController(root: Object3D) {
  const parts = assemblyConfig.map((config) => {
    const object = root.getObjectByName(config.name);
    if (!object) throw new Error(`Missing watch part ${config.name}`);
    return {
      object,
      config,
      position: object.position.clone(),
      quaternion: object.quaternion.clone(),
      scale: object.scale.clone(),
    };
  });
  const offset = new Vector3();
  return {
    apply(explode: number, focus: number) {
      for (const part of parts) {
        const t = Math.max(
          0,
          Math.min(
            1,
            (explode - part.config.start) /
              (part.config.end - part.config.start),
          ),
        );
        const e = t * t * (3 - 2 * t);
        offset.fromArray(part.config.translation);
        part.object.position.copy(part.position).addScaledVector(offset, e);
        part.object.quaternion.copy(part.quaternion);
        part.object.scale.copy(part.scale);
        if (part.config.name !== "Movement") {
          part.object.position.addScaledVector(offset, focus * 4);
          part.object.visible = focus < 0.998;
        } else {
          part.object.visible = true;
        }
      }
    },
    restError() {
      let max = 0;
      for (const p of parts)
        max = Math.max(
          max,
          p.object.position.distanceTo(p.position),
          1 - Math.abs(p.object.quaternion.dot(p.quaternion)),
          p.object.scale.distanceTo(p.scale),
        );
      return max;
    },
    parts,
  };
}
export type RestTransform = {
  position: Vector3;
  quaternion: Quaternion;
  scale: Vector3;
};
