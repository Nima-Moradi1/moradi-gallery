# MORADI GALLERY — ANIMATION-FIRST WEBGL PARITY OVERRIDE
## FINAL Codex/Astra instruction for matching `https://thewatch.60fps.fr/`

> **THIS FILE IS AN OVERRIDE.**
>
> The existing Moradi Gallery repository is already partially implemented.
> **DO NOT START OVER.**
>
> However, the project's highest-priority deliverable is now the real-time 3D/WebGL watch choreography.
> The previous implementation failed because it treated WebGL and animation as optional polish.
>
> **That must not happen again.**

---

# 0. HIGHEST-PRIORITY DIRECTIVE

The MAIN POINT of this website is:

```text
THE WATCH
+
THE REAL-TIME WEBGL RENDERING
+
THE SCROLL-LINKED 3D MOVEMENT
+
THE CAMERA CHOREOGRAPHY
+
THE HORIZONTAL AND VERTICAL TRAVEL
+
THE EXPLODED MECHANICAL ASSEMBLY
+
THE REASSEMBLY
+
THE MATERIAL / FINISH CHANGES
+
THE WAY THE WATCH REACTS TO EVERY CONTENT BEAT
+
THE RESPONSIVE RECOMPOSITION OF ALL OF THE ABOVE
```

Everything else is secondary.

The page is **NOT considered implemented** because:

- the typography exists;
- sections exist;
- the navbar exists;
- the translations exist;
- the layout resembles a luxury website;
- one 3D watch rotates in the hero;
- a few GSAP fades are present.

The project is only considered successful when the 3D watch experience has been analyzed and reproduced thoroughly.

---

# 1. SOURCE OF TRUTH

Interaction reference:

```text
https://thewatch.60fps.fr/
```

Brand to build:

```text
MORADI GALLERY
گالری مرادی
```

The reference is for:

- motion grammar;
- camera grammar;
- WebGL continuity;
- scene choreography;
- responsive behavior;
- product/story integration.

Do NOT copy:

- FS 60P branding;
- FS 60P logos;
- source model;
- source code;
- proprietary textures;
- exact copy;
- proprietary visual assets.

---

# 2. VERIFIED CREATOR DESCRIPTION — THESE BEHAVIORS ARE MANDATORY

60fps publicly describes the reference watch as:

- rendered entirely in real-time WebGL;
- the protagonist of the page;
- drifting across the layout while scrolling;
- zooming into the dial;
- exploding to reveal its movement;
- snapping back together;
- shifting colors/finishes on demand;
- reacting to every beat of editorial content;
- implemented as an integrated product experience rather than a separate 3D viewer;
- designed to run smoothly from mobile to desktop.

Therefore these are **NON-OPTIONAL capabilities** in Moradi's implementation.

If even one is missing, the core implementation is incomplete.

Reference sources to record in project docs:

```text
https://thewatch.60fps.fr/
https://www.linkedin.com/company/60fps
https://www.linkedin.com/posts/60fps_3d-webgl-immersive-activity-7476243100307472384-71Sm
https://www.linkedin.com/posts/rbechakjian_at-60fps-we-have-always-believed-that-the-activity-7450078048302874624-hDQE
https://mesh3d.gallery/website/fs-60p-the-timeless-automatic-watch-by-60fps
```

Do NOT pretend private implementation details are known if they are not verified.

---

# 3. DO NOT START FROM SCRATCH

Before changing anything:

```text
1. Read IMPLEMENTATION_STATUS.md.
2. Read AGENTS.md.
3. Inspect git status.
4. Inspect recent commits.
5. Run the existing site.
6. Record the current homepage.
7. Inspect the existing WebGL architecture.
8. Inspect the current GSAP/scroll system.
9. Inspect the current 3D model hierarchy.
10. Create a safe checkpoint.
```

Forbidden:

```bash
npx create-next-app
pnpm create next-app
rm -rf src
rm -rf app
```

Preserve working:

- Next.js architecture;
- TypeScript;
- Tailwind;
- design system;
- translations;
- `/fa` and `/en`;
- RTL/LTR;
- Vazirmatn;
- Moradi branding;
- loader foundation;
- SEO;
- accessibility;
- reusable primitives;
- performance utilities.

Refactor only what is necessary to achieve reference-grade 3D behavior.

---

# 4. THIS PROMPT BLOCKS ALL SECONDARY WORK

Until the **3D PARITY GATE** defined later is passed:

DO NOT spend significant time on:

- FAQ polish;
- journal/blog;
- footer polish;
- SEO refinements;
- generic cards;
- extra collection pages;
- marketing copy polishing;
- admin/CMS;
- checkout;
- unrelated UI microanimations.

You may keep existing implementations, but do not prioritize them.

The work order is:

```text
REFERENCE OBSERVATION
        ↓
ANIMATION INVENTORY
        ↓
3D ASSET / MODEL READINESS
        ↓
WEBGL SCENE
        ↓
CAMERA CHOREOGRAPHY
        ↓
SCROLL CHOREOGRAPHY
        ↓
EXPLODED ASSEMBLY
        ↓
MATERIAL / FINISH SYSTEM
        ↓
RESPONSIVE MOTION
        ↓
REFERENCE COMPARISON
        ↓
PERFORMANCE
        ↓
ONLY THEN: secondary UI polish
```

---

# 5. MANDATORY LIVE REFERENCE OBSERVATION

Do NOT implement from memory.

Do NOT implement from screenshots alone.

Do NOT say:

```text
"I understand the style"
```

and begin coding.

You MUST inspect the **complete live behavior** of:

```text
https://thewatch.60fps.fr/
```

from page load to the absolute bottom.

Use browser automation/browser inspection available in Codex.

---

# 6. RECORD THE ENTIRE REFERENCE EXPERIENCE

Create:

```text
docs/reference/the-watch/
```

Required artifacts:

```text
REFERENCE_FULL_DESKTOP.webm
REFERENCE_FULL_MOBILE.webm

REFERENCE_MOTION_AUDIT.md
ANIMATION_LEDGER.md
CAMERA_LEDGER.md
MODEL_BEHAVIOR_LEDGER.md
RESPONSIVE_MOTION_LEDGER.md
KEYFRAME_MATRIX.md
REFERENCE_SECTION_MAP.md
```

If video capture is unavailable, use a dense screenshot sequence.

But a full scroll recording is strongly preferred because motion timing matters.

---

# 7. REQUIRED REFERENCE VIEWPORTS

Audit at minimum:

