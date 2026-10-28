# Product storytelling, evidence update

Self-authored under the user's existing creative delegation. This is a refinement of the same build and fingerprint, not a new page. ENERGY 3 / RHYTHM 3 / MOTION 3 remain in place. Antislop DURING is the existing session choice.

## Evidence precedence

The user now explicitly identifies Member as the customer-facing F&B experience and asks for SIAKAD. The supplied original screenshots in `public/assets/closepay/` supersede older, narrower Member/profile and Institutional/PMB copy. Research documents (7) and (9) contain speculative claims; report (8) also references application source absent from this checkout. None of those references is a fresh backend verification. Screenshots establish visible UI capabilities, not successful backend integration, permission rules, automation or transaction guarantees.

| Product | Visible evidence | Story allowed | Excluded inference |
| --- | --- | --- | --- |
| F&B | Menu, variant modal, order type, checkout, payment status, transaction list, Kitchen board | A cashier chooses items/variants, identifies eat-in/takeaway, checks out and monitors order status | Automated inventory/purchasing, guaranteed real-time delivery or payment settlement |
| Member | Restaurant home, menu list, product detail, checkout, QRIS, login | Customer-facing F&B discovery, choice, order details and payment presentation | Loyalty points, rewards, CRM segmentation or automatic POS synchronization |
| SIAKAD | Dashboard, KRS selection, class schedule, student billing | Academic information, course/class choices, meeting schedule and bill status | PMB-only positioning, guaranteed admission/approval, financial settlement or grade prediction |

## Feeling and interaction

Preserve the photographic cover and quiet human introduction. Keep the interactive order ticket as the peak. Add an open editorial product desk within F&B that focuses actual UI regions as the visitor chooses a task. Member continues the same food story from the customer's side; at the variant step the visitor can switch to the cashier's view of the same kinds of choices. This is a comparison of supplied screens, not a claim that they are a synchronized transaction. SIAKAD moves into the rhythm of a semester through KRS, schedule and billing. End in the same context-aware conversation.

Peak remains: “Aku mengikuti satu pesanan dan bisa melihat detail yang dihadapi pelanggan maupun kasir.” The quieter intro still precedes it. Member adds agency through changing viewpoint; SIAKAD builds confidence through specific academic tasks. No additional pin, empty scroll span or device mockup is introduced.

## Presentation contract

- Screenshot crops are rendered directly from unchanged WebP originals. Native product colors and labels are preserved; no generated UI replaces them.
- The original screen can be opened in a keyboard-operable dialog. A focus view enlarges the relevant region; semantic copy explains its meaning outside the image.
- Screenshots remain static evidence. Live-looking buttons inside them are not reconstructed as fake forms. Visible labels explain that these are product captures, with values belonging to the captures rather than current offers or live records.
- Member QRIS is a captured payment screen, never a checkout flow on this marketing page. No payment request is sent.
- Motion gives spatial continuity to the selected screen/focus region. GSAP owns section entry and scroll; Motion owns selected state and camera position on separate nested elements. Lenis remains the single smooth-scroll owner.
- Native dialog supplies focus containment and Escape. The dialog body uses native scrolling with `data-lenis-prevent`; document scrolling pauses while it is open.
- Reduced motion shows each selection instantly. Mobile preserves usable task controls and readable focused crops, with full original available separately.

## Decision reasons

F&B stays deep petrol to preserve the order scene. Its evidence desk has wide screen proportions for the cashier's horizontal workspace. Member uses an asymmetrical paper spread, contrasting the compact customer screen with an enlarged detail. SIAKAD uses a document-like index and a wide academic work surface. The same editorial type, jade accent and photographic fragments bind them. Photos become context, while original UI carries the product explanation. No new generative assets are needed.


## Art direction refinement: React Bits study and PMB

Reference reviewed: https://reactbits.dev/ and official /davidhdev/react-bits documentation through Context7 (SplitText, ScrollExpand, AccordionGallery). These are behavioral references, not copied source or installed components. Word masks use semantic React markup and the existing GSAP context; the academic sheet expands through a clip mask driven by the existing ScrollTrigger/Lenis clock. No second scroll listener, RAF loop, useWindowScroll, or dependency was added. AccordionGallery informed click-to-select hierarchy; expanding multiple screenshot widths was rejected because it would obscure product text. Image Trail was rejected because a pointer trail adds no explanation of the user flow.

F&B now has a menu context fragment behind an isolated modal; wider checkout/Kitchen/transaction scenes retain a full reading surface. The source-view controls move below the visual so they no longer resemble an app frame. Member's companion crop changes from the menu to the actual drink detail when selecting variants, linking object to choice. The focal screenshot stays level for reading. SIAKAD gains a full-width academic document and task index with meaningful mobile detail crops. All crops still reference unchanged supplied source files; full originals remain inspectable.

PMB uses the bounded facts in research report (8): registration form, document upload, administrator applicant list/status editing. App source referenced by that report is absent; these are supplied research findings, not newly verified app capabilities. No UKT payment, KYC/OCR, admission guarantee, invented fields or submitted application UI appears. The three paper folios are explicitly editorial illustrations; visitors change the subject of the explanation, never submit personal data. The disclosure clearly states that PMB screenshots are unavailable.

Same six-act foundation, with PMB added as a calm seventh chapter before contact. No new peak, pin, or spacer. Dials 3/3/3 retained. The visual distinction is task-based: service counter, customer's choice, semester document, admission dossier.
