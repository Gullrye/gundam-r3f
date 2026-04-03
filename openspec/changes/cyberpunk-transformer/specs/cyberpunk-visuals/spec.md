## ADDED Requirements

### Requirement: Cyberpunk material system
The system SHALL use MeshStandardMaterial with metalness 0.9 and roughness 0.3 as the base material for all body parts. The color palette MUST use: deep blue-black (#1a1a2e) for body, neon cyan (#00fff0) for primary glow, neon magenta (#ff00ff) for accents, amber (#ffaa00) for engine/eyes, chrome (#e0e0e0) for highlight parts.

#### Scenario: Body material
- **WHEN** any car body part is rendered
- **THEN** it uses a metallic material with metalness >= 0.8 and roughness <= 0.4

#### Scenario: Color consistency
- **WHEN** the transformer is in either mode
- **THEN** the same color palette is applied — neon cyan for primary emissive elements, magenta for accents, amber for eyes/engine

### Requirement: Selective Bloom post-processing
The system SHALL apply bloom post-processing only to objects designated as emissive (neon strips, headlights, eye glow). Non-emissive body parts MUST NOT be affected by bloom.

#### Scenario: Neon elements glow
- **WHEN** neon strip meshes are visible
- **THEN** they have a bloom glow effect that bleeds light into surrounding area

#### Scenario: Body does not bloom
- **WHEN** metallic body parts are rendered
- **THEN** they remain sharp and crisp without bloom bleed

### Requirement: Independent neon effects layer
The system SHALL maintain neon effect meshes as a separate group, independent from the structural car parts. Neon effects SHALL be hidden in car mode (underglow only visible) and fade in during transformation to become joint energy rings in robot mode.

#### Scenario: Car mode neon
- **WHEN** the transformer is in car mode
- **THEN** only the underglow neon strip is visible at the bottom

#### Scenario: Robot mode neon
- **WHEN** the transformer is in robot mode
- **THEN** neon energy rings are visible at joints (shoulders, elbows, knees, waist)

#### Scenario: Neon transition
- **WHEN** transformation is at 50% progress
- **THEN** underglow is fading out and joint neon rings are fading in

### Requirement: Headlight intensity difference between modes
The system SHALL render headlights at dim realistic brightness in car mode and at high emissive intensity (as glowing eyes) in robot mode. The intensity transition MUST be animated during transformation.

#### Scenario: Car mode headlights
- **WHEN** in car mode
- **THEN** headlights emit moderate light (realistic headlight brightness)

#### Scenario: Robot mode eyes
- **WHEN** in robot mode
- **THEN** headlights emit high-intensity emissive glow with bloom (visible as bright eyes)

### Requirement: Lighting system
The system SHALL include ambient light for base illumination, a directional key light, and subtle fill lighting from below (simulating ground/street reflection). Lighting MUST produce visible shadows on both car and robot forms.

#### Scenario: Visible shadows
- **WHEN** the transformer is rendered in either mode
- **THEN** parts cast visible shadows on adjacent parts and the ground plane
