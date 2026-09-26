# Collectible Card · 球星卡

**[中文](README.md)** | English

![Platform](https://img.shields.io/badge/platform-modern%20browser-1f6feb)
![Dependencies](https://img.shields.io/badge/dependencies-0-3fb950)
![Question bank](https://img.shields.io/badge/question%20bank-160-f0b429)
![Storage](https://img.shields.io/badge/storage-localStorage-8957e5)

> Turn employee capability data into collectible "star cards" you can collect, compare, and combine into teams.

**Collectible Card** is a zero-dependency, open-in-browser talent-review tool. It profiles every person across **5 dimensions and 20 sub-dimensions** (0–10 scale), turns each profile into a "star card" with a 20-axis radar, and lets you build team decks, run a 160-question self-assessment, analyze team synergy, auto-compose teams, and compare people or teams head-to-head — all in both Chinese and English.

> **Inspiration**
> This project draws on ideas from two books, plus my own interpretation:
> - **Ray Dalio's _Principles_** — his Bridgewater "baseball cards": a capability profile for every employee, backed by peer scoring and believability-weighted decision-making, so choosing and staffing people is grounded in shared data rather than gut feel.
> - **Brian Fetherstonhaugh's _The Long View_** — a career as a ~45-year marathon powered by three kinds of "career fuel": **transferable skills, meaningful experiences, and enduring relationships**. The "enduring relationships" — your career ecosystem of **Contacts / Experts / Key Colleagues / Supporters**, plus **Yourself** — map directly onto each card's **Identity** field.
>
> This project packages those two ideas into a tool you can actually use.

## Contents

- [Why this exists](#why-this-exists)
- [Features](#features)
- [Screenshots](#screenshots)
- [Quick start](#quick-start)
- [Usage guide](#usage-guide)
- [Scoring model](#scoring-model)
- [Data & privacy](#data--privacy)
- [Project structure](#project-structure)
- [Tech stack](#tech-stack)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## Why this exists

It serves two kinds of people:

- **Owners / leads of small companies and teams.** Dalio's "baseball card + idea meritocracy + believability weighting" approach to talent management sounds great, but small teams have neither the system nor the headcount to build one. This tool compresses "profile everyone, score each other, staff by card" into something that runs with zero install and zero dependencies.
- **Anyone who cares about their own career.** _The Long View_ says a career is a 45-year marathon — don't run out of fuel mid-way. You keep accumulating **transferable skills, meaningful experiences, and enduring relationships**. These cards capture exactly that: the 20 sub-dimensions describe transferable skills, the yearly cards track accumulation over time, and the **Identity** field maps your career ecosystem (Contacts / Experts / Key Colleagues / Supporters) onto the card.

In practice, talent review usually breaks down in three places:

1. **Conclusions get lost in spreadsheets and decks.** A review cycle ends as rows of Excel, forgotten by next quarter.
2. **Subjective judgments have no shared frame of reference.** "He's a good communicator," "she's great at execution" — no scale, no comparison group, everyone talking past each other.
3. **Team composition is guesswork.** Who complements whom, and where the team's collective blind spots are, is hard to see without data.

Collectible Card compresses all three into a single card: the card is the carrier, the 20 sub-dimensions are the scale, and decks + PK are the comparison group. Because cards accumulate year over year, "growth" leaves a trace too.

## Features

| Module | What it does |
| --- | --- |
| **Landing** | Dark vortex-particle entry — "Enter Collection" or "Enter Assessment" |
| **Hub** | Three entry cards (Cards / Team Decks / PK Analysis) with live previews of the top score, featured deck, and top matchup |
| **Cards** | 5 dimensions × 20 sub-dimensions (0–10, 0.1 step), overall score + D/C/B/A/S grade; double-sided cards (front: radar + sub-scores; back: growth line chart, leadership-potential range, notes); per-person identity, photo (drag to pan, scroll to zoom), yearly cards, "cards by year" view |
| **Self-Assessment** | Built-in 160-question bank; each test randomly draws 80 questions (4 per sub-dimension) on a 7-point Likert scale; results write back to a person's card for a chosen year and are tagged by source |
| **Team Decks** | Mosaic covers from member photos, 👑 Leaders (up to 2) with a leader weight, each member pinned to a specific year's card |
| **Team Analysis** | Team-weighted radar + three KPIs (Spread, Complementarity, Weakness Risk), plus auto-generated insights on complementary strengths, redundancies, weaknesses, and conflicts — with a "linkage rules" page explaining the logic |
| **Smart Team-Up** | Pick a team size (3–6), optionally anchor around someone, and slide between "complementary coverage" and "strength stacking"; results come with KPIs and reasoning and can be saved as a deck |
| **PK Analysis** | Solo PK and Team PK: two cards plus an overlaid radar; significant leads (≥1.5 on a sub-dimension) are called out; team mode adds Key Players, Team DNA, and Top-N gap analysis |
| **Growth view** | A person's score trend across years, alongside the back-of-card growth line and leadership-potential range |
| **Data management** | One-click JSON export/import (versioned, field-validated), clear-all, and built-in demo data to explore with |
| **Bilingual** | Switch 中文 / English in Settings (or append `?lang=en` to the URL); every dimension, sub-dimension, question, and UI string is translated |

## Screenshots

| Landing | Hub |
| --- | --- |
| ![Landing](docs/screenshots/01-landing.png) | ![Hub](docs/screenshots/02-hub.png) |

| Card collection | Card detail · front |
| --- | --- |
| ![Collection](docs/screenshots/03-collection.png) | ![Card front](docs/screenshots/04-detail-front.png) |

| Card detail · back (growth + leadership) | Self-Assessment |
| --- | --- |
| ![Card back](docs/screenshots/05-detail-back.png) | ![Assessment](docs/screenshots/06-assessment-intro.png) |

| Team analysis (KPI + insights) | Solo PK |
| --- | --- |
| ![Team](docs/screenshots/07-team.png) | ![Solo PK](docs/screenshots/08-pk.png) |

| Team PK | Smart Team-Up |
| --- | --- |
| ![Team PK](docs/screenshots/10-team-pk.png) | ![Smart team](docs/screenshots/09-smart-team.png) |

## Quick start

No install, no build, no third-party dependencies.

**Option 1 — open the file directly**

```
Double-click src/index.html to open it in a browser.
```

**Option 2 — serve locally (recommended, avoids some browsers' local-file restrictions)**

```bash
git clone https://github.com/alexwongchintong-arch/collectible-card.git
cd collectible-card
python3 -m http.server 8000
# then open http://localhost:8000/src/index.html
```

**Option 3 — use it online (already deployed)**

The project is deployed on GitHub Pages — open it directly: **https://alexwongchintong-arch.github.io/collectible-card/** (the root `index.html` redirects into the app). All data stays in your own browser's localStorage; nothing is uploaded anywhere.

Browsers: a recent Chrome / Edge / Safari / Firefox (needs ES6+ and Canvas).

**About the demo data:** on first launch the app seeds **6 fictional people** (张三 / 李四 / 王五 / 赵六 / 孙七 / 周八, 8 cards total) and **3 demo decks** (`示例卡组`, `围绕周八的团队`, `智能组队`) so you can try team analysis, smart team-up, and team PK right away. Names and scores are fictional and unrelated to any real person; the avatars are three project-provided placeholders (replace `src/assets/avatars/` with your own images, or upload photos directly on a card — they stay in your browser only). To start fresh, use **Settings → Clear Data**.

## Usage guide

1. **Create a card**: in the collection, click "＋ New Card", enter a name, pick an Identity (tap "+ Identity" on the card), and optionally upload a photo (drag to pan, scroll to zoom).
2. **Score it** — two ways:
   - **Manual**: click "✏️ Edit Scores" on the card and drag the sliders for the 20 sub-dimensions (0–10).
   - **Self-Assessment**: click "📖 Assessment", answer 80 questions (7-point scale), and the result is written back to a person's card for a chosen year.
3. **Flip the card**: the back shows the growth line chart, the leadership-potential reference range, and "📝 Observation Notes". Click "📂 N cards" to flip through yearly cards, or "📈 Growth" for the trend view.
4. **Build & analyze a deck**: in "Team Decks", create a deck, pick members (one card each) and optional 👑 Leaders with a weight; open it to see the weighted radar, KPIs, and insights — or use "✨ Smart Team-Up" to let the tool compose a team for you.
5. **PK**: in "PK Analysis", pick two people (or two decks) to see the overlaid radar and each side's standout strengths.

## Scoring model

**5 dimensions × 20 sub-dimensions** (each scored 0–10, 0.1 step)

| Dimension | Sub-dimensions |
| --- | --- |
| Motivation & Energy | Achievement Drive · Power Motivation · Affiliation Motivation · Vitality |
| Thinking & Decisions | Innovativeness · Insight · Rationality · Decisiveness |
| Emotional Maturity | Optimism · Stress Tolerance · Emotional Stability · Adaptability |
| Interpersonal Interaction | Social Confidence · Willingness to Influence · Empathy · Supportiveness |
| Task Execution | Organization · Prudence · Responsibility · Willpower |

Each sub-dimension also has low/high anchor descriptions (see "📖 Dimension Guide" on a card).

**Overall score (0–100)** uses a radar-area method: connect the 20 sub-dimension scores into a 20-gon, compare its area to the full-score 20-gon, take the square root of the ratio and multiply by 100:

```
score = round( sqrt( area / areaFull ) * 100 )
```

**Grade**

| Overall | ≤30 | ≤50 | ≤70 | ≤85 | >85 |
| --- | --- | --- | --- | --- | --- |
| Grade | D · Developing | C · Growing | B · Good | A · Excellent | S · Outstanding |

**Assessment scoring**

- The bank has 160 questions across the 20 sub-dimensions (8 each); the 8th question of every sub-dimension is **reverse-scored** (20 in total).
- Each test randomly draws 4 questions per sub-dimension (80 total), shuffled, on a 7-point Likert scale (Agree 7 … Disagree 1).
- Reverse questions are scored as `8 - raw`; a sub-dimension's score = `((mean - 1) / 6) × 10` (1 decimal), so it lands on the same 0–10 scale as manual scores.
- Manual scores and assessment scores are **stored on separate tracks**; the card shows which source is currently displayed, so self-view and external view can be compared.

> ⚠️ **About the question bank and results**
> The 160 questions were **generated by AI working backward from the 20 sub-dimensions** (first deciding which dimensions and sub-abilities to measure, then writing statements for each). They are original content, **not** a validated psychometric instrument: reliability and validity are untested. Scores are meant as a starting point for team conversation and self-reflection — **do not** use them as a basis for hiring, promotion, transfer, performance, or layoff decisions. Treat them as a "business card" for discussion, not a verdict.

## Data & privacy

All data lives only in your own browser's `localStorage`. **No backend, no accounts, no tracking.** The page requests no external resources (system font stack + emoji icons), so it works fully offline.

| Key | Contents |
| --- | --- |
| `star-card-data-v2` | People and cards |
| `star-card-groups-v1` | Team decks |
| `pk-insight-width` | PK page UI preference |
| `cc-lang` | Interface language (zh / en) |

Exported backup structure:

```json
{
  "version": 2,
  "people": [
    { "id": "...", "name": "张三", "identity": "你自己",
      "photo": null, "photoOffset": 0, "photoScale": 1,
      "cards": [ { "year": 2026, "scores": { "...": {} }, "assessmentScores": null,
                   "refMin": 4, "refMax": 8, "leadershipNote": "" } ] }
  ],
  "cardGroups": [
    { "id": "...", "name": "示例卡组", "leaderWeight": 1.2,
      "leaders": ["..."], "selections": [ { "personId": "...", "year": 2026 } ] }
  ]
}
```

> ⚠️ Local data means **switching browsers, clearing cache, or changing computers loses it**. Make a habit of **Settings → Export** backups. Don't rename the `localStorage` keys — that breaks compatibility with existing data.

## Project structure

```
collectible-card/
├── index.html               # GitHub Pages entry (redirects to src/index.html)
├── .nojekyll                # Skip Jekyll processing on Pages
├── src/
│   ├── index.html           # The app: HTML + CSS + JS in one file
│   ├── question-bank.js     # 160-question bank (20 sub-dimensions × 8)
│   ├── i18n.js              # Chinese–English dictionary (UI strings)
│   └── assets/avatars/      # Demo avatars (replaceable)
├── docs/
│   └── screenshots/         # Screenshots used in the READMEs
├── README.md                # 中文 README
├── README.en.md             # English README (this file)
├── LICENSE                  # MIT
└── CLAUDE.md                # Notes for AI coding assistants
```

> The design-exploration mockups (`ui-mockups/`, several `*-preview.html`) and raw assets from development are intentionally **not** published in this repo.

## Tech stack

- **Single-file app**: `src/index.html` holds inline CSS and JS; only the question bank and the i18n dictionary are separate files. No framework, no build, no CDN.
- **Canvas 2D**: the 20-axis radar is rendered in several modes (detail / plain / mini / team); the card back has a growth line chart with a reference band.
- **SVG + requestAnimationFrame**: the landing vortex particles; radial-gradient breathing background on view switches.
- **localStorage + JSON import/export**: exports are versioned; imports are field-validated and backward-compatible with the older flat format.
- **Native drag & mouse events**: card ordering, deck membership, photo pan/zoom.
- **Responsive**: breakpoints at 780px and 1200px.

## Known limitations

- **Single machine, single browser**: no accounts, no cloud sync, no collaboration — the only way to share data is exporting/importing JSON.
- **The assessment is not a professional instrument**: AI-generated questions, self-reported Likert answers, no norms or percentiles, untested reliability/validity. Compare people cautiously; it's a conversation starter, not a decision basis.
- **Mobile is only breakpoint-adapted**: dragging and photo panning rely on mouse events; touch support is not finished.
- **No automated tests**: `tests/` is empty; verification is manual for now.
- **Single-file architecture**: great for sharing, but harder to maintain and collaborate on long-term.

## Roadmap

- [ ] Assessment norms / percentiles so scores are comparable across people
- [ ] Export cards as images / PDF for review materials
- [ ] Multi-rater scoring with believability-weighted aggregation
- [ ] Full touch support for mobile
- [ ] Split the source into modules and add minimal regression tests for scoring

> Still under active development (latest update: 2026-09).

## Contributing

Issues and PRs are welcome. The workflow is simple:

1. Edit `src/index.html` (or `question-bank.js` / `i18n.js`) and just refresh the browser — there's no build step.
2. Before submitting, walk the main flow once: new card → score/assess → deck → team analysis → PK.
3. Don't rename the `localStorage` keys or the export-file `version` field, to keep existing users' data compatible.
4. Please include screenshots for UI changes.

## Acknowledgements

- Ray Dalio, _Principles_ — the "baseball card" talent profile and idea-meritocracy, believability-weighted decision-making;
- Brian Fetherstonhaugh, _The Long View_ — the three kinds of career fuel (transferable skills / meaningful experiences / enduring relationships) and the career-ecosystem relationships (Contacts / Experts / Key Colleagues / Supporters), which became the card's Identity field;
- Demo names and scores are fictional and for demonstration only; the three demo avatars are author-provided (one real photo, two procedurally generated abstract images).

## License

This project is open-sourced under the [MIT License](LICENSE) — feel free to reference, modify, and build on it; just keep the copyright and license notice.
