# Weronika Rużyła — Kosmetologia Estetyczna

Sito one-page multilingua (🇵🇱 PL · 🇬🇧 EN · 🇮🇹 IT) in Next.js 16 + Tailwind CSS 4 + Framer Motion.

```bash
cd weronika-ruzyla
npm install
npm run dev     # http://localhost:3000 → reindirizza a /pl, /en o /it
npm run build && npm start
```

## Dove modificare cosa

| Cosa | File |
| --- | --- |
| Testi nelle 3 lingue | `src/i18n/dictionaries/{pl,en,it}.ts` |
| Telefono, social, indirizzo, link di prenotazione, marchi | `src/content/site.ts` |
| Foto e video | `public/images/`, `public/videos/` (aggiornare width/height in `site.ts`) |
| Colori e font | `src/app/globals.css`, `src/app/[lang]/layout.tsx` |

## Lingua

`src/proxy.ts` reindirizza `/` alla lingua del browser (o a quella scelta in precedenza, salvata nel cookie `NEXT_LOCALE`); il polacco è la lingua di default. Le tre pagine sono generate staticamente.

## Da completare prima della pubblicazione

- Foto definitive in `public/images/`, prima/dopo in `public/images/results/`, video (MP4 + WebM, 480px, ~12s, senza audio) in `public/videos/`. Per aggiungerne: stessi formati, poi aggiornare `images`/`videos`/`results` in `src/content/site.ts`.
- `site.ts`: link Instagram/Facebook reali, indirizzo dello studio (mostra anche il link a Google Maps), eventuale link Booksy in `bookingUrl` (altrimenti "Prenota" apre WhatsApp), dominio in `url`.
- Rileggere i testi (chi sono, trattamenti, accademia) con la cliente.
