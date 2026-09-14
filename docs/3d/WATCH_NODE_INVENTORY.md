# Original asset inventory

The prior project had no 3D model. scripts/build-watch.mjs authors public/models/moradi-calibre-m.glb. No FS60P geometry, textures or code were used. The model is an original fictional dress watch, not confirmed inventory. Face +Z, XY dial, dimensions in model-metrics.json.

Top-level groups: Case, Bezel, Dial, Hands, Crystal, Movement, Caseback, Crown, Strap. Hands contains HourHand, MinuteHand, SecondHand. Movement contains Barrel, CenterWheel, ThirdWheel, EscapeWheel, BalanceWheel, RatchetWheel and Rotor. Shared static geometry is merged per material; animated pivots remain separate.

The calibre is a visual mechanism concept, not a manufacturable movement claim. All parts have independently capturable rest transforms.