```text
1920 × 1080
1440 × 900
1366 × 768
1024 × 1366
430 × 932
390 × 844
360 × 800
```

At minimum, perform the deepest motion analysis on:

```text
1440 × 900
390 × 844
```

Do NOT infer mobile from desktop.

You must actually inspect mobile.

---

# 8. SLOW-SCROLL INSPECTION

For each key viewport:

1. load the site fresh;
2. wait for the loading sequence;
3. record the loader/reveal behavior;
4. scroll slowly through the entire site;
5. scroll back upward through the entire site;
6. repeat sections with complex watch motion;
7. test wheel/trackpad-like incremental scroll;
8. test larger scroll jumps;
9. inspect resize/orientation behavior where possible.

The reference must be understood as a continuous animation system.

---

# 9. CAPTURE DENSE REFERENCE KEYFRAMES

At minimum capture:

```text
0%
2%
4%
6%
8%
10%
12.5%
15%
17.5%
20%
22.5%
25%
27.5%
30%
32.5%
35%
37.5%
40%
42.5%
45%
47.5%
50%
52.5%
55%
57.5%
60%
62.5%
65%
67.5%
70%
72.5%
75%
77.5%
80%
82.5%
85%
87.5%
90%
92.5%
95%
97.5%
100%
```

That is only a baseline.

Whenever a meaningful animation begins/peaks/ends between these percentages:

**ADD MORE KEYFRAMES.**

Do not force the site into an arbitrary 2.5% grid.

---

# 10. EVERY OBSERVED ANIMATION GETS AN ID

Create:

```text
docs/reference/the-watch/ANIMATION_LEDGER.md
```

Every motion must receive an ID:

```text
A001
A002
A003
...
```

Example:

```md
## A017 — watch travels from center-right to left

Reference section:
Reference scroll range:
Desktop observed:
Mobile observed:

### Start state
- watch screen x:
- watch screen y:
- projected width:
- angle:
- camera:
- text relationship:

### Mid state
...

### End state
...

### Motion components
- [ ] watch world X
- [ ] watch world Y
- [ ] watch world Z
- [ ] watch rotation
- [ ] camera position
- [ ] camera target
- [ ] FOV
- [ ] material
- [ ] light
- [ ] exploded state
- [ ] DOM text
- [ ] background

Implementation:
Files:

Evidence:
- reference screenshot:
- local screenshot:

Status:
- [ ] observed
- [ ] implemented desktop
- [ ] implemented mobile
- [ ] reverse-scroll tested
- [ ] visually matched
```

**NO OBSERVED ANIMATION MAY EXIST WITHOUT A LEDGER ENTRY.**

This is the central anti-omission mechanism.

---

# 11. ZERO-MISSING-ANIMATION RULE

Before declaring reference analysis complete:

Ask:

```text
Did any visible object:
- translate?
- rotate?
- scale?
- change material?
- change opacity?
- split?
- reassemble?
- move in depth?
- become masked?
- overlap another layer differently?
- trigger a camera reframe?
- trigger a light change?
- trigger a background change?
- react to pointer/touch?
```

If yes:

record it.

Do not only record "major" animations.

Small connective transitions are part of why the site feels continuous.

---

# 12. AUDIT THE LOADING SEQUENCE TOO

The reference audit begins before the first hero frame.

Record:

- initial background;
- loader;
- percentage/progress if present;
- logo/text;
- first visible model frame;
- watch entrance;
- first camera pose;
- transition from loading into interactive mode.

Moradi's loader may keep its own branding, but its readiness behavior must be equally intentional.

---

# 13. AUDIT THE WATCH'S SCREEN-SPACE POSITION

For every keyframe record:

```ts
type ScreenPose = {
  centerX: number;   // 0..1 viewport
  centerY: number;   // 0..1 viewport
  width: number;     // viewport ratio
  height: number;    // viewport ratio
};
```

Example:

```text
centerX = 0.72
centerY = 0.48
width   = 0.34
```

This turns "looks similar" into a measurable target.

---

# 14. AUDIT THE WATCH ORIENTATION

For each keyframe record qualitative orientation:

```text
front
front-left
front-right
left-profile
right-profile
top-three-quarter
bottom-three-quarter
dial-macro
movement-macro
case-back
exploded-front
exploded-angle
```

Later calibrate actual quaternions.

---

# 15. AUDIT CAMERA VS MODEL MOVEMENT

For every major transition answer:

```text
Does the watch itself move?
Does the camera move?
Does the camera target move?
Does FOV change?
Do both camera and watch move?
```

Do NOT reproduce every reference pose by only changing:

```ts
model.position
model.rotation
model.scale
```

if the reference perspective clearly changes.

---

# 16. CAMERA LEDGER

Create:

```text
CAMERA_LEDGER.md
```

For each camera beat:

```md
## C004 — dial macro

Reference range:
Observed perspective:
Subject projected size:
Perspective compression:
Camera motion direction:
Likely target:
FOV behavior:
Entry:
Peak:
Exit:
Mobile difference:
Implementation:
Status:
```

Again, exact private coordinates are unknown.

Your implementation values are derived through visual calibration.

---

# 17. WATCH MOTION LEDGER

Create:

```text
MODEL_BEHAVIOR_LEDGER.md
```

Track:

- X movement;
- Y movement;
- Z movement;
- quaternion;
- global scale only when genuinely needed;
- idle;
- interaction offset;
- exploded progress;
- finish;
- internal movement state.

---

# 18. RESPONSIVE MOTION LEDGER

Create:

```text
RESPONSIVE_MOTION_LEDGER.md
```

For every major animation ID:

```md
| Animation | 1440x900 | 390x844 | Same? | Mobile adaptation |
|---|---|---|---|---|
```

The answer will frequently be:

```text
NO
```

That is expected.

Mobile is not a scaled desktop.

---

# 19. REFERENCE SECTION MAP

Identify the real scroll structure.

For every section record:

```text
start scroll %
end scroll %
viewport height / estimated scroll length
pinned?
fixed?
normal flow?
canvas visible?
watch active?
watch screen position?
copy position?
background?
```

Do not invent section timing until this is complete.

---

# 20. DO NOT CODE FINAL MOTION BEFORE THE AUDIT FILES EXIST

You may inspect the current code.

You may fix blockers.

But do not author the final timeline until:

```text
ANIMATION_LEDGER.md exists
CAMERA_LEDGER.md exists
RESPONSIVE_MOTION_LEDGER.md exists
KEYFRAME_MATRIX.md exists
```

