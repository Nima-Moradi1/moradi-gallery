"use client";
/* eslint-disable react-hooks/immutability -- Three.js and the GSAP controller are imperative external objects; frame data deliberately never enters React state. */
import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import {
  ACESFilmicToneMapping,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  DoubleSide,
  Euler,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Quaternion,
  RepeatWrapping,
  Scene,
  SRGBColorSpace,
  Vector3,
} from "three";
import {
  desktopKeyframes,
  mobileKeyframes,
} from "./narrative/referenceKeyframes";
import type { NarrativeState } from "./narrative/masterTimeline";
import { createAssemblyController } from "./assembly/assemblyConfig";
import { finishes } from "./materials/finishes";
function createDial() {
  const c = document.createElement("canvas");
  c.width = c.height = 1024;
  const x = c.getContext("2d")!;
  x.fillStyle = "#1b211e";
  x.fillRect(0, 0, 1024, 1024);
  x.translate(512, 512);
  for (let i = 0; i < 480; i++) {
    const a = (i / 480) * Math.PI * 2;
    x.beginPath();
    x.moveTo(Math.cos(a) * 12, Math.sin(a) * 12);
    x.lineTo(Math.cos(a) * 512, Math.sin(a) * 512);
    const tone = Math.round(19 + (0.5 + Math.cos(a * 2 + 0.3) * 0.5) * 24);
    x.strokeStyle = `rgb(${tone},${tone + 5},${tone + 1})`;
    x.lineWidth = 0.7;
    x.stroke();
  }
  x.textAlign = "center";
  x.fillStyle = "#d0bb8d";
  x.font = "38px Georgia";
  x.fillText("M O R A D I", 0, -155);
  x.font = "13px Arial";
  x.fillText("G A L L E R Y", 0, -123);
  x.font = "14px Arial";
  x.fillText("A U T O M A T I C", 0, 104);
  const texture = new CanvasTexture(c);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
function createLeather() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const x = c.getContext("2d")!;
  x.fillStyle = "#989898";
  x.fillRect(0, 0, 256, 256);
  let seed = 731;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  for (let i = 0; i < 15000; i++) {
    const v = Math.floor(80 + rand() * 100);
    x.fillStyle = `rgb(${v},${v},${v})`;
    x.fillRect(rand() * 256, rand() * 256, 1 + rand() * 2, 1);
  }
  const texture = new CanvasTexture(c);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(4, 6);
  return texture;
}
function Product({
  state,
  onReady,
  onProgress,
}: {
  state: NarrativeState;
  onReady: () => void;
  onProgress: (n: number) => void;
}) {
  const asset = useLoader(
    GLTFLoader,
    "/models/moradi-calibre-m.glb",
    undefined,
    (e) => {
      if (e.total) onProgress(Math.min(85, (e.loaded / e.total) * 85));
    },
  );
  const { gl, scene, camera, size, invalidate, setDpr } = useThree();
  const travel = useRef<Group>(null),
    rotation = useRef<Group>(null),
    interaction = useRef<Group>(null),
    ribbons = useRef<Group>(null);
  const data = useMemo(() => {
    const object = asset.scene.clone(true);
    const materials = new Map<string, MeshStandardMaterial>();
    object.traverse((o) => {
      if (o instanceof Mesh) {
        const original = o.material as MeshStandardMaterial;
        if (!materials.has(original.name))
          materials.set(original.name, original.clone());
        o.material = materials.get(original.name)!;
      }
    });
    const dialMap = createDial(),
      leatherMap = createLeather();
    const faceMaterial = new MeshStandardMaterial({
      map: dialMap,
      roughness: 0.4,
      metalness: 0.55,
      color: "#ffffff",
    });
    const face = new Mesh(new CircleGeometry(0.816, 96), faceMaterial);
    face.position.z = 0.228;
    object.getObjectByName("Dial")?.add(face);
    const leather = materials.get("StrapLeather");
    if (leather) {
      leather.bumpMap = leatherMap;
      leather.bumpScale = 0.009;
      leather.roughness = 0.78;
    }
    const brushed = materials.get("MetalBrushed");
    if (brushed) {
      brushed.color.set("#bfc5c5");
      brushed.roughness = 0.36;
      brushed.bumpMap = leatherMap;
      brushed.bumpScale = 0.001;
    }
    const assembly = createAssemblyController(object);
    const variants = finishes.slice(1).map((finish) => {
      const variant = object.clone(true);
      variant.getObjectByName("Movement")!.visible = false;
      variant.getObjectByName("Hands")!.visible = true;
      const copies = new Map<string, MeshStandardMaterial>();
      variant.traverse((node) => {
        if (node instanceof Mesh) {
          const source = node.material as MeshStandardMaterial;
          if (!copies.has(source.uuid)) {
            const copy = source.clone();
            if (source.name === "MetalCase" || source.name === "MetalAccent")
              copy.color.set(finish.case);
            if (source.name === "StrapLeather") copy.color.set(finish.strap);
            copies.set(source.uuid, copy);
          }
          node.material = copies.get(source.uuid)!;
        }
      });
      variant.visible = false;
      return { object: variant, materials: copies };
    });
    const gearNames = [
      "Barrel",
      "CenterWheel",
      "ThirdWheel",
      "EscapeWheel",
      "BalanceWheel",
      "RatchetWheel",
      "Rotor",
    ];
    return {
      object,
      variants,
      materials,
      dialMap,
      leatherMap,
      face,
      faceMaterial,
      assembly,
      gears: gearNames.map((n) => object.getObjectByName(n)!),
      second: object.getObjectByName("SecondHand")!,
      smallSecond: object.getObjectByName("SmallSecondHand"),
      vectors: [new Vector3(), new Vector3(), new Vector3()],
      q1: new Quaternion(),
      q2: new Quaternion(),
      euler: new Euler(),
      color: new Color(),
      finishColors: finishes.map((f) => ({
        case: new Color(f.case),
        dial: new Color(f.dial),
        strap: new Color(f.strap),
      })),
      bgA: new Color("#101410"),
      bgB: new Color("#e5e1d7"),
      bg: new Color(),
      fg: new Color(),
      warm: false,
      frames: 0,
      lastReport: 0,
      frameTimes: [] as number[],
      elapsed: 0,
      lastLight: -1,
      revealAt: -1,
      active: true,
    };
  }, [asset.scene]);
  useEffect(() => {
    setDpr(state.quality === "low" ? 1 : size.width < 1100 ? 1.25 : 1.5);
  }, [setDpr, size.width, state]);
  useEffect(() => {
    const studio = new Scene();
    studio.background = new Color("#393c37");
    const planes: [number[], number[], number][] = [
      [[5, 3, 4], [4, 9], 4],
      [[-5, 1, 3], [1.5, 10], 5],
      [[0, 7, 1], [9, 3], 5],
      [[0, -4, 3], [6, 1], 1.8],
      [[0, 1, 7], [8, 7], 2.0],
      [[0, 2, -6], [4, 5], 3],
    ];
    for (const [pos, scale, power] of planes) {
      const plane = new Mesh(
        new PlaneGeometry(scale[0], scale[1]),
        new MeshBasicMaterial({
          color: new Color("#fffdf6").multiplyScalar(power),
          side: DoubleSide,
        }),
      );
      plane.position.fromArray(pos);
      plane.lookAt(0, 0, 0);
      studio.add(plane);
    }
    const pmrem = new PMREMGenerator(gl);
    const env = pmrem.fromScene(studio, 0.05, 0.1, 100, {
      size: state.quality === "low" ? 128 : 256,
    });
    scene.environment = env.texture;
    scene.environmentIntensity = 1.05;
    let cancelled = false;
    gl.compileAsync(scene, camera)
      .then(() => {
        if (!cancelled) {
          data.warm = true;
          onProgress(95);
          invalidate();
        }
      })
      .catch(() => {
        if (!cancelled) data.warm = true;
      });
    return () => {
      cancelled = true;
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
      studio.traverse((o) => {
        if (o instanceof Mesh) {
          o.geometry.dispose();
          (o.material as MeshBasicMaterial).dispose();
        }
      });
    };
  }, [camera, data, gl, invalidate, onProgress, scene, state]);
  useEffect(() => {
    const stage = document.getElementById("watch-stage");
    const observer = new IntersectionObserver(([entry]) => {
      data.active = entry.isIntersecting;
      if (entry.isIntersecting) invalidate();
    });
    if (stage) observer.observe(stage);
    const wake = () => {
      if (!document.hidden) invalidate();
    };
    document.addEventListener("visibilitychange", wake);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", wake);
    };
  }, [data, invalidate]);
  useEffect(
    () => () => {
      data.materials.forEach((m) => m.dispose());
      data.variants.forEach((v) => v.materials.forEach((m) => m.dispose()));
      data.face.geometry.dispose();
      data.faceMaterial.dispose();
      data.dialMap.dispose();
      data.leatherMap.dispose();
    },
    [data],
  );
  useFrame((_, dt) => {
    if (!travel.current || !rotation.current || !interaction.current) return;
    data.elapsed += Math.min(dt, 0.1);
    const p = state.poseLock ?? state.progress;
    const mobile = size.width / size.height < 0.9 || size.width < 700;
    const frames = mobile ? mobileKeyframes : desktopKeyframes;
    let i = 0;
    while (i < frames.length - 2 && frames[i + 1].p <= p) i++;
    const a = frames[i],
      b = frames[i + 1],
      linear = Math.max(0, Math.min(1, (p - a.p) / (b.p - a.p))),
      t = linear * linear * (3 - 2 * linear);
    const mix = (x: number, y: number) => x + (y - x) * t;
    const [v1, v2, target] = data.vectors;
    travel.current.position
      .fromArray(a.position)
      .lerp(v1.fromArray(b.position), t);
    data.q1.setFromEuler(data.euler.set(...a.rotation));
    data.q2.setFromEuler(data.euler.set(...b.rotation));
    rotation.current.quaternion.slerpQuaternions(data.q1, data.q2, t);
    interaction.current.rotation.set(
      state.explore
        ? state.dragY
        : Math.sin(data.elapsed * 0.32) * 0.009 + state.pointerY * 0.022,
      state.explore
        ? state.dragX
        : Math.sin(data.elapsed * 0.24) * 0.012 + state.pointerX * 0.025,
      0,
    );
    camera.position.fromArray(a.camera).lerp(v2.fromArray(b.camera), t);
    target.fromArray(a.target).lerp(v1.fromArray(b.target), t);
    camera.lookAt(target);
    if (data.revealAt >= 0 && state.poseLock === null)
      camera.position.z +=
        Math.max(0, 1 - (data.elapsed - data.revealAt) / 1.5) * 2;
    const cam = camera as PerspectiveCamera;
    const fov = mix(a.fov, b.fov);
    if (Math.abs(cam.fov - fov) > 0.005) {
      cam.fov = fov;
      cam.updateProjectionMatrix();
    }
    const explode = mix(a.explode, b.explode),
      focus = mix(a.focus, b.focus),
      light = mix(a.light, b.light);
    data.assembly.apply(explode, focus);
    const sweep = data.elapsed * 0.104719755;
    data.second.rotation.z = 2.4 - sweep;
    if (data.smallSecond) data.smallSecond.rotation.z = 2.4 - sweep;
    for (let n = 0; n < data.gears.length; n++)
      data.gears[n].rotation.z =
        n === 4
          ? Math.sin(data.elapsed * 14) * 0.3
          : (data.elapsed * (n % 2 ? -0.09 : 0.08)) / (1 + n * 0.4);
    const finale = Math.max(0, Math.min(1, (p - 0.979) / 0.018));
    for (let n = 0; n < data.variants.length; n++) {
      const variant = data.variants[n].object;
      const editorial = Math.max(
        0,
        Math.min(1, (p - 0.77) / 0.008, (0.819 - p) / 0.008),
      );
      variant.visible = finale > 0.001 || (editorial > 0 && n < 2);
      variant.rotation.set(0.12, 0.45 - n * 0.22, -0.17 + n * 0.08);
      const x = mobile
        ? n === 0
          ? 1.25
          : n === 1
            ? -1.25
            : 1.25
        : [-1.6, 1.7, 5][n];
      const y = mobile ? (n === 0 ? -0.1 : -3.5) : -1.2;
      variant.position.set(x, y - (1 - finale) * 3, 0);
      variant.scale.setScalar(finale * (mobile ? 0.65 : 0.78));
      if (finale === 0 && editorial > 0 && n < 2) {
        variant.position.set(
          mobile ? (n ? 1.6 : -0.9) : n ? 5 : -3.5,
          (n ? 3 : -2) + (p - 0.795) * 70,
          -1,
        );
        variant.scale.setScalar(editorial * (mobile ? 0.4 : 0.7));
      }
    }
    if (finale > 0) {
      travel.current.position.x +=
        ((mobile ? -1.25 : -5) - travel.current.position.x) * finale;
      travel.current.position.y +=
        ((mobile ? -0.1 : -1.2) - travel.current.position.y) * finale;
      travel.current.scale.setScalar(1 - finale * (mobile ? 0.35 : 0.22));
    } else travel.current.scale.setScalar(1);
    const materialIndex = finale > 0.95 ? 0 : state.finish;
    const f = finishes[materialIndex],
      colors = data.finishColors[materialIndex],
      damp = 1 - Math.exp(-dt * 5.5);
    for (const [name, mat] of data.materials) {
      if (name === "MetalCase" || name === "MetalAccent") {
        mat.color.lerp(colors.case, damp);
        mat.roughness += (f.roughness - mat.roughness) * damp;
      } else if (name === "StrapLeather") mat.color.lerp(colors.strap, damp);
    }
    scene.environmentRotation.set(0.05, Math.sin(p * Math.PI * 3) * 0.55, 0);
    scene.environmentIntensity = 1.05 + focus * 0.3 - light * 0.12;
    gl.toneMappingExposure = 1.15 - light * 0.1;
    const stage = document.getElementById("watch-stage");
    if (stage && Math.abs(light - data.lastLight) > 0.002) {
      data.bg.copy(data.bgA).lerp(data.bgB, light);
      stage.style.backgroundColor = data.bg.getStyle();
      stage.style.color = light > 0.6 ? "#20261f" : "#f5f1e8";
      data.lastLight = light;
    }
    const ring = document.getElementById("watch-orbit");
    if (ring) {
      ring.style.opacity = String(mix(a.ring, b.ring) * 0.45);
      ring.style.transform = `translate(-50%,-50%) rotate(${p * 190}deg)`;
    }
    if (ribbons.current) {
      ribbons.current.visible = focus > 0.02;
      ribbons.current.scale.setScalar(mobile ? 0.7 : 1);
      ribbons.current.rotation.z = data.elapsed * 0.017;
      ribbons.current.position.z = -4;
    }
    if (data.warm && ++data.frames >= 3 && !state.ready) {
      state.ready = true;
      data.revealAt = data.elapsed;
      onProgress(100);
      onReady();
    }
    data.frameTimes.push(dt);
    if (data.frameTimes.length > 180) data.frameTimes.shift();
    if (data.elapsed - data.lastReport > 0.5) {
      data.lastReport = data.elapsed;
      const avg =
        data.frameTimes.reduce((s, v) => s + v, 0) / data.frameTimes.length;
      const fps = Math.round(1 / avg);
      const debug = document.getElementById("debug-3d-data");
      if (debug) {
        debug.textContent = JSON.stringify(
          {
            progress: +p.toFixed(4),
            animation: a.id,
            phase: a.phase,
            watch: travel.current.position.toArray().map((x) => +x.toFixed(3)),
            quaternion: rotation.current.quaternion
              .toArray()
              .map((x) => +x.toFixed(3)),
            camera: camera.position.toArray().map((x) => +x.toFixed(3)),
            target: target.toArray().map((x) => +x.toFixed(3)),
            fov: +fov.toFixed(2),
            explode: +explode.toFixed(4),
            focus: +focus.toFixed(3),
            finish: f.id,
            quality: state.quality,
            fps,
            drawCalls: gl.info.render.calls,
            triangles: gl.info.render.triangles,
            restError:
              explode === 0 && focus === 0 ? data.assembly.restError() : null,
          },
          null,
          2,
        );
      }
      const label = document.querySelector<HTMLElement>("[data-live-phase]");
      if (label) label.textContent = a.phase;
      if (
        data.frameTimes.length === 180 &&
        fps < 35 &&
        state.quality !== "low"
      ) {
        state.quality = "low";
        setDpr(1);
      }
    }
    // Demand rendering stops when the document is hidden or the story has left view.
    if (!document.hidden && data.active) invalidate();
  });
  const lines = useMemo(() => {
    const positions = [];
    for (let band = 0; band < 9; band++)
      for (let j = 0; j < 260; j++) {
        const u = (j / 259) * Math.PI * 3;
        const r = 4.0 + Math.sin(u * 2 + band * 0.2) * 1.25;
        positions.push(
          Math.sin(u) * r,
          Math.cos(u * 1.3) * r,
          Math.sin(u * 2) * 1.1 + band * 0.09,
        );
      }
    const geo = new BufferGeometry();
    geo.setAttribute(
      "position",
      new BufferAttribute(new Float32Array(positions), 3),
    );
    return geo;
  }, []);
  useEffect(() => () => lines.dispose(), [lines]);
  return (
    <>
      <ambientLight intensity={0.12} />
      <directionalLight position={[4, 6, 7]} intensity={2.6} color="#fff2d5" />
      <directionalLight position={[-5, 1, 3]} intensity={1.2} color="#d6e3ed" />
      <group ref={travel} name="WatchTravelRig">
        <group ref={rotation} name="WatchRotationRig">
          <group ref={interaction} name="InteractionOffsetRig">
            <primitive object={data.object} />
          </group>
        </group>
      </group>
      {data.variants.map((v, i) => (
        <primitive key={i} object={v.object} />
      ))}
      <group ref={ribbons} visible={false}>
        <points geometry={lines}>
          <pointsMaterial
            color="#bda87a"
            size={0.018}
            transparent
            opacity={0.25}
            depthWrite={false}
          />
        </points>
      </group>
    </>
  );
}
export default function WatchScene(props: {
  state: NarrativeState;
  onReady: () => void;
  onProgress: (n: number) => void;
  onError: () => void;
}) {
  return (
    <Canvas
      frameloop="demand"
      dpr={
        props.state.quality === "high"
          ? 1.5
          : props.state.quality === "medium"
            ? 1.25
            : 1
      }
      camera={{ position: [0, 0, 20], fov: 32, near: 0.1, far: 100 }}
      gl={{
        alpha: true,
        antialias: props.state.quality !== "low",
        powerPreference: "high-performance",
        toneMapping: ACESFilmicToneMapping,
      }}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener("webglcontextlost", props.onError);
        gl.setClearColor(0x000000, 0);
      }}
    >
      <Product
        state={props.state}
        onReady={props.onReady}
        onProgress={props.onProgress}
      />
    </Canvas>
  );
}
