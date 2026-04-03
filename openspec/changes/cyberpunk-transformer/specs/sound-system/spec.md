## ADDED Requirements

### Requirement: Engine idle sound in car mode
The system SHALL play a low engine rumble loop when the transformer is in car mode. The sound SHALL loop continuously and stop when transformation begins.

#### Scenario: Car mode idle sound
- **WHEN** state is `car`
- **THEN** engine idle sound is playing on loop

#### Scenario: Sound stops on transform
- **WHEN** transformation from car to robot is triggered
- **THEN** engine idle sound fades out within 0.3 seconds

### Requirement: Transformation sound chain
The system SHALL play a single pre-rendered 2.5-second audio clip during transformation. The clip SHALL contain the full SFX chain: engine rev, hydraulic hiss, metal clank, gear whir, and final KA-CHUNK.

#### Scenario: Transformation sound plays
- **WHEN** car-to-robot transformation is triggered
- **THEN** the transformation SFX clip plays from start to end synchronized with the animation

#### Scenario: Reverse transformation sound
- **WHEN** robot-to-car transformation is triggered
- **THEN** the transformation SFX plays in reverse, achieved by decoding the audio file into an AudioBuffer and reversing the PCM data via Web Audio API (AudioBufferSourceNode with a reversed buffer), requiring only a single source audio file

#### Scenario: Sound stops if interrupted
- **WHEN** the transformation sound finishes but state hasn't completed
- **THEN** the sound simply ends (no error state)

### Requirement: Mechanical heartbeat in robot mode
The system SHALL play a low-frequency mechanical heartbeat loop when the transformer is in robot mode. The heartbeat MUST be distinct from the engine idle.

#### Scenario: Robot mode heartbeat
- **WHEN** state is `robot`
- **THEN** mechanical heartbeat sound is playing on loop

#### Scenario: Heartbeat fades on transform
- **WHEN** transformation from robot to car is triggered
- **THEN** heartbeat sound fades out within 0.3 seconds

### Requirement: Sound state management
The system SHALL manage sound playback through the same state machine as the visual transformation. Sound MUST NOT play in states where it doesn't belong.

#### Scenario: No sound in transforming states
- **WHEN** state is `to-robot` or `to-car`
- **THEN** neither idle loop is playing — only the transformation SFX
