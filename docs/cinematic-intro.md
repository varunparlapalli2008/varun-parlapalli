# Cinematic portfolio introduction

The homepage opens with a 7.2-second moving portfolio montage, a pullback into
VARUN, a gold name reveal, and a short fade into the existing ivory homepage.
The scene uses published project, achievement, and experience text, plus the
existing NEC building image. It uses CSS and SVG with no added application dependencies.

## Visitor controls

- Skip and Escape dismiss the introduction immediately.
- It plays once per tab session. Direct section links bypass it.
- Replay intro is in the homepage footer.
- Sound is off initially. The sound button enables a short original synthesised cue.
- Reduced-motion visitors bypass autoplay. Replay shows a static name reveal.
- Closing or hiding the page stops audio and restores scrolling.
- The homepage remains server rendered and readable without JavaScript.

## Applying the downloadable patch

This change was prepared against main commit
`535cbb6` in `varunparlapalli2008/varun-parlapalli`.
Extract the supplied archive, place `cinematic-intro.patch` in your existing
project root, and run:

```bash
git switch -c feature/cinematic-intro
git apply --check cinematic-intro.patch
git apply cinematic-intro.patch
npm run build
```

Commit the resulting changes and deploy that commit through your existing
Vercel project. If the check reports a conflict, reconcile the listed changes
with your newer code before applying. The archive's `files/` directory contains
copies of the changed files for review.

## Validation completed

Production build, TypeScript compilation, and ESLint for the changed components
passed. Chromium checks covered the first visit, mobile layout and touch skip,
sound cleanup, session suppression, replay, Escape and focus return,
reduced-motion bypass and static replay, direct section links, JavaScript-disabled
content, automatic completion, scrolling, and the homepage project link.
No browser page errors occurred during those checks.

The MP4 preview is a silent recording of the implemented browser sequence.
Deployment to the live domain still requires repository write access.
