## ADDED Requirements

### Requirement: Car parts are independent components with defined pivot points
The system SHALL model the car as separate mesh components, each with its own pivot Object3D for rotation origin. Every rotating part MUST have its pivot point explicitly defined in the scene hierarchy.

#### Scenario: Hood rotation pivot
- **WHEN** the hood mesh rotates during transformation
- **THEN** it rotates around its back edge (the edge adjacent to the windshield)

#### Scenario: Door rotation pivot
- **WHEN** a door-upper mesh rotates during transformation
- **THEN** it rotates around its top edge (door frame connection point)

#### Scenario: Roof rotation pivot
- **WHEN** the roof shell opens during transformation
- **THEN** it hinges at its back edge to reveal the hidden head

### Requirement: Car contains all required parts
The system SHALL include the following independent mesh components: hood, windshield (planar), roof shell, hidden head (inside roof), grille, headlights (x2), left door upper, left door lower, right door upper, right door lower, chassis upper, chassis lower, trunk left half, trunk right half, front wheels (x2), rear wheels (x2), side skirts (x2), fender connectors (x2), exhaust pipes (x2).

#### Scenario: All parts present
- **WHEN** the car is rendered in car mode
- **THEN** all 22 mesh components are visible and positioned to form a complete sports car silhouette

#### Scenario: Doors have elbow joints
- **WHEN** viewing the door components
- **THEN** each door consists of an upper segment and lower segment with a visible connection point (elbow joint) between them

### Requirement: Hidden head inside roof
The system SHALL include a pre-modeled head mesh stored inside the roof shell. The head MUST be invisible in car mode and revealed when the roof opens during transformation.

#### Scenario: Head hidden in car mode
- **WHEN** the transformer is in car mode
- **THEN** the head mesh is not visible (occluded by roof shell)

#### Scenario: Head revealed during transformation
- **WHEN** the roof shell opens (Phase 4 of transformation)
- **THEN** the head mesh becomes visible and is positioned at the top of the robot

### Requirement: Telescoping chassis
The system SHALL model the chassis as overlapping telescoping sections (upper and lower) that slide apart during transformation. The chassis MUST NOT use scale deformation to change shape.

#### Scenario: Chassis extends during transformation
- **WHEN** transforming from car to robot
- **THEN** the chassis upper section slides upward relative to chassis lower section

#### Scenario: No scale deformation on chassis
- **WHEN** the chassis changes between car and robot configurations
- **THEN** only position changes are applied — no non-uniform scale stretching

### Requirement: Car idle animations
The system SHALL play idle animations when the transformer is in car mode: subtle suspension bob (vertical oscillation), slow wheel rotation, and pulsing underglow neon.

#### Scenario: Suspension bob
- **WHEN** the car is idle in car mode
- **THEN** the entire car body oscillates vertically by +/- 0.02 units with a 2-second period

#### Scenario: Wheel rotation
- **WHEN** the car is idle in car mode
- **THEN** all four wheels rotate continuously around their axle axis

### Requirement: Unit system
The system SHALL use 1 Three.js unit = 1 meter as the coordinate standard. The car body SHALL be approximately 4.5 units long, 2 units wide, and 1.2 units tall.

#### Scenario: Car dimensions
- **WHEN** the car model is rendered
- **THEN** its bounding box is approximately 4.5m x 2m x 1.2m (length x width x height)
