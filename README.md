# Let's Speak Up — online version (English / French)

A digital adaptation of the *Let's Speak Up* card game on psychological safety,
for **3–6 players plus a facilitator**. The active player combines a Role, a
Context and a Statement card, acts the line out, and everyone rates whether it
**promotes** or **hinders** psychological safety. Points go to the active player
for every teammate who read their intention correctly.

- **Live:** https://lets-speak-up-work-1.onrender.com
- **Directly in French:** https://lets-speak-up-work-1.onrender.com/?lang=fr
- Meant for facilitated training sessions only — the group plays it alongside a
  video call, where the acting actually happens.

## How a session runs

1. Everyone opens the link. One person enters a name and **creates a room**; the
   others **join** with the six-character room code. The facilitator joins as an
   observer via `/facilitator/<ROOM CODE>`.
2. The host starts the game once 3–6 players are in.
3. The active player gets 1 Role card, 1 Context card and 4 Statement cards,
   picks one of each, and rates their own intention secretly (**Promotes** /
   **Hinders**). A 10-minute timer starts.
4. The others rate the same set. Then the round result shows who matched, and
   the active player earns a point per match.
5. **Next Round** hands the turn to the next player.

Nothing is stored. When everyone leaves, the room is gone.

## Languages

There is one link for both languages. The **EN | FR** switch sits in the top
right of every screen; each person chooses for themselves, so a French-speaking
and an English-speaking player can sit in the same room. The choice is
remembered in that browser, and `?lang=fr` at the end of the link opens the app
in French straight away.

The cards are always dealt in English by the server and translated in the
browser, which is what makes the mixed-language room possible.

| What | Where |
|---|---|
| The card texts (English — the source of truth) | `server/storage.ts`, `deckValues`: deck 1 = 18 statements, deck 2 = 22 roles, deck 3 = 16 contexts |
| The card texts (French) | `client/src/i18n/cards.fr.ts` — keyed by the exact English text |
| All interface text, both languages | `client/src/i18n/strings.ts` (`en` and `fr` blocks) |
| Error messages the server sends, in French | `SERVER_FR` at the bottom of `strings.ts` |
| The language switch itself | `client/src/i18n/index.tsx` |

**If you change or add a card**, change it in `server/storage.ts` *and* add the
same English text as the key in `cards.fr.ts` with its French translation —
otherwise French players see that one card in English.
**If you add an interface text**, add the key to both the `en` and the `fr`
block; placeholders like `{name}` must appear in both.

The French wording comes from the agreed translation document
(*LetsSpeakUp_Game-Text_EN-FR.docx*), taken over as delivered.

## Running it locally

```
npm install
PORT=5050 npm run dev      # then open http://localhost:5050
```

Port 5000 is taken by AirPlay on macOS, hence the `PORT=5050`.
To try a real session, open several tabs (or private windows): one creates the
room, the others join with the code.

## How it is deployed

Render Web Service, runtime **Node**:

- Build command: `npm install && npm run build`
- Start command: `npm start`
- No environment variables, no database.

Every push to `main` triggers a new deployment automatically (about 3 minutes).
The service runs on the team's own Render account — see `RENDER-SETUP.md` for
how it is set up and what to do when a deployment misbehaves.

> **An older copy may still answer at https://lets-speak-up-work.onrender.com.**
> That one belongs to the previous maintainer's personal account, receives no
> updates and will disappear. Always share the link at the top of this page.

## Where this code comes from

The original game was built by **greg-afk**
([github.com/greg-afk/letsspeakup](https://github.com/greg-afk/letsspeakup)) and
runs at `letsspeakup.onrender.com`. This repository started as a copy of it.

- Improvements made here (6 players, scoring, 10-minute timer, reconnect fix,
  bigger cards) were contributed back and **merged** into the original in
  July 2026.
- The **French version has not been contributed back yet.** A ready-made branch
  called `french-language-switch` sits in the fork
  [`Helti2636/letsspeakup`](https://github.com/Helti2636/letsspeakup), based on
  the original's current `main` and free of conflicts. If you want French on the
  original link too, open a pull request from that branch to
  `greg-afk/letsspeakup`.

  Note that this fork belongs to the previous maintainer's personal account and
  may disappear one day. That loses nothing: the French version itself lives in
  this repository, so the same pull request can be rebuilt from here at any
  time. Otherwise, simply keep using the version in this repository.

## Good to know

- **Free hosting:** the first visit after a quiet period takes ~30 seconds while
  the server wakes up. Open the link a minute before a workshop starts.
- **No database, on purpose.** Scores exist only while the room is open.
- Players who lose their connection can rejoin with the same name and keep their
  seat and score.
- The 10-minute timer turns red at zero and stops there; it never acts on its
  own.
- A `PostCSS ... 'from' option` warning during the build is harmless and has
  always been there.

## Where things live

```
client/src/pages/        start page, game, facilitator view
client/src/components/   cards, player list, rating panel, results, timer
client/src/i18n/         English + French texts and the language switch  ← start here for wording
shared/schema.ts         the shape of the game state
server/routes.ts         the live connection (Socket.IO events)
server/storage.ts        rooms, decks, scoring — and the English card texts
```

## Handover

See **`HANDOVER.md`** (what you are taking over and how to change things) and
**`RENDER-SETUP.md`** (the hosting, which still needs an owner).
