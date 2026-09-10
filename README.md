# Akbope — graphic & digital design portfolio

A static, bilingual portfolio. Original graphic artwork is preserved in `public/assets`; only selected work appears on the homepage.

## Build and preview

Run `node build.mjs` to validate the catalogue, generate the seven case-study pages and build `dist/`. Run a local static server in the project root to preview the source, or in `dist/` to preview the deployable output. No package installation is needed.

Hosting uses the existing project in `.openai/hosting.json`. The same `dist/` output is also portable to another static host.

## Replace a project later

1. Add optimised artwork to `public/assets/`.
2. Edit one entry in `portfolio-data.js`. Its position in the array controls homepage order; keep six or seven entries.
3. Give it a stable, unique `key`, accurate project type and English (`en`) and Kazakh (`kk`) copy. `kind: 'concept'` identifies independent graphic studies; `kind: 'self'` identifies self-initiated products. Add only verified years, tools, deliverables and live links.
4. Set its category to `brand`, `campaign`, `digital` or `experimental`.
5. Run the build. Pages in `projects/` are generated from the catalogue and `case-render.js`; edit those source files rather than generated HTML. Old assets can remain archived locally.

`script.js` contains homepage translations and interactions. `case-render.js` and `case.js` provide the shared case-study layout and language switch. `portfolio.css` extends the established styles without replacing the original visual identity.

## Current selection

Sushi Social Club · Mountain · Claude Magazine · Agylshyn · Macaroon Club · Kök Coffee · Type & Feeling.

Kök Coffee remains an early brand exploration. Type & Feeling collects two independent posters. Future full branding projects can replace these without a layout redesign. No future project is presented as completed work.

## Content provenance

Mountain and Agylshyn use captures of the live URLs provided by Akbope, collected in September 2026. Product descriptions follow the visible interfaces; unverified usage, business outcomes and technical integrations are omitted. Mountain credits the Project Gutenberg catalogue without claiming an unverified API implementation.

The contact section uses the established Telegram contact. An email address and named design-tool list are pending the owner's confirmation. The CV is a two-page summary with the same positioning and live product links.

## Validation

The build checks JavaScript syntax, case-study data in both languages, every local link and image, unique project keys and the seven-project limit. Responsive and interaction checks are performed against the built site at 375, 390, 430, 768 and 1440 pixels before publication.
