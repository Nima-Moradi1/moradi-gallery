# Camera ledger

Camera-versus-model contributions below are inferred from perspective and screen motion, not private values.

| ID   | Range     | Perspective / target                | Required implementation                                   |
| ---- | --------- | ----------------------------------- | --------------------------------------------------------- |
| C001 | 0–.185    | Full-product orbit, front/side/back | Camera position + WatchCenter target and watch quaternion |
| C002 | .185–.235 | Retreat and oblique exploded spread | Wider distance/FOV + assembly target                      |
| C003 | .235–.34  | Movement-only medium/macro          | MovementFocus, approach, overhead pitch                   |
| C004 | .34–.43   | Reassembly and beauty return        | Recede, target WatchCenter                                |
| C005 | .43–.58   | Dial approaches and travels right   | DialFocus with separate desktop/mobile FOV/distance       |
| C006 | .58–.65   | Low profile/crown                   | CrownFocus and low camera                                 |
| C007 | .65–.765  | Horizontal strap texture close-up   | StrapFocus, camera target and watch roll                  |
| C008 | .765–1    | Retreat and final three-quarter     | WatchCenter, framing restored                             |