This prevents incomplete "interpretation" of the reference.

---

# 21. THE WATCH MUST BE PERSISTENT

The reference principle is:

```text
the watch becomes the interface
```

For Moradi, prefer one persistent real-time WebGL product scene across the core narrative.

Preferred architecture:

```text
Fixed / persistent WebGL Canvas
           +
Scrollable semantic DOM
           +
One coordinated narrative timeline
```

Do NOT treat each section as an unrelated 3D demo.

---

# 22. ONE WATCH, MANY STATES

Prefer:

```text
ONE watch asset
+
multiple positions
+
multiple camera compositions
+
exploded transforms
+
material variants
+
lighting states
```

instead of:

```text
separate watch per section
separate Canvas per section
separate videos
```

---

# 23. REQUIRED TRANSFORM ARCHITECTURE

Separate animation ownership.

Concept:

```text
WatchWorldRoot
└── WatchTravelRig
    └── WatchRotationRig
        └── InteractionOffsetRig
            └── WatchAssembly
                └── GLTF Watch
```

Camera:

```text
CameraRig
├── Camera
└── CameraTarget
```

Lighting:

```text
LightingRig
```

Materials:

```text
MaterialController
```

---

# 24. OWNERSHIP RULE

Only one system owns one transform.

Wrong:

```text
GSAP writes rotation.y
useFrame writes rotation.y
pointer handler writes rotation.y
React effect writes rotation.y
```

Correct:

```text
WatchRotationRig = narrative
InteractionOffsetRig = pointer
Assembly child nodes = explosion
```

---

# 25. HORIZONTAL MOTION IS MANDATORY

The reference explicitly describes the watch as drifting through the layout.

Moradi must include the observed horizontal travel.

This must be real 3D composition.

Do not fake it with:

```css
transform: translateX(...)
```

on a screenshot/canvas wrapper.

Use actual:

- watch world X;
- camera X when required;
- camera target X;
- Z/depth;
- product rotation;
- light continuity.

The watch should remain a physical object in space.

---

# 26. HORIZONTAL MOVEMENT CHECKLIST

For each horizontal movement verify:

- [ ] beginning screen X matches reference;
- [ ] midpoint screen X matches;
- [ ] endpoint screen X matches;
- [ ] orientation changes correctly;
- [ ] projected size matches;
- [ ] perspective matches;
- [ ] watch does not clip incorrectly;
- [ ] text/watch relationship matches;
- [ ] mobile adaptation exists;
- [ ] reverse scroll works.

---

# 27. VERTICAL MOTION IS MANDATORY

The watch must move vertically in response to the editorial narrative where observed.

Do NOT fake vertical progression by:

- scrolling the Canvas itself;
- putting separate model renders in later sections.

Use real scene continuity.

Combine as observed:

```text
world Y
world Z
camera Y
target Y
FOV
rotation
```

---

# 28. VERTICAL MOVEMENT CHECKLIST

For each vertical movement verify:

- start Y;
- mid Y;
- end Y;
- camera contribution;
- watch contribution;
- depth;
- angle;
- text overlap;
- mobile adaptation;
- reverse behavior.

---

# 29. THE CAMERA IS NOT OPTIONAL POLISH

The reference relies on authored product cinematography.

You must implement actual camera choreography.

Required categories to identify and reproduce if observed:

```text
full watch
three-quarter
side/profile
dial macro
movement macro
exploded overview
reassembled product
finish/product beauty pose
final composition
```

---

# 30. NO ORBITCONTROLS AS A SUBSTITUTE FOR CAMERA DIRECTION

Do not implement:

```text
OrbitControls + user can rotate
```

and consider the camera work done.

The scroll story requires authored camera poses.

Orbit/drag interaction can be additive only where reference inspection confirms it or where Moradi intentionally allows exploration without disrupting narrative choreography.

---

# 31. CAMERA TARGETS

Create model anchors:

```text
WatchCenterAnchor
DialFocusAnchor
MovementFocusAnchor
CrownFocusAnchor
CaseFocusAnchor
```

Animate camera position and target.

Do not only call:

```ts
camera.lookAt(0, 0, 0)
```

for the entire page.

---

# 32. DIAL MACRO IS MANDATORY

The creator explicitly describes the watch zooming into the dial.

This is not optional.

Implementation must visibly transition from product view to macro dial framing.

Use:

- camera movement;
- target movement;
- optional FOV adjustment;
- lighting refinement.

Do NOT use only:

```ts
watch.scale.setScalar(...)
```

to fake a camera push-in.

---

# 33. DIAL MACRO ACCEPTANCE

At peak macro:

- dial is the visual subject;
- composition matches the reference behavior;
- watch does not appear merely enlarged;
- parallax/perspective feels correct;
- reflective material remains stable;
- text placement works;
- mobile has a separately tuned crop.

---

# 34. EXPLODED MECHANICAL VIEW IS MANDATORY

This is one of the reference's signature sequences.

The watch must:

```text
assembled
↓
begin separation
↓
mechanical layers become visible
↓
reach readable exploded state
↓
camera reveals movement
↓
remain coherent
↓
reassemble
```

A simple watch rotation does NOT count.

A fade between two images does NOT count.

Random mesh scattering does NOT count.

---

# 35. MODEL HIERARCHY AUDIT

Before implementing explosion:

inspect the current GLB.

Create:

```text
docs/3d/WATCH_NODE_INVENTORY.md
```

Record every relevant node.

Example categories:

```text
Crystal
Bezel
Hands
Dial
Markers
Case
CaseBack
Crown
Movement
Rotor
Bridge
GearGroups
Bracelet/Strap
```

If the current asset cannot support the effect:

**DO NOT REBUILD THE SITE.**

Replace/re-author only the 3D asset.

---

# 36. RECORD REST TRANSFORMS

For every movable component:

```ts
type RestTransform = {
  position: THREE.Vector3;
  quaternion: THREE.Quaternion;
  scale: THREE.Vector3;
};
```

Capture at initialization.

Never hardcode reassembly by "approximately returning" values.

---

# 37. EXPLOSION CONFIG

Create typed configuration.

Example:

```ts
type ExplodePartConfig = {
  node: string;
  start: number;
  end: number;
  translation: [number, number, number];
  rotation?: [number, number, number];
};
```

Actual values must be authored based on reference and model construction.

---

# 38. EXPLODE PROGRESS

Use a reversible normalized parameter:

```ts
explodeProgress: 0..1
```

