## Goal

Add a luxury-cinematic, futuristic-digital interactive audio layer to the portfolio without turning the site into a soundtrack-driven experience. Audio should feel clearly authored and premium, but remain elegant, short, and restrained.

The chosen direction is an interactive audio system rather than ambient background audio. Sound should support touch, navigation, CTA, and branded transition moments, not run continuously underneath the site.

## Approved Decisions

- Audio direction: luxury cinematic + futuristic digital
- Presence level: balanced, clearly part of the experience, still elegant
- Experience type: mostly interactive
- Activation: auto-on after first user interaction
- Mobile: full audio on mobile too
- Control model: persistent visible mute toggle with saved preference
- Signature moment: one stronger cue on preloader handoff to the page

## Success Criteria

- The site gains a recognizable sonic identity without becoming noisy or distracting.
- Repeated interaction never produces hover spam or stacked sound clutter.
- Audio works consistently across desktop and mobile after a valid user gesture.
- Users can always mute audio, and that preference persists across visits.
- If audio fails to initialize or a browser blocks playback, the site still works normally.

## Experience Principles

1. Sound is texture, not narration.
2. Short interactions are better than long tails.
3. Silence is valid, especially on hover exit and non-essential state changes.
4. Stronger cues are reserved for strong moments.
5. The system should feel premium, not playful, arcade-like, or theatrical.

## Sound Palette

The site should use a small, consistent family of short sounds rather than many unrelated assets.

Core cues:

- Hover and focus cue: a soft glass tick
- Press and activation cue: a muted tactile click
- Intent and pull cue: a low polished pulse
- Success cue: a short filtered confirmation tone
- Branded transition cue: a stronger premium handoff sound for preloader completion

Palette rules:

- Keep most sounds in the 60ms to 350ms range.
- Hover cues should be the quietest and lightest sounds in the system.
- Click and confirmation cues may carry more body than hover but should still stay short.
- Avoid bright arcade bleeps, retro game sounds, harsh glitches, or long musical tones.
- Keep spatial effects light. Sounds should feel polished, not cavernous.
- Slight playback-rate or gain variation is allowed to avoid mechanical repetition, but variation must remain subtle.

## Interaction Map

Only meaningful interactions should trigger sound.

### Hover and Focus

- Play the hover cue on entry for meaningful interactive elements only.
- Eligible elements include navigation links, primary CTAs, theme toggle, and key contact actions.
- Do not play sound on hover leave.
- Do not replay hover sound while moving across nested child elements inside the same interactive target.

### Click and Activation

- Play the click cue on button press, navigation activation, and major CTA interaction.
- Links and controls should use the same audio family so the interface feels coherent.

### Magnetic Interactions

- Magnetic interactions should not emit continuous sound during cursor movement.
- Instead, trigger a restrained pulse only when the interaction crosses an engagement threshold or when the related control is pressed.

### Form Interactions

- On first meaningful field engagement, a light focus cue may play.
- Successful submission should play the confirmation cue.
- Error states should remain silent for the first version unless later tuning proves a warning cue is necessary.

### Preloader Handoff

- When the preloader releases to the main page, play a single stronger signature cue.
- This should be the most cinematic sound in the system, but still brief and premium.

### Mobile Behavior

- Mobile uses the same overall sound family as desktop.
- Hover-only interactions do not apply on touch devices.
- Press-level sounds, navigation sounds, form sounds, and the preloader handoff cue remain active on mobile.

## Anti-Noise Rules

- No sound on every mousemove or touchmove.
- No retrigger spam while crossing child elements.
- Apply cooldowns per cue category and, where useful, per element.
- Avoid stacking the same sound repeatedly in dense interface moments.
- Prefer silence over adding filler cues.

## Control Behavior

The system should remain dormant until a valid user gesture satisfies browser audio restrictions.

Behavior model:

- Audio loads in a dormant state on page load.
- A first valid gesture such as tap, click, or key press arms the audio system.
- Once armed, approved interaction cues may play.
- A visible mute toggle remains available at all times.
- The toggle uses explicit labels such as `Sound On` and `Sound Off`.
- The mute state persists locally and restores on later visits.
- If the user disables sound, nothing should auto-re-enable it.

## Technical Architecture

Implementation should be centralized and intentionally small.

### Audio Manager

Create one client-side audio manager responsible for:

- arming audio after first user interaction
- loading and caching the short audio assets
- exposing named playback events such as `hover`, `click`, `confirm`, and `preloaderReveal`
- tracking enabled, muted, and armed state
- enforcing cooldowns and lightweight playback variation

Components should request named cues only. They should not manage raw audio playback directly.

### Integration Surface

The first implementation pass should integrate audio into:

- `Nav`
- `Hero`
- `Magnetic`
- `ThemeToggle`
- `Contact`
- `Preloader`

If additional components are added later, they should use the same named cue system instead of inventing new local behavior.

### Configuration

Per-cue configuration should support:

- base volume
- cooldown duration
- optional playback-rate variation
- mobile eligibility

### Asset Strategy

- Keep assets compressed and short.
- Preload only the essential cue set.
- Reuse decoded or prepared playback resources where possible.
- Treat audio as enhancement, not a blocking dependency.

## Data Flow

1. App initializes with audio manager dormant.
2. User performs the first valid gesture.
3. Audio manager arms and becomes eligible to play cues.
4. Components dispatch named sound events during approved interactions.
5. Audio manager checks mute state, platform eligibility, and cooldown rules.
6. If allowed, the manager plays the corresponding cue.
7. User preference updates persist locally and affect future interactions immediately.

## Failure Handling

The system must degrade gracefully.

- If audio initialization fails, no error should surface to the user.
- If the browser blocks playback, the site should remain fully usable.
- If an asset fails to load, affected interactions should fail silently.
- If local preference storage is unavailable, audio should still function for the current session.

## Accessibility and Respectful Behavior

- Audio must always be user-controllable.
- No autoplay before a valid gesture.
- Sound toggle must be visible and understandable.
- Audio should remain conservative in volume and density.
- Reduced-motion users are not automatically opted out of sound, but ornamental triggers may be reduced if later testing shows a better experience.
