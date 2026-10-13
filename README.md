# matmaonline

Strona Matma Online — indywidualne korepetycje z matematyki online dla klas 1–6 (prowadzi Stasia Kulik).
Dwie wersje językowe: polska pod `/`, rosyjska pod `/ru/`. Wersja polska nie wspomina o języku rosyjskim
(brak przełącznika w nagłówku, pytania w FAQ i pola języka w formularzu) — do `/ru/` prowadzi tylko link „RU” w stopce.

## Stos

React 19 + Vite 7 + TypeScript, bez routera i bez backendu. Każda strona jest gotowym plikiem HTML
(`scripts/prerender.mjs`, `renderToString`), a przeglądarka tylko ją „ożywia”.

```
npm install
npm run dev        # podgląd roboczy
npm run build      # dist/ — 4 strony + 404, sitemap.xml, robots.txt
npm run preview
```

## Gdzie co jest

- `src/content/pl.ts`, `src/content/ru.ts` — wszystkie teksty (z briefu, wersja 1.2); `privacy.ts` — polityka prywatności.
- `src/lib/site.ts` — telefon, adresy stron.
- `src/components/` — sekcje; `src/styles/main.css` — cały wygląd (kolory z brand kitu na górze pliku).
- `src/assets/img/` — zdjęcia. Sylwetka na pierwszym ekranie: gotowa wycinka `assets-src/stasia-cutout.png`
  + biały obrys naklejki z `scripts/photo/sticker_from_cutout.py`. Portret w „polaroidzie” — kadr z
  `assets-src/stasia-source.png` powiększony 4× (Real-ESRGAN).
- `scripts/qc.mjs` — kontrola: błędy konsoli, poziomy scroll, zdjęcia, jedno H1, zrzuty ekranu.

## Publikacja

`.github/workflows/deploy.yml` buduje i publikuje na GitHub Pages po każdym pushu do `main`, pod domeną
`matmaonline.pl` (adres jest wpisany w workflow).

W repozytorium: Settings → Pages → Source = **GitHub Actions**, Custom domain = `matmaonline.pl`, Enforce HTTPS.
DNS domeny: cztery rekordy `A` (185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
i `CNAME` dla `www` → `damian-barabash.github.io`.

## SEO

- Każda strona ma własny `<head>` (`scripts/prerender.mjs`): title, description, canonical, hreflang, Open Graph,
  dane strukturalne (usługa z ceną, osoba, FAQ), preload czcionek i zdjęcia z pierwszego ekranu.
- `sitemap.xml`, `robots.txt`, `llms.txt`, `manifest.webmanifest` powstają przy budowaniu.
- Obrazki do podglądu linku: `public/og.png` (PL) i `public/og-ru.png` (RU) — `node scripts/og/render.mjs`
  z szablonu `scripts/og/card.html`.
- Weryfikacja w Google Search Console / Bing: zmienne repozytorium `GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`
  (sam kod z metatagu) albo rekord TXT w DNS.
- Po każdym wdrożeniu workflow zgłasza adresy do IndexNow (Bing, Yandex); klucz: `public/indexnow-key.txt`.

## Formularz

Backend nie jest jeszcze podłączony. Na opublikowanej stronie formularz po kliknięciu pokazuje komunikat
„Nie udało się wysłać… zadzwoń” (żeby zapytanie nie przepadło po cichu); tylko `npm run dev` udaje wysyłkę.
Po dodaniu zmiennych repozytorium `VITE_SUPABASE_URL` i `VITE_SUPABASE_ANON_KEY` zapytania pójdą do
funkcji `submit_lead` w Supabase (`src/lib/leads.ts`) — funkcję i tabelę trzeba wtedy utworzyć.

## Zdjęcia ilustracyjne (Unsplash, licencja Unsplash)

- `lesson-online.webp` — photo-1623076189461-f7706b741c04
- `klasy-1-3.webp` — photo-1586694681327-cc2144178860
- `klasy-4-6.webp` — photo-1630983358494-96012d838b84
- `kredki.webp` — photo-1568205612837-017257d2310a