Each component remaps it to its own subrange.

Example:

```ts
partProgress = remapClamped(
  explodeProgress,
  part.start,
  part.end,
  0,
  1
);
```

This is required for smooth reverse scrolling.

---

# 39. ASSEMBLY LOGIC, NOT PARTICLE LOGIC

Parts must separate according to mechanical/visual layering.

For example:

```text
crystal
bezel
hands
dial
movement layers
case back
```

Crown can separate on its side axis where appropriate.

But the actual reference and actual watch asset determine exact direction.

Do NOT arbitrarily fan parts in all directions.

---

# 40. PEAK EXPLODED STATE

At the maximum exploded point:

- key parts must be readable;
- the movement must be clearly visible;
- parts must retain relationship to the assembled watch;
- there must be enough spacing to understand construction;
- there must not be so much spacing that it looks like debris.

---

# 41. MOVEMENT CAMERA

During exploded view, the camera must also be analyzed.

Determine:

- whether it approaches;
- whether it shifts laterally;
- whether the target moves into the movement;
- whether FOV changes;
- whether the watch itself rotates.

Reproduce those behaviors.

---

# 42. REASSEMBLY IS MANDATORY

The creator explicitly describes the watch "snapping back together."

Implement a deliberate, precise reassembly.

It should feel:

- faster/more decisive than a lazy drift;
- exact;
- premium;
- mechanically coherent.

No bounce.

No cartoon elasticity.

---

# 43. REASSEMBLY MUST BE EXACT

At fully assembled state:

```text
position == rest position
quaternion == rest quaternion
scale == rest scale
```

within floating-point tolerance.

Add a development assertion if useful.

---

# 44. REVERSE SCROLL MUST NEVER BREAK ASSEMBLY

Test:

```text
scroll into explosion
reverse halfway
forward again
reverse at peak
forward quickly
reverse quickly
```

No:

- part popping;
- transform drift;
- wrong layer positions;
- stuck exploded state.

---

# 45. MATERIAL / FINISH SWITCHING IS MANDATORY

The creator explicitly describes finish/color changes.

Implement real material/finish states.

Prefer:

```text
same geometry
+
multiple material states
```

Do not load four duplicate full GLBs if geometry is the same.

---

# 46. FINISH TRANSITION AUDIT

Inspect the reference:

- how finish selection appears;
- whether transition is instant or interpolated;
- whether camera stays fixed;
- whether reflections change;
- whether UI responds;
- whether material changes happen during scroll, interaction, or both.

Implement what is observed.

---

# 47. MATERIAL QUALITY

Metal must look premium because of:

- geometry;
- normals;
- roughness;
- metalness;
- environment;
- lights;
- color management.

Not because of huge bloom.

---

# 48. LIGHTING IS PART OF ANIMATION

Record visible lighting changes in the animation ledger.

If the product moves into a different composition and highlights change intentionally:

implement a controlled lighting transition.

Possible controlled variables:

- key light position;
- key intensity;
- fill intensity;
- rim position;
- environment intensity;
- exposure.

Do not rebuild lighting every section.

Use a continuous LightingRig.

---

# 49. BACKGROUND TRANSITIONS ARE PART OF WEBGL COMPOSITION

When reference background changes:

record:

- timing;
- color;
- direction;
- interaction with model highlights;
- text color;
- Canvas transparency/clear color.

Moradi can translate colors into its own brand while preserving the rhythm.

---

# 50. TYPOGRAPHY / WATCH OVERLAP IS ANIMATION

If large text moves behind or around the watch:

that is not "just layout."

Record it as animation behavior.

Track:

- z-layer;
- mask;
- clipping;
- text translation;
- watch overlap;
- entry;
- exit.

---

# 51. THE WATCH REACTS TO CONTENT BEATS

For every editorial section, answer:

```text
What does the watch do because this section exists?
```

Bad:

```text
Section appears while watch stays centered.
```

Good:

```text
Section appears.
Watch drifts to create negative space.
Camera rotates toward dial.
Light catches bezel.
Copy enters into newly created space.
```

The object must feel connected to the story.

---

# 52. ONE MASTER CHOREOGRAPHY

Do not create dozens of independent triggers fighting over scene state.

Preferred:

```text
one master normalized 3D narrative
+
section labels
+
small DOM reveal timelines
```

Possible GSAP labels:

```text
intro
travelA
dialMacro
travelB
prepareExplosion
explode
movementFocus
reassemble
finishA
finishB
finalTravel
finalPose
```

Actual labels must follow the observed site.

---

# 53. DO NOT FORCE THE REFERENCE INTO THESE LABELS

The actual live audit wins.

If the reference has:

```text
18 distinct beats
```

implement 18 beats.

If it has:

```text
27
```

implement 27.

Do not reduce them just to make code simple.

---

# 54. KEYFRAME MATRIX

Create:

```text
KEYFRAME_MATRIX.md
```

and a typed implementation equivalent:

```text
referenceKeyframes.ts
```

Possible structure:

```ts
type NarrativeKeyframe = {
  id: string;
  progress: number;

  watchPosition: [number, number, number];
  watchQuaternion: [number, number, number, number];
  watchScale: number;

  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  fov: number;

  explode: number;
  finish: string;

  lightState?: string;
  backgroundState?: string;
};
```

---

# 55. DESKTOP AND MOBILE KEYFRAMES MUST BE SEPARATE

At minimum:

```ts
desktopKeyframes
mobileKeyframes
```

Optional:

```ts
tabletKeyframes
```

Do NOT implement:

```ts
mobile = desktop * 0.65
```

---

# 56. RESPONSIVE ANIMATION IS A FIRST-CLASS DELIVERABLE

Responsive means:

- the watch remains intentionally framed;
- 3D travel is redesigned for the available aspect ratio;
- macro shots remain readable;
- explosion remains legible;
- text/watch overlap remains deliberate;
- no horizontal clipping;
- no product hidden by mobile browser UI;
- performance quality adjusts.

---

# 57. MOBILE MUST BE INSPECTED DIRECTLY

No final responsive implementation until the actual reference has been viewed at mobile width.

For every animation ID:

mark:

```text
same choreography
modified choreography
different choreography
removed on mobile
```

with evidence.

---

# 58. MOBILE HORIZONTAL MOVEMENT

Typically should use less extreme lateral distance if reference does.

But do not assume.

Measure the reference.

Ensure:

- no unintended crop;
- text has room;
- watch still feels dimensional.

---

# 59. MOBILE VERTICAL MOVEMENT

