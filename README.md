# Akbope — graphic design portfolio

A static, bilingual portfolio. Original graphic artwork is preserved in `public/assets`; only selected work appears on the homepage.

## Build and preview

Run `node build.mjs` to validate the catalogue, generate the five case-study pages and build `dist/`. Run a local static server in the project root to preview the source, or in `dist/` to preview the deployable output. No package installation is needed.

Hosting uses the existing project in `.openai/hosting.json`. The same `dist/` output is also portable to another static host.

## Replace a project later

1. Add optimised artwork to `public/assets/`.
2. Edit one entry in `portfolio-data.js`. Its position in the array controls homepage order; keep six graphic-design entries or fewer.
3. Give it a stable, unique `key`, accurate project type and English (`en`) and Kazakh (`kk`) copy. `kind: 'concept'` identifies independent graphic studies; `kind: 'self'` identifies self-initiated products. Add only verified years, tools, deliverables and live links.
4. Set its category to `brand`, `campaign`, `digital` or `experimental`.
5. Run the build. Pages in `projects/` are generated from the catalogue and `case-render.js`; edit those source files rather than generated HTML. Old assets can remain archived locally.

`script.js` contains homepage translations and interactions. `case-render.js` and `case.js` provide the shared case-study layout and language switch. `portfolio.css` extends the established styles without replacing the original visual identity.

## Current selection

Type & Feeling · Sushi Social Club · Claude Magazine · Macaroon Club · Kök Coffee.

Kök Coffee remains an early brand exploration. Type & Feeling collects three independent posters, including the LNGSHOT music artwork. Future full branding projects can replace these without a layout redesign. No future project is presented as completed work.

## Content provenance

The contact section uses the established Telegram contact. An email address and named design-tool list are pending the owner's confirmation. The CV is a two-page graphic-design summary with the same project selection.

## Validation

The build checks JavaScript syntax, case-study data in both languages, every local link and image, unique project keys and the six-project limit. Responsive and interaction checks are performed against the built site at 375, 390, 430, 768 and 1440 pixels before publication.
