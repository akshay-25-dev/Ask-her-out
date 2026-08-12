# Ask Her Out 💌

A playful "will you go out with me" page, rebuilt in React + Tailwind with the works: a No button that dodges and gets more desperate every time it's avoided, a Yes button that grows to match, a day/place picker, and a confetti-filled "date ticket" on the celebration page.

🚀 **Live Demo:** [https://ask-her-out-khaki.vercel.app/](https://ask-her-out-khaki.vercel.app/)

## Setup

```bash
npm install
npm run dev
```

### Adding background music (optional)

Drop any mp3 file at `public/music.mp3`. The 🔈 toggle button (bottom-right) will automatically appear once a valid file is found; if you don't add one, the button just doesn't render, so there's no broken control lying around.

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

## Accessibility notes

- All interactive elements are real `<button>`s (keyboard-reachable, with visible focus rings)
- Floating hearts are `aria-hidden` and their animation respects `prefers-reduced-motion`
- Color contrast between text and background was checked and adjusted from the original (deep plum on a warm gradient, rather than white-on-light-green)