The portrait canvas changes visual balance.

Tune:

- world Y;
- target Y;
- camera distance;
- FOV;
- text spacing.

Do not only alter CSS sections.

---

# 60. MOBILE EXPLOSION

At peak explosion:

- important parts remain inside viewport;
- movement remains legible;
- spacing is not crushed;
- labels do not collide;
- frame rate remains acceptable.

If reference uses a different explosion layout on mobile:

reproduce that concept.

---

# 61. MOBILE CAMERA

Do not reuse desktop camera values.

Create mobile:

- position;
- target;
- FOV;
- near/far if required.

Tune per keyframe.

---

# 62. RESPONSIVE TYPOGRAPHIC LAYERING

RTL and LTR require separate visual checks.

For `/en` and `/fa`:

ensure the watch and text have intentional negative space.

Do not blindly mirror 3D X values for Persian.

---

# 63. SCROLL TIMING IS PART OF FIDELITY

For each animation beat record:

```text
start progress
peak progress
end progress
scroll distance
hold duration
```

Match the reference's rhythm.

A correct final pose with incorrect timing is still incorrect.

---

# 64. PINNING / FIXED CANVAS

Inspect exactly how the reference behaves.

Determine:

- fixed Canvas?
- sticky Canvas?
- pinned sections?
- long scroll container?
- multiple pinned beats?

Implement the observed model, not a generic creative-site pattern.

---

# 65. SCROLL REVERSIBILITY

Every scroll-controlled effect must work both directions.

This includes:

- DOM;
- camera;
- watch travel;
- rotations;
- explosion;
- reassembly;
- finish transitions;
- lights;
- backgrounds.

---

# 66. SCROLL SCRUB QUALITY

The watch should not mechanically stick to every wheel tick.

If GSAP ScrollTrigger is already used:

- preserve it;
- tune `scrub`;
- use damping only as needed.

Do not introduce visible lag.

---

# 67. SCROLL VELOCITY TEST

Test:

```text
slow scroll
normal scroll
fast scroll
sudden reverse
trackpad inertia
```

No timeline corruption.

---

# 68. POINTER / DRAG / HOVER — OBSERVE FIRST

Do NOT assume the reference uses OrbitControls.

Inspect:

- pointer parallax;
- drag;
- hover;
- finish selector behavior;
- hotspots;
- cursor;
- touch gestures.

Every observed interaction receives an animation ledger ID too.

---

# 69. IF POINTER MOTION EXISTS

Keep it additive:

```text
NarrativeRig
  ↓
InteractionOffsetRig
```

Pointer motion must never overwrite narrative transforms.

---

# 70. IDLE MOTION

If reference has an idle state:

record:

- amplitude;
- axis;
- speed;
- when it stops;
- whether scroll cancels it.

Implement subtly.

---

# 71. WATCH HAND MOTION

If reference watch hands animate:

inspect and reproduce conceptually.

Do not invent inaccurate movement for a real third-party watch.

If using original Moradi concept watch:

a smooth automatic-style second hand is acceptable.

---

# 72. FULL WEBGL SCENE MUST BE REAL

Do NOT replace core animations with:

- PNG sequences;
- 2D image swaps;
- CSS watch images;
- pre-rendered fake explosion;

unless serving as low-device fallback.

Primary capable-device experience must be real-time WebGL.

---

# 73. 3D ASSET QUALITY IS A BLOCKING DEPENDENCY

If the current GLB cannot support:

- dial macro;
- internal movement reveal;
- component explosion;
- premium reflections;

say so clearly.

Then re-author/replace only the watch model.

Do not pretend a poor asset can be fixed through GSAP.

---

# 74. ORIGINAL / LICENSED ASSET

Do not use the reference FS 60P model without permission.

Use:

- original Moradi digital twin;
- licensed asset;
- client-provided authorized model.

The behavior is the reference, not the proprietary model.

---

# 75. MODEL OPTIMIZATION

The reference creator publicly states their full model with four finishes is ~9 MB.

That demonstrates the expected discipline.

Do not use this as an exact hard cap, but use it as a quality/performance benchmark.

Document:

```text
GLB transfer size
texture transfer size
environment size
decoded texture dimensions
geometry count
draw calls
```

---

# 76. PERFORMANCE TARGET IS PART OF FIDELITY

The reference creator specifically emphasizes smooth mobile-to-desktop performance.

Moradi must prioritize smoothness.

Target:

```text
modern desktop: ~60fps during normal narrative
modern mobile: stable, preferably 45–60fps
```

Do not claim targets as measured results.

Measure.

---

# 77. PROFILE THE WORST SCENE

The worst scene will likely be:

```text
peak exploded state
+
maximum visible geometry
+
complex material reflections
```

Profile there.

Not only at the simple hero pose.

---

# 78. QUALITY TIERS

Retain/create:

```ts
type QualityTier =
  | "high"
  | "medium"
  | "low"
  | "fallback";
```

Quality changes may affect:

- DPR;
- environment resolution;
- glass;
- shadows;
- postprocessing;
- texture size;
- micro geometry;
- antialiasing.

They must NOT remove the core narrative unless necessary.

---

# 79. DPR

Do not use device DPR blindly.

Suggested maximums:

```text
high desktop: 1.5
mid desktop: 1.25
mobile: 1.0–1.25
```

Tune through profiling.

---

# 80. POSTPROCESSING

The luxury feel should come from materials/lighting.

Avoid relying on:

- giant bloom;
- heavy DOF;
- chromatic aberration;
- full-screen blur;
- grain.

Only keep effects that genuinely improve the reference match.

---

# 81. LOADING / SHADER WARMUP

Loader must wait for:

- base GLB;
- first finish;
- critical environment;
- critical texture decode;
- scene ready;
- stable first rendered frame.

Where practical, compile/warm important materials while loader is visible.

Prevent major first-use shader hitches.

---

# 82. DO NOT WAIT FOR EVERYTHING

Do not block hero reveal on:

- FAQ;
- all secondary images;
- every finish if not initially required;
- footer;
- blog data.

---

# 83. DYNAMIC IMPORT

Keep WebGL as a client-only heavy chunk.

The semantic HTML shell must not wait for Three.js bundle completion.

---

# 84. SERVER-FIRST ARCHITECTURE

Keep:

```text
Server Components for page/content
+
WebGL client island
+
small interactive UI islands
```

Do not make the whole application `'use client'`.

---

# 85. FRAME-BY-FRAME REACT STATE IS FORBIDDEN

