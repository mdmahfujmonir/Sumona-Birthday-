# MIDNIGHT WISH — Birthday Experience for Sumona

A responsive, single-page birthday website made with HTML, CSS and vanilla JavaScript.

## 1. Project files

- `index.html` — page structure and content sections
- `style.css` — theme, layout, responsiveness and animation
- `script.js` — countdown, gallery, letter, wishes, quiz and interactions
- `assets/images/` — Sumona's photographs
- `assets/music/` — optional licensed instrumental music
- `robots.txt` — asks search engines not to index the site

## 2. Add photographs

1. Open the `assets/images/` folder.
2. Add your own photographs of Sumona.
3. Name them exactly as follows:
   - `sumona-01.jpg`
   - `sumona-02.jpg`
   - `sumona-03.jpg`
   - Continue through `sumona-12.jpg`.
4. JPG, JPEG, PNG and WebP are all suitable, but if you use a different extension, update the matching filename in `script.js`.
5. Keep the original photos. The gallery uses `object-fit: cover`; if a photo crops awkwardly, change its `position` value in the gallery configuration to `top`, `center`, or `bottom`.

The gallery has tasteful placeholders until you add real images. No fake portraits are included.

## 3. Edit content in one place

Open `script.js` and find `const CONFIG` at the top.

You can edit:
- `recipient`
- `birthday`
- `signature`
- `gallery` image paths and captions
- `wishes`
- `gifts`
- `openWhen`
- `letter`
- `music`

For another gallery photo, add another object to the `gallery` array, for example:

```js
{src:"assets/images/sumona-13.jpg", caption:"A lovely moment.", position:"top"}
```

Then add `sumona-13.jpg` to `assets/images/`.

## 4. Change the birthday date

In `script.js`, update:

```js
birthday: "2026-11-14T00:00:00",
```

The countdown uses the visitor's device local time. On the birthday it shows a celebration message, and after the date it shows a post-birthday message.

## 5. Edit the letter and signature

In `script.js`, edit the `letter` text inside `CONFIG`. Keep the backticks around the letter so line breaks are preserved.

Edit the `signature` value near the top of `CONFIG` if you want to change the sign-off. The visible closing signature is also written in `index.html`; update that line too if you change it.

## 6. Add background music (optional)

1. Choose an original or properly licensed instrumental track.
2. Rename it `background.mp3`.
3. Put it in `assets/music/`.
4. Open the website and tap the music button in the lower-right corner.

Music does not autoplay. The visitor must tap the music button first. The website works normally without music.

## 7. Run locally

For a quick test, open `index.html` in a modern browser. Some browsers handle local media differently, so a local web server is better:

- In VS Code, install/use the Live Server extension and select **Open with Live Server**.
- Or use Python from the project folder: `python -m http.server 8000`, then open `http://localhost:8000`.

## 8. Test on Android

1. Upload the project to GitHub or run it on a local server.
2. Open the website URL in Chrome on your phone.
3. Check the navigation menu, gallery, photo viewer, cake, letter, wishes and music button.
4. Check that the page does not scroll sideways.
5. Test both with and without music.

## 9. Publish with GitHub Pages

1. Sign in to GitHub and create a new repository, for example `midnight-wish`.
2. Upload the complete contents of this folder. Make sure `index.html` is at the repository root.
3. Open repository **Settings**.
4. Select **Pages** from the sidebar.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. Wait for GitHub Pages to publish the site. GitHub will show the public URL in the Pages settings.

## 10. Update after publishing

Edit the relevant file or replace photos in the repository, commit the changes, and wait for GitHub Pages to redeploy. If the old version remains visible, refresh the browser or clear its cached site data.

## 11. Privacy reminder

This is a static website. It does not collect personal data or upload photos to a server through its code. However, a public GitHub Pages URL is accessible to anyone who has the link and may be shared. `noindex` and `robots.txt` are requests to search engines, not access controls. Do not upload private or sensitive photographs without the subject's permission. A client-side password screen would not provide strong security.

## 12. Accessibility and performance

The site includes responsive layouts, keyboard-accessible controls, reduced-motion support, lazy-loaded gallery images and graceful missing-image/music fallbacks. It uses no required paid service or API.

## Final checklist

- [ ] Replace the photo placeholders with photographs you are comfortable sharing.
- [ ] Check all captions.
- [ ] Read the letter once more before sharing.
- [ ] Add licensed music only if desired.
- [ ] Test the website on your phone.
- [ ] Confirm the public link works before sending it.
