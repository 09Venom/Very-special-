# suprisegift2 🎁

A 4-scene romantic surprise website with **separate animation files** for each scene.  
Designed to work perfectly on **GitHub Pages**.

## Scenes
1. 🌹 Scene 1 — Liquid Glass Rose (CSS animations)
2. 🎂 Scene 2 — Birthday Cake + Sparkles (Canvas)
3. 🎠 Scene 3 — Romantic Carousel (drag / wheel)
4. 💌 Scene 4 — Birthday Messages (3D list)

## How to use
- **Next (Surprise!)** cycles through scenes in order: 1 → 2 → 3 → 4 → 1
- **Previous** goes backwards
- In Scene 3, the **My Intention** button opens Scene 4; **Back** in Scene 4 returns to Scene 3

## Run locally
Just open `index.html` in your browser.

## Deploy on GitHub Pages
1. Push all files to a new repo named `suprisegift2` (or any name).
2. In GitHub: **Settings → Pages → Source**: choose your branch (e.g., `main`) and `/root`.
3. Save — your site will appear at: `https://<username>.github.io/<repo>/`

## File layout
```
suprisegift2/
├── index.html
├── main.css
├── main.js
├── scene1.css
├── scene1.js
├── scene2.css
├── scene2.js
├── scene3.css
├── scene3.js
├── scene4.css
├── scene4.js
└── images/        # put your carousel images here (item1.jpg ... item9.jpg)
```

> Note: Place `images/item1.jpg` ... `images/item9.jpg` for the carousel.
