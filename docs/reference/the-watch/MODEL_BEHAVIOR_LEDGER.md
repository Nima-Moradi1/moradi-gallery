# Model behavior

Persistent original model required. Narrative rig owns world travel; rotation rig owns quaternion; interaction child is additive. Assembly controller owns only part transforms. Captured rest transforms must be restored exactly when explode=0. Hand/gear animation lives beneath part groups. No accumulated delta transforms. Staged separation and reverse reassembly are absolute functions of normalized progress.
