# Package comparison clarification

## Scope

The founder supplied a phone screenshot of the package comparison, requested clarification through Impeccable, and then asked to continue using Taste. This is a targeted refinement of the accepted Overdrive portfolio, not a replacement visual direction.

Applied the installed Taste entry and frontend-design guidance, including preserve-mode redesign, content-density reduction, source-backed claims, responsive reading order and contrast. Impeccable clarify, adapt, craft-floor and polish guidance informed the same bounded pass. The portfolio's cobalt/citron/offwhite palette, Sora/Barlow Condensed typography, project reel, navigation, case studies and press sections remain unchanged. No new runtime dependency, illustration or icon family was added.

The comparison's job is to help prospective clients understand included responsibilities. Its local presentation prioritizes comprehension over additional motion. This does not change the surrounding portfolio's visual or motion system.

## Previous problems

Eight comparative rows gave fixed-price development and ordinary build fundamentals the same competitive emphasis as hosting and ongoing support. Repeating scope labels, headline answers and explanatory paragraphs produced a long reading path. On phones, adjacent scope columns compressed both answers; large solid-blue cells dominated the comparison.

The previous section was captured from the actual running preview at 390px and 1440px before editing. The source matched the founder's screenshot.

## Implemented structure

A `BEYOND THE BUILD.` heading introduces the service package. One-time development payment is stated separately, with its fixed, agreed development scope. It is not presented as something every other developer lacks.

One offwhite reading sheet now compares only three services: server hosting, maintenance and Google Play publishing. The desktop columns are Service, With KashCrop and Development only. Cobalt text emphasizes the KashCrop answer without colored cell blocks. Development-only scope is explicitly defined, and the comparison does not make claims about individual providers.

At 700px and below, each service is followed by the KashCrop scope and then the development-only scope. These are full-width rows with compact labels, not two adjacent paragraphs. DOM order and explicit row/column header associations are preserved. At 701px and above, the native three-column table resumes.

A native `What else is included?` disclosure retains account ownership, custom interfaces/workflows, the connected product and planned handover. All eight original package facts are present exactly once. Hosting term, maintenance options up to four years, Android applicability, third-party charges and Google verification/review conditions remain explicit. The quote conditions are never hidden by the disclosure.

The same component updates Home and Services. The `#compare` anchors and `/contact` destination are preserved. The contact action uses the existing `Let’s talk` label and shared rectangular button treatment. Native disclosure keyboard behavior, focus outlines, touch-sized controls and reduced-motion handling are present.

## Verification

Type checking and production build passed. All 79 unit tests passed, including eight new focused comparison tests. Those tests protect the three service rows, separate price statement, all eight facts, source order, disclosure content, scope qualifications, semantic associations, unique instance IDs and contact destination.

The browser pass ran eight route/viewport cases in Chromium: Services at 1440, 390, 375, 320, 768, 844 landscape and 720px reflow; Home at 390px. All 98 checks passed. Checks covered loaded content, horizontal overflow, preserved facts and associations, mobile stacking, desktop order, native disclosure opening/closing, keyboard focus, client-owned account wording, axe WCAG A/AA checks, contact navigation and browser-back anchor retention. No test enquiry was submitted.

A final confirmation repeated those cases against the existing public preview and passed all 98 checks, with no recorded page/asset errors. Final screenshots crop unaltered full-page captures made from document top, avoiding sticky-navigation artifacts in offscreen element captures. Desktop, phone, expanded disclosure and narrow-phone captures were inspected.

The 720px case checks reflow width; it is not a claim of testing a real browser's 200% zoom control. WebKit was attempted but could not launch on this VM because host libraries are missing. Native Safari/iOS and real-device touch testing are not claimed.

The single Impeccable detector run reported zero primary findings and 15 advisories about local typography. These component measurements preserve the accepted families and palette; no detector suppression or global token normalization was used. There was no independent subagent review in this clarification pass.

At 390px, the default section height changed from 2939.45px to 1590px, a 45.9% reduction with the additional-details disclosure closed. The four supporting facts remain available when expanded. Desktop default height changed from 1744.28px to 1244.06px.

Evidence and captures are in [comparison-clarity-review](comparison-clarity-review/). [Local results](comparison-clarity-review/local-verification.json) and [public-preview results](comparison-clarity-review/verification.json) retain the browser details. The repeatable script is [verify-comparison-clarity.mjs](../../tools/verify-comparison-clarity.mjs).

## Delivery

The verified preview remains `https://prove-jane-little-ranking.trycloudflare.com`. Home uses `/#compare` and Services uses `/services#compare`. The existing VM preview process was restarted with the successful build. The production `kashcrop.in` domain was not changed.

Updated `PRODUCT.md`, `AGENTS.md` and the local comparison section of `DESIGN.md` to reflect the new structure. Global tokens and `.impeccable/design.json` are unchanged. Earlier review records describe the earlier implementation and remain historical evidence.
