# ClosePay motion refinement

This continues the existing six chapters, copy, photography, logo and product journey. It does not replace the page structure. Creative decisions are self-authored under the user's explicit delegation. Antislop mode: DURING. ENERGY 3 / RHYTHM 3 / MOTION 3 remain unchanged.

## Direction

The cover behaves like an editorial composition coming into focus: the two headline lines roll out of their own masks, the photograph opens vertically, and the held cup settles across the image edge. A finite, 4.5-second camera move adds atmosphere while the visitor is stationary. It stops rather than looping beside text. The cover's planes respond at different, restrained depths to scroll and pointer movement.

The F&B foldout remains the peak. Its paper ticket moves between four documented states. The printed explanation changes through a short vertical mask, maintaining continuity between the moving object and its meaning. Choosing a stage or order origin takes manual control; scrolling cannot overwrite that choice until the visitor explicitly resumes following the page.

Member opens horizontally like a photographic spread, with its image crop settling separately. The phrase “Jadi bagian.” uncovers once. PMB uses a widening photographic frame with a small vertical camera movement. The final outlined word fills with the existing ink color as the contact section arrives. No new gradient palette, morphing spectacle or fictitious product UI is introduced.

## Ownership and timing

| System | Owns | Deliberate limits |
| --- | --- | --- |
| Lenis 1.3.27 | Wheel inertia and anchor travel | `autoRaf: false`, `lerp: 0.095`, `syncTouch: false`; no second RAF loop and no touch emulation |
| GSAP ticker | Lenis clock | Seconds converted to milliseconds; lag smoothing disabled while mounted; callback removed on cleanup |
| ScrollTrigger | Chapter progress, scene choreography and active navigation | `lenis.on('scroll', ScrollTrigger.update)`; native document scrolling, no scroller proxy or transformed page wrapper |
| GSAP timelines | Hero entrance, scroll layers, photo masks, finite camera settle | 1.3-second overlapping entrance; scrub smoothing 0.4–0.55 seconds; no perpetual loop |
| Motion for React | Pointer springs, ticket state, text changes, menu and Purchaser entrance | Springs for physical objects; 0.35–0.38-second masks for changed content; semantic controls remain native |
| CSS | Underlines, arrow responses, selected dots and plus indicators | Small, local state cues; transitions removed under reduced motion |

Hero outer elements belong to scroll timelines. Nested photo and cup containers belong to pointer springs. The photo frame owns its reveal; the image owns the camera settle. No two animation systems write the same element's transform. Magnetic response affects only the CTA arrow, leaving the actual click target stationary.

The previous ScrollCraft JavaScript runtime is not loaded. Its reference files remain unmodified in the repository, and its CSS vocabulary and verification hooks remain available. This prevents a second scroll engine from competing with GSAP. `sc-ready` now means the actual motion setup has completed, not that the old runtime is present.

## Navigation, resizing and fallbacks

- One delegated anchor handler updates history and scrolls to a numeric position, avoiding Lenis's additional CSS margin/padding calculation. The destination receives keyboard focus after arrival. Modified clicks are untouched.
- Header chapter indicators follow ScrollTrigger's visible section. Hover underlines use the same visual language but do not replace the selected indicator.
- ResizeObserver refreshes geometry after content size changes, debounced by 120 ms. Font readiness also triggers a refresh. Observers, ticker callbacks, document handlers, pointer handlers and timelines are removed on cleanup or motion-preference changes.
- Touch remains native. Below 1000 px width or 760 px height, the order chapter uses natural document flow and the same operable state buttons.
- Reduced motion destroys Lenis, removes sticky travel, reveals all masks, disables spatial/ambient motion and uses instant anchor navigation. All four order states remain available by button.
- Server-rendered copy and images are visible without JavaScript. Interactive React controls still require JavaScript; this is a content fallback, not an offline application.
- Photography is already generated specifically for this direction. This refinement adds no replacement assets or generic filler.

## Implementation references

- `src/components/useClosePayMotion.ts`: the single scroll and choreography owner.
- `src/components/ClosePayExperience.tsx`: existing page structure, native controls, product state and Motion interactions.
- `src/app/globals.css`: responsive composition, local state cues and reduced-motion overrides.
- `verify-motion.mjs`: real Chrome wheel trajectories, pointer transforms, stable CTA hitbox, anchor geometry/focus, state synchronization, media lifecycle, touch input and layout timing.
- `verify.mjs`: responsive product interactions, image recovery, accessibility and screenshots.

Primary implementation documentation consulted through Context7: [Lenis integration](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger), [GSAP matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/), [Motion accessibility](https://motion.dev/docs/react-accessibility). The installed Lenis source was also inspected to confirm its current CSS scroll-offset behavior.

## Dependency boundary

Lenis was explicitly requested and is pinned to 1.3.27 in the npm manifest and lockfile. The dependency-reviewer `package-risk` profile returns UNKNOWN because Endor MCP and a proven tenant namespace are unavailable; no package-safety claim is made. The existing npm audit reports Next.js as critical and its PostCSS dependency as high. The offered remediation requires a major Next.js upgrade; that migration is outside this motion refinement. The local preview is not a public deployment.

The pre-existing `bun.lock` was not regenerated. npm and `package-lock.json` are the verified install path for this delivery.
