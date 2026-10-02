# Sachin Kumar Shukla – Portfolio
React + Vite + three.js

    npm install
    npm run dev       # local preview
    npm run build     # production build in /dist

Edit `src/data.js` to change content and set your real GitHub / project / demo links.
Deploy: push to GitHub, import the repo in Vercel or Netlify (build: `npm run build`, output: `dist`).

## Contact form (EmailJS)
1. Create a free account at emailjs.com and add an Email Service (Gmail) -> copy the Service ID.
2. Create a Template with variables `{{from_name}}`, `{{reply_to}}`, `{{message}}`; set "To email" to your address and "Reply-To" to `{{reply_to}}`. Copy the Template ID.
3. Copy the Public Key from Account -> General.
4. `cp .env.example .env` and fill in the three values. On Vercel/Netlify add the same three variables in project settings.
5. In EmailJS, restrict allowed domains to your site for safety.

## Certificates
Each entry in `src/data.js` opens in an on-page viewer. To show the actual certificate image, save it into `public/certs/` and set `image: "certs/name.png"`.
