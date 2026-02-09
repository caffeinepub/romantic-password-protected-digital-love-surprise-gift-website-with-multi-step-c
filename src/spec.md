# Specification

## Summary
**Goal:** Build a romantic, password-protected digital “love surprise gift” website where creators can generate a private shareable gift link via a multi-step flow, and recipients can unlock and view the gift page using a special date password (DDMMYYYY).

**Planned changes:**
- Add backend persistence in a single Motoko actor to create and retrieve gift pages, using a non-guessable giftId and password (DDMMYYYY) validation that only returns gift data after successful verification.
- Implement a mobile-first multi-step Gift Creator flow to collect all user-generated content: basic details + password date, banner + multiple photos with per-photo notes, love message, ending message, live preview, and shareable link generation.
- Store uploaded images as user-provided assets in the frontend and generate client-side thumbnails/previews for fast gallery loading while keeping higher-quality sources available for viewing.
- Add the shareable gift route (e.g., `/gift/:giftId`) with an initial password entry screen; on success, smoothly transition into the main gift page; on failure, show a clear English error and allow retry.
- Build the gift page sections driven entirely by creator content: hero banner with animated “For/From” text, 3D flip photo gallery with notes, animated love letter, creator-defined memory/quiz items with reveal interactions, hidden/surprise messages that reveal on click, and final/ending sections with floating hearts animations.
- Add creator inputs to add/edit/remove quiz items and hidden/surprise messages (no pre-filled questions or messages).
- Apply a consistent romantic theme (pink/red/white palette, elegant cursive + modern font pairing, smooth fade/slide/heart-float animations) with mobile-first responsiveness.
- Improve SPA-friendly SEO and performance with appropriate document titles/descriptions and by avoiding eager loading/rendering of gift assets before password unlock.
- Include generated, purely decorative static romantic visual assets under `frontend/public/assets/generated` and reference them directly in the UI.

**User-visible outcome:** A creator can build a fully user-generated romantic gift page through a smooth step-by-step flow, generate a private shareable link, and a recipient visiting that link must enter the special date password to unlock and view the animated gift experience.
