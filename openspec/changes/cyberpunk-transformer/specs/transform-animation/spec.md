## ADDED Requirements

### Requirement: Dual transform configuration per part
The system SHALL store two transform configurations for every part: `carConfig` and `robotConfig`. Each configuration MUST contain position (Vector3), rotation (Euler), and scale (Vector3).

#### Scenario: Config completeness
- **WHEN** any part component is initialized
- **THEN** it has both carConfig and robotConfig defined with valid position, rotation, and scale values

#### Scenario: Config interpolation
- **WHEN** the transformation progress value is 0.5
- **THEN** every part's transform is the linear interpolation (lerp) between its carConfig and robotConfig values at 50%

### Requirement: Five-phase transformation timeline with overlap
The system SHALL execute the transformation in 5 phases with 20-30% temporal overlap between consecutive phases. Total duration SHALL be approximately 2.5 seconds.

#### Scenario: Phase timing
- **WHEN** transformation starts (progress = 0)
- **THEN** Phase 1 begins, Phase 2 starts at ~0.2s (overlapping with Phase 1), Phase 3 at ~0.6s, Phase 4 at ~1.2s, Phase 5 at ~1.8s

#### Scenario: Phase overlap
- **WHEN** Phase 2 is active (0.2-0.9s)
- **THEN** Phase 1 is still active (until 0.4s), creating simultaneous animation of prep and torso parts

### Requirement: Easing functions per animation type
The system SHALL apply easing functions to part animations based on motion type: ease-out for parts launching outward, ease-in for parts settling into position, ease-in-out for smooth repositioning, and spring physics with overshoot for final locking.

#### Scenario: Door swing uses ease-out
- **WHEN** a door swings outward from car body
- **THEN** the animation starts fast and decelerates (ease-out curve)

#### Scenario: Final settling uses spring physics
- **WHEN** Phase 5 (settle) executes
- **THEN** parts overshoot their target slightly and oscillate back (spring damping)

### Requirement: Bidirectional transformation
The system SHALL support transformation in both directions: car-to-robot and robot-to-car. The reverse transformation MUST produce the exact inverse animation (same phases in reverse order, same timing overlap).

#### Scenario: Car to robot
- **WHEN** user triggers transformation from car mode
- **THEN** animation progresses from carConfig to robotConfig over 2.5 seconds

#### Scenario: Robot to car
- **WHEN** user triggers transformation from robot mode
- **THEN** animation progresses from robotConfig to carConfig over 2.5 seconds with phases in reverse order

### Requirement: State management with transform lock
The system SHALL track state as one of: `car`, `robot`, `to-car`, `to-robot`. Transformation requests MUST be blocked when state is `to-car` or `to-robot`.

#### Scenario: Block mid-transform
- **WHEN** state is `to-robot` (transformation in progress)
- **THEN** additional transform button presses are ignored

#### Scenario: State transitions
- **WHEN** car-to-robot transformation completes
- **THEN** state transitions from `to-robot` to `robot`

#### Scenario: State transitions reverse
- **WHEN** robot-to-car transformation completes
- **THEN** state transitions from `to-car` to `car`

### Requirement: Camera reframing during transformation
The system SHALL smoothly interpolate the camera target and distance during transformation to reframe from car composition (horizontal) to robot composition (vertical).

#### Scenario: Camera follows transformation
- **WHEN** transformation progresses from 0 to 1
- **THEN** camera target moves from car center (~0.6m height) to robot center (~5m height) and camera distance adjusts to frame the subject

### Requirement: Debug transformation scrubber
The system SHALL provide a slider (0 to 1) that manually controls the transformation progress. This MUST be available in development mode for debugging.

#### Scenario: Manual scrub
- **WHEN** the debug slider is dragged to 0.5
- **THEN** the transformer freezes at the mid-transformation state with all parts at their 50% interpolated positions

#### Scenario: Scrubber overrides animation
- **WHEN** the debug slider is active
- **THEN** automatic transformation animation is paused
