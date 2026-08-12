# Ask Her Out 💌

A playful "will you go out with me" page, rebuilt in React + Tailwind with
the works: a No button that dodges and gets more desperate every time it's
avoided, a Yes button that grows to match, a day/place picker, and a
confetti-filled "date ticket" on the celebration page.

## What's new vs. the original plain-HTML version

- **Personalization** — add `?name=Simran` to the URL and it's used throughout ("Do you wanna go out with me, Simran?")
- **Escalating No button** — shrinks and its text gets more pleading each time it's dodged, using the button's *actual* measured size (not hardcoded pixel offsets), so it never clips off-screen on small phones
- **Growing Yes button** — grows a little every time No is dodged
- **A day + place picker** after "Yes", before the celebration
- **Confetti burst** on the final page (via `canvas-confetti`)
- **A "date ticket" recap card** showing who/when/where — shareable via the Web Share API (falls back to copying to clipboard)
- **Floating hearts** ambient background animation (disabled automatically for anyone with `prefers-reduced-motion` set)
- **Optional background music toggle** — starts silent (browsers block autoplay-with-sound anyway), and the button hides itself entirely if you haven't added a music file
- Real `<title>`, viewport meta tag, favicon, and GIF fallback (so a broken Giphy link doesn't leave a blank box)

## Setup

```bash
npm install
npm run dev
```

Visit the URL Vite prints (typically `http://localhost:5173`).

### Personalizing it for someone

Share the link with a `name` query param:

```
http://localhost:5173/?name=Simran
```

### Adding background music (optional)

Drop any mp3 file at `public/music.mp3`. The 🔈 toggle button (bottom-right)
will automatically appear once a valid file is found; if you don't add one,
the button just doesn't render, so there's no broken control lying around.

## Project structure

```
src/
  pages/
    AskPage.jsx        -- the initial ask, dodge/grow buttons
    PlanPage.jsx        -- pick a day + place
    CelebratePage.jsx    -- confetti + ticket recap + share
  components/
    DodgeButton.jsx      -- the escalating "No" button
    GifCard.jsx           -- GIF with graceful fallback
    FloatingHearts.jsx    -- ambient background animation
    MusicToggle.jsx        -- optional background music control
  hooks/
    usePlan.js              -- name/day/place state, persisted to sessionStorage
```

## Deploying

This is a static Vite build, so any static host works:

```bash
npm run build
```

This outputs to `dist/`. Deploy that folder to:
- **GitHub Pages** — push `dist/` to a `gh-pages` branch, or use the `gh-pages` npm package
- **Netlify / Vercel** — connect the repo, build command `npm run build`, output directory `dist`

## Accessibility notes

- All interactive elements are real `<button>`s (keyboard-reachable, with visible focus rings)
- Floating hearts are `aria-hidden` and their animation respects `prefers-reduced-motion`
- Color contrast between text and background was checked and adjusted from the original (deep plum on a warm gradient, rather than white-on-light-green)