Do not put these in React state per frame:

- camera position;
- scroll progress;
- watch rotation;
- pointer;
- explosion;
- light position.

Use:

- refs;
- imperative scene state;
- GSAP;
- R3F `useFrame` where needed.

---

# 86. DEBUG 3D MODE IS REQUIRED

Implement development-only:

```text
?debug3d=1
```

Display:

```text
scroll progress
active animation ID
active phase
watch XYZ
watch quaternion / Euler
camera XYZ
camera target XYZ
FOV
explode progress
finish
quality tier
FPS
draw calls
triangles if available
```

This is not optional.

It exists to tune the reference accurately.

---

# 87. POSE LOCK IS REQUIRED

Implement development-only:

```text
?pose=0.425
```

or equivalent.

It should freeze/scrub the 3D narrative to a normalized reference progress.

This makes screenshot comparison repeatable.

---

# 88. OPTIONAL ANIMATION-ID LOCK

Even better:

```text
?animation=A017&localProgress=0.5
```

to inspect the midpoint of an individual beat.

If easy to implement, do it.

---

# 89. LOCAL SCREENSHOTS AT THE SAME KEYFRAMES

For each critical reference capture:

generate local screenshot at:

- same viewport;
- same normalized progress;
- same phase.

Save:

```text
docs/reference/the-watch/comparison/
```

Example:

```text
A017-reference-start.png
A017-local-start.png
A017-reference-mid.png
A017-local-mid.png
A017-reference-end.png
A017-local-end.png
```

---

# 90. VISUAL TOLERANCE TARGETS

For important watch poses, aim approximately for:

```text
screen center position: within ~3% viewport
projected size: within ~5%
phase timing: within ~5% of local phase range
orientation: visually equivalent
camera perspective: visually equivalent
```

These are practical QA tolerances, not rigid mathematical laws.

If artistic Moradi branding intentionally changes a composition, document it.

---

# 91. CAMERA CALIBRATION ORDER

If a pose does not match:

adjust in this order:

```text
1. FOV
2. camera distance
3. camera target
4. camera lateral/vertical position
5. watch world position
6. watch orientation
7. watch scale only last
```

This avoids using model scale to fake perspective.

---

# 92. MOTION CALIBRATION ORDER

If movement feels wrong:

```text
1. start/end progress
2. path
3. camera contribution
4. watch contribution
5. orientation
6. easing
7. scrub damping
```

---

# 93. EXPLOSION CALIBRATION ORDER

If explosion feels wrong:

```text
1. model hierarchy
2. local axes
3. order
4. spacing
5. camera
6. timing
7. lighting
8. ease
```

Do NOT solve it with decorative effects.

---

# 94. MATERIAL CALIBRATION ORDER

If metal looks wrong:

```text
1. normals
2. texture color spaces
3. environment
4. roughness
5. metalness
6. lighting
7. exposure
8. tone mapping
```

---

# 95. CONTENT MUST WRAP AROUND THE WATCH

The creator explicitly describes editorial content wrapping around the product.

That relationship must be reproduced.

The watch should create layout space.

Examples:

```text
watch goes right → copy occupies left
watch goes left → copy occupies right
watch centers → type may pass behind/around it
watch macro → copy becomes technical/minimal
```

Follow the observed reference rather than blindly alternating.

---

# 96. NO GENERIC TWO-COLUMN REPETITION

Do not reduce the experience to:

```text
text left / watch right
text right / watch left
repeat
```

Observe actual composition changes.

---

# 97. BACKGROUND / TYPOGRAPHY / 3D MUST MOVE AS ONE SYSTEM

Each phase can control:

```text
watch
camera
lights
background
large type
small labels
section copy
finish selector
```

But ownership must remain clean.

---

# 98. MORADI BRANDING REMAINS ORIGINAL

Keep:

```text
MORADI GALLERY
گالری مرادی
```

Keep modern champagne gold as restrained brand accent.

The reference's animation system is translated into Moradi identity.

---

# 99. ENGLISH + PERSIAN MUST BOTH PASS MOTION QA

Test full WebGL sequence on:

```text
/en
/fa
```

Do not only test English.

Persian text direction can materially affect the empty space around the watch.

---

# 100. PERSIAN TEXT ANIMATION

Do not split connected Persian glyphs arbitrarily.

Prefer:

- line reveal;
- word reveal;
- masks;
- grouped text.

Keep shaping valid.

---

# 101. RTL DOES NOT MEAN MIRROR EVERYTHING

The 3D product may keep the same camera angle in both locales if it looks better.

Create locale composition overrides only where text/watch collision requires them.

---

# 102. REDUCED MOTION

Implement a graceful alternative.

But reduced-motion implementation does NOT excuse incomplete standard animation.

Standard mode must first reach parity.

---

# 103. ACCESSIBILITY

Critical semantic information remains in DOM.

The WebGL watch can be visually central without being the only source of content.

---

# 104. FULL ANIMATION CHECKLIST — MUST BE FILLED FROM OBSERVATION

Codex must fill this checklist using the live reference.

Do not delete items.

Mark `N/A - not observed` only after inspection.

```md
## Loading
- [ ] loader appearance
- [ ] loader progress
- [ ] initial model reveal
- [ ] initial camera transition

## Hero
- [ ] watch initial pose
- [ ] idle motion
- [ ] hero typography motion
- [ ] scroll indicator behavior
- [ ] initial depth move
- [ ] initial rotation

## 3D travel
- [ ] horizontal move #1
- [ ] horizontal move #2
- [ ] horizontal move #3
- [ ] vertical move #1
- [ ] vertical move #2
- [ ] vertical move #3
- [ ] diagonal/depth move(s)
- [ ] scale/framing changes

## Camera
- [ ] camera move #1
- [ ] camera move #2
- [ ] camera move #3
- [ ] target shift(s)
- [ ] FOV shift(s)
- [ ] macro dial
- [ ] macro movement
- [ ] profile/three-quarter pose(s)
- [ ] final beauty pose

## Watch rotation
- [ ] X rotation beats
- [ ] Y rotation beats
- [ ] Z rotation beats
- [ ] quaternion interpolation
- [ ] idle/additive rotation

## Mechanical assembly
- [ ] pre-explosion pose
- [ ] first component separation
- [ ] staged separation
- [ ] peak explosion
- [ ] internal movement focus
- [ ] movement microanimation
- [ ] reassembly start
- [ ] snap reassembly
- [ ] exact final rest pose

## Materials
- [ ] finish selector
- [ ] finish 1
- [ ] finish 2
- [ ] finish 3
- [ ] finish 4 if observed
- [ ] transition behavior
- [ ] reflection/material response

## Lighting
- [ ] hero light state
- [ ] macro light state
- [ ] exploded light state
- [ ] finish light state
- [ ] final light state

## DOM relationship
- [ ] text behind watch
- [ ] text beside watch
- [ ] watch creates negative space
- [ ] mask/clip interactions
- [ ] annotation/spec behavior
- [ ] section transition choreography

## Interaction
- [ ] pointer parallax if observed
- [ ] drag/orbit if observed
- [ ] touch interaction if observed
- [ ] hover states
- [ ] finish selection
- [ ] hotspots if observed

## Responsive
- [ ] desktop complete
- [ ] tablet complete
- [ ] 430 mobile complete
- [ ] 390 mobile complete
- [ ] 360 mobile complete
- [ ] orientation/resize recovery
```

