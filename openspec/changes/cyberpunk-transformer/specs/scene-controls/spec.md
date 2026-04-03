## ADDED Requirements

### Requirement: Orbit controls for viewing
The system SHALL provide orbit controls (drag to rotate, scroll to zoom, right-drag to pan) for the user to freely inspect the transformer in both modes.

#### Scenario: Drag to rotate
- **WHEN** user clicks and drags on the canvas
- **THEN** the camera orbits around the transformer

#### Scenario: Scroll to zoom
- **WHEN** user scrolls the mouse wheel
- **THEN** the camera zooms in/out toward the transformer

#### Scenario: Controls during transformation
- **WHEN** a transformation is in progress
- **THEN** orbit controls remain active — the user can orbit while the transformation plays

### Requirement: One-click transformation trigger
The system SHALL provide a visible UI button to trigger transformation between car and robot modes. The button text MUST reflect the available action.

#### Scenario: Button shows "Transform" in car mode
- **WHEN** state is `car`
- **THEN** the button displays text indicating transformation to robot is available

#### Scenario: Button shows "Transform" in robot mode
- **WHEN** state is `robot`
- **THEN** the button displays text indicating transformation to car is available

#### Scenario: Button disabled during transformation
- **WHEN** state is `to-robot` or `to-car`
- **THEN** the button is disabled and non-interactive

### Requirement: State indicator
The system SHALL display the current state (Car / Robot / Transforming...) in the UI.

#### Scenario: State display in car mode
- **WHEN** state is `car`
- **THEN** UI shows "CAR MODE" or equivalent indicator

#### Scenario: State display during transformation
- **WHEN** state is `to-robot` or `to-car`
- **THEN** UI shows "TRANSFORMING..." or equivalent indicator

### Requirement: Debug transformation scrubber
The system SHALL provide a range slider (0 to 1) visible in development mode that manually controls the transformation progress value. Moving the slider MUST instantly update all part positions to the corresponding interpolated state.

#### Scenario: Slider at 0
- **WHEN** debug slider is set to 0
- **THEN** all parts are in carConfig positions (full car mode)

#### Scenario: Slider at 1
- **WHEN** debug slider is set to 1
- **THEN** all parts are in robotConfig positions (full robot mode)

#### Scenario: Slider overrides animation
- **WHEN** the debug slider is being actively dragged
- **THEN** any in-progress automatic animation is paused and the scrubber position takes precedence

### Requirement: Ground plane
The system SHALL render a ground plane beneath the transformer to provide spatial reference and shadow reception in both modes.

#### Scenario: Ground visible in car mode
- **WHEN** the car is rendered
- **THEN** a ground plane is visible below the car receiving shadows

#### Scenario: Ground visible in robot mode
- **WHEN** the robot is rendered
- **THEN** a ground plane is visible below the robot receiving shadows