Add rows for any behavior not listed.

---

# 105. 3D PARITY GATE — HARD STOP

**Codex is NOT ALLOWED to call the core implementation complete until all conditions below pass.**

## Gate A — observation

```text
[ ] full desktop reference recorded
[ ] full mobile reference recorded
[ ] animation ledger complete
[ ] camera ledger complete
[ ] responsive ledger complete
[ ] keyframe matrix complete
```

## Gate B — scene

```text
[ ] persistent WebGL watch exists
[ ] premium materials exist
[ ] stable lighting exists
[ ] model hierarchy supports assembly
```

## Gate C — movement

```text
[ ] observed horizontal motions implemented
[ ] observed vertical motions implemented
[ ] observed depth motions implemented
[ ] observed rotations implemented
```

## Gate D — camera

```text
[ ] hero camera matched
[ ] dial macro implemented
[ ] movement camera implemented
[ ] other observed camera beats implemented
```

## Gate E — assembly

```text
[ ] exploded view implemented
[ ] staged separation implemented
[ ] movement readable
[ ] reassembly implemented
[ ] reverse scroll implemented
[ ] no drift
```

## Gate F — finishes

```text
[ ] finish variants implemented
[ ] transitions implemented
[ ] UI/scroll behavior matched
```

## Gate G — responsive

```text
[ ] desktop timeline tuned
[ ] mobile timeline tuned independently
[ ] Persian tested
[ ] English tested
```

## Gate H — fidelity

```text
[ ] reference/local start frames compared
[ ] mid frames compared
[ ] end frames compared
[ ] major mismatches fixed
[ ] animation ledger has no unimplemented observed rows
```

## Gate I — performance

```text
[ ] peak explosion profiled
[ ] desktop performance measured
[ ] mobile performance measured
[ ] quality tiers verified
[ ] no major scroll hitch
```

Until all gates are passed:

```text
CORE 3D IMPLEMENTATION STATUS = INCOMPLETE
```

---

# 106. NO "GOOD ENOUGH" COMPLETION LANGUAGE

Do not report:

```text
"3D is mostly done"
"basic animation is implemented"
"hero has Three.js"
"WebGL works"
```

as success.

Report by ledger:

```text
Observed animations: 31
Implemented desktop: 31/31
Implemented mobile: 31/31
Reverse tested: 31/31
Visually matched: 29/31
Remaining: A018, A027
```

This is the required status format.

---

# 107. IMPLEMENTATION_STATUS.md MUST TRACK NUMBERS

Add:

```md
## WebGL parity scoreboard

Reference animations observed:
Implemented desktop:
Implemented mobile:
Reverse-scroll verified:
Visually matched:
Blocked by asset limitations:
Remaining:

3D parity gate:
- [ ] PASS
```

The final checkbox cannot be manually checked without evidence.

---

# 108. CURRENT FOCUS MUST REMAIN WEBGL UNTIL GATE PASSES

While gate is incomplete:

```md
## Current focus

The Watch WebGL parity
```

Do not switch current focus to footer/FAQ/etc. unless a user explicitly asks.

---

# 109. REQUIRED DEVELOPMENT FILES

Adapt current architecture rather than duplicating, but responsibilities should exist.

Example:

```text
src/features/experience3d/
  MoradiWatchExperience.tsx
  WatchScene.tsx
  WatchAsset.tsx

  rigs/
    CameraRig.tsx
    WatchTravelRig.tsx
    WatchRotationRig.tsx
    InteractionOffsetRig.tsx
    LightingRig.tsx

  assembly/
    WatchAssembly.tsx
    assemblyConfig.ts
    restTransforms.ts

  materials/
    MaterialController.ts
    finishes.ts

  narrative/
    masterTimeline.ts
    desktopKeyframes.ts
    mobileKeyframes.ts
    phases.ts

  debug/
    Debug3DPanel.tsx
    PoseController.tsx
```

Do not create empty abstraction files just to match this tree.

---

# 110. GSAP / THREE RESPONSIBILITY

If GSAP already exists and works:

keep it.

Recommended ownership:

```text
GSAP ScrollTrigger:
  narrative scroll timing
  DOM scroll transitions
  target refs/progress

R3F / Three:
  render loop
  matrices
  scene
  materials
  model

Motion:
  isolated non-scroll React UI
```

---

# 111. QUATERNIONS

Use quaternion interpolation for complex product pose transitions.

Avoid large Euler interpolation that causes awkward rotation paths.

---

# 112. PATHS

For longer watch/camera travel:

use appropriate interpolation.

Could be:

- explicit keyframes;
- CatmullRom;
- GSAP spline-like interpolation;
- quaternion + Vector3 interpolation.

Do not use complexity for its own sake.

---

# 113. KEEP MOTION DATA CENTRALIZED

Do not scatter values like:

```text
x: 1.23
rotationY: 1.7
cameraZ: 3.81
```

through 12 components.

Use typed keyframe/config data.

---

# 114. REFERENCE MATCHING LOOP

For every critical animation:

```text
OBSERVE
↓
CAPTURE
↓
MEASURE
↓
IMPLEMENT
↓
LOCK LOCAL POSE
↓
CAPTURE LOCAL
↓
COMPARE
↓
FIX
↓
REPEAT
```

Do not implement the entire timeline first and compare only at the end.

---

# 115. IMPLEMENT ONE BEAT AT A TIME

Recommended:

```text
A001 match
A002 match
A003 match
...
```

Only then proceed.

This avoids accumulating 20 wrong camera assumptions.

---

# 116. DESKTOP FIRST, MOBILE IMMEDIATELY AFTER EACH CLUSTER

Do not finish all desktop animation before looking at mobile for the first time.

For each major cluster:

```text
hero
travel
macro
explosion
finish
finale
```

implement:

```text
desktop
then mobile
then continue
```

---

# 117. PERFORMANCE CHECK AFTER EACH COMPLEX CLUSTER

Profile after:

- hero complete;
- dial macro;
- peak explosion;
- material system.

Do not wait until final.

---

# 118. RESPONSIVE BREAKPOINTS ARE NOT ENOUGH

Animation can depend on:

- aspect ratio;
- coarse pointer;
- viewport height;
- performance tier.

Do not use only Tailwind CSS breakpoints to decide 3D choreography.

---

# 119. NO CANVAS RESIZE JANK

On resize:

- update camera aspect;
- update renderer;
- recalc reference composition;
- refresh timeline measurements;
- preserve scroll state if possible.

---

# 120. WEBGL CONTEXT / ERROR FALLBACK

If WebGL fails:

show premium fallback.

But never use fallback as an excuse to skip the WebGL implementation on capable devices.

---

# 121. THE FINAL EXPERIENCE MUST FEEL LIKE THIS

Not:

```text
website
+
cool spinning watch
```

But:

```text
THE WATCH IS THE PAGE'S VISUAL NAVIGATOR.

Scroll moves the story.
The story moves the watch.
The watch moves the camera.
The camera reveals the product.
The product opens to reveal engineering.
The engineering closes back into luxury.
```

---

# 122. FINAL FULL-PAGE RECORDING IS REQUIRED

Before declaring completion:

record the local Moradi site from:

```text
top → bottom
bottom → top
```

at:

```text
1440×900
390×844
```

Compare visually to reference recordings.

---

# 123. FINAL REPORT FORMAT

Final report must include:

```md
# WebGL parity result

Reference:
https://thewatch.60fps.fr/

Observed animation count:
Implemented count:
Desktop parity:
Mobile parity:
Reverse parity:

## Major matched behaviors
- ...

## Intentional Moradi differences
- ...

## Remaining mismatches
NONE
```

If mismatches remain:

do not write `NONE`.

---

# 124. FINAL RULE: NO UNIMPLEMENTED LEDGER ITEMS

Before final handoff run a literal audit:

```text
Search ANIMATION_LEDGER.md for unchecked implementation boxes.
```

If any observed animation is not implemented:

continue working.

If intentionally excluded:

document:
- why;
- effect on fidelity;
- user approval/blocker.

---

# 125. FINAL RULE: DO NOT LET TEXT WORK DISTRACT FROM THE CORE

If time/tokens are limited:

priority is:

```text
1. 3D watch asset quality
2. WebGL rendering
3. camera
4. horizontal/vertical scroll movement
5. explosion/reassembly
6. responsive choreography
7. finish changes
8. lighting/material quality
9. animation fidelity
10. everything else
```

---

# 126. FINAL RULE: DO NOT STOP AT A PROTOTYPE

A watch that:

```text
loads
rotates
moves left
moves right
```

is a prototype.

The target includes:

- complete story-linked movement;
- macro cinematography;
- internal mechanical reveal;
- staged exploded assembly;
- reversible reassembly;
- material variants;
- responsive choreography;
- polished light/material response;
- measured performance.

---

# 127. FINAL RULE: WEBGL IS THE ACCEPTANCE CRITERION

The project is not accepted until:

> A viewer can scroll through Moradi Gallery and immediately recognize the same class of sophisticated product choreography that makes `thewatch.60fps.fr` special.

Brand identity can differ.

Copy can differ.

Colors can differ.

But the **quality and completeness of the real-time product choreography may not be missing.**

---

# 128. START NOW — EXACT EXECUTION ORDER

Do this now:

```text
1. Read existing IMPLEMENTATION_STATUS.md.
2. Read AGENTS.md.
3. Run current Moradi.
4. Record current Moradi.
5. Checkpoint repository.
6. Open thewatch.60fps.fr.
7. Record FULL desktop reference.
8. Record FULL mobile reference.
9. Create ANIMATION_LEDGER.md.
10. Give every observed animation an A### ID.
11. Create CAMERA_LEDGER.md.
12. Create RESPONSIVE_MOTION_LEDGER.md.
13. Create KEYFRAME_MATRIX.md.
14. Inspect current GLB hierarchy.
15. Create WATCH_NODE_INVENTORY.md.
16. Decide whether current model supports the reference-level animation.
17. Fix/re-author only the asset if required.
18. Refactor scene into clean rigs.
19. Implement A001.
20. Visually compare.
21. Fix A001.
22. Implement A002.
23. Continue one beat at a time.
24. Implement dial macro.
25. Implement complete exploded assembly.
26. Implement movement camera.
27. Implement exact reversible reassembly.
28. Implement finish states.
29. Implement every remaining observed beat.
30. Tune desktop.
31. Tune mobile independently.
32. Test EN.
33. Test FA.
34. Profile peak explosion.
35. Optimize.
36. Record final full-scroll desktop.
37. Record final full-scroll mobile.
38. Audit ledger for missing rows.
39. Pass the 3D PARITY GATE.
40. Only then resume secondary website polish.
```

---

# 129. SESSION CONTINUITY

Before stopping any Codex session update:

```text
IMPLEMENTATION_STATUS.md
```

with:

```md
## WebGL parity scoreboard

Observed:
Desktop implemented:
Mobile implemented:
Visually matched:
Remaining animation IDs:

## Last matched
A0XX

## Current target
A0YY

## Exact reference evidence
...

## Exact local files
...

## Resume here
Open:
Run:
Reference timestamp/progress:
Local pose:
Next exact correction:
Do NOT redo:
```

---

# 130. FINAL DIRECTIVE TO CODEX

**Do not optimize for completing the checklist quickly.**

Optimize for reproducing the complete WebGL behavior.

You are expected to spend the majority of implementation effort on:

- observing the reference;
- measuring motion;
- building the 3D asset hierarchy;
- tuning watch transforms;
- tuning camera transforms;
- tuning scroll timing;
- tuning exploded assembly;
- tuning material changes;
- tuning mobile composition;
- tuning performance.

If you reach the end of a work block and the navbar is beautiful but the watch does not behave like the reference, the work block was prioritized incorrectly.

If the watch animation is excellent but the footer still needs polish, the project is correctly prioritized.

**The 3D/WebGL experience is the product.**
