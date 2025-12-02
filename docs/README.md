# Reddit Light — Minimal Reddit Client (React + Redux)

![HTML5](https://img.shields.io/badge/HTML5-Markup-fff?logo=html5&logoColor=E34F26&style=flat)
![CSS3](https://img.shields.io/badge/CSS3-Styling-fff?logo=css3&logoColor=1572B6&style=flat)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black&style=flat)
![React](https://img.shields.io/badge/React-18%20%2B%20Hooks-61DAFB?logo=react&logoColor=black&style=flat)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State-764ABC?logo=redux&logoColor=white&style=flat)
![CRA](https://img.shields.io/badge/Create%20React%20App-React--Scripts%205-09D3AC?logo=create-react-app&logoColor=white&style=flat)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest&logoColor=white&style=flat)
![RTL](https://img.shields.io/badge/React%20Testing%20Library-Unit%20%2B%20E2E-E33332?style=flat)
![ReactMarkdown](https://img.shields.io/badge/React--Markdown-Comments-000000?style=flat)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white&style=flat)](https://github.com/ArekKrak/jammming)
[![Netlify Status](https://api.netlify.com/api/v1/badges/63652daf-024a-4abd-8982-7f4089b0d695/deploy-status)](https://app.netlify.com/projects/jammming-wapp/deploys)

This app was built as part of the Codecademy *Front-End Web Development* path (**Reddit Client** project).  

**Course Brief (summary):**  
Build a small Reddit Client in React, backed by Redux Toolkit, that lets users browse posts from a few subreddits, search, and view a post's comments in a simple modal.

---

## Overview

**Reddit Light** is a minimal Reddit reader focused on clarity and responsiveness:

- Load posts from a chosen subreddit
- Filter them with a keyword search
- Open an individual post in a modal and read its comments

The app talks to the public `https://api.reddit.com` endpoints, is wired through Redux Toolkit thunks, and comes with unit tests, one end-to-end test, and Lighthouse audits for both mobile and desktop.

   **Status:** Core project requirements implemented (subreddit list, search, comments modal, tests, Lighthouse check).

---

## Features

- **Subreddit sidebar** 
    - Fixed list of starter subreddits (`news`, `python`, `javascript`, `reactjs`).
    - Clicking a name loads fresh posts for that subreddit via the Reddit API.
- **Post feed** 
    - Clean card layout: **subreddit + author**, **title**, and **score/comments count**.
    - Cards are sized to work on both desktop and mobile.
- **Search bar** 
    - Search **within the currently selected subreddit**.
    - Ignores empty/whitespace-only queries to avoid useless requests.
- **Post detail modal with comments** 
    - Clicking a post opens a centered modal showing:
        - Title, subreddit, author
        - Upvotes and comment count
        - **Comments rendered as Markdown** (via `react-markdown`)
    - Overlay backdrop prevents interaction with the page underneath. `Esc` and **Close** button dismiss the modal.
- **Error handling & fallback data** 
    - If `api.reddit.com` responds with a **403** or returns HTML instead of JSON, the app:
        - Surfaces a red error banner at the top (“Couldn’t load fresh data from Reddit…”)
        - Falls back to a small **cached example dataset** so the UI still demonstrates the full view
    - Comments have their own loading/error states inside the modal.
- **Responsive layout**
    - Desktop: sidebar on the left, posts in a main column.
    - Mobile: stacked layout - header, error banner (if any), sidebar, then posts.

---

## Tech Stack

- **React (Create React App)** — component model and JSX.
- **Redux Toolkit** — `createSlice` + `createAsyncThunk` for posts and comments.
- **JavaScript (ES202x)** — functional components and hooks.
- **Reddit public API** — `https://api.reddit.com/r/{subreddit}.json` for posts, `{permalink}.json` for comments.
- **React Markdown** — lightweight rendering of comment bodies.
- **Jest + React Testing Library** — unit tests and a simple end-to-end app flow.
- **CSS** — custom styles with CSS variables for colors, spacing, and radii.

---

## Screens / Flow

- **Subreddit browsing** 
    - Choose a subreddit from the left sidebar.
    - The main feed updates with fresh posts for that subreddit.
- **Searching**
    - Type a keyword into **Search Reddit...** and press **Search**.
    - The post list filters to titles containing the query (case-insensitive).
- **Opening a post**
    - Click on a post card to open the **Post Detail Modal**.
    - The app fetches comments using the post's `permalink`.
    - Comments appear as a list underneath a "Comments" heading.
- **Error scenarios**
    - If posts fail to load (e.g. `403 Blocked` or HTML instead of JSON), the app shows:
        - a banner explaining that fresh data couldn't be loaded.
        - The "cached example posts" so the UI remains usable.
    - If comments fail, the modal shows a friendly error message instead of crashing.

---

## Project Structure

```
m24-reddit-client/
├── docs/                                    # Design docs
│   ├── project-plan.md                         # Part plan
│   └── README.md                               # Project documentation
├── public/                                  # Static assets served as-is
│   ├── index.html                              # CRA entry HTML
│   ├── manifest.json                           # 
│   └── favicon.ico                             # icons...
├── src/                                     # Application source
│   ├── api/                                 # Static assets
│   ├── components/                             # UI components
│   │   ├── App/{.jsx, .css}                       # App state wiring
│   │   ├── SearchBar/{.jsx, .css}                 # Controlled input; "Searching..."
│   │   ├── SearchResults/{.jsx, .csss}             # Results with "+"
│   │   ├── TrackList/{.jsx, .css}                 # Maps tracks → <Track/>
│   │   ├── Track/{.jsx, .css}                     # Row with + / -
│   │   └── Playlist/{.jsx, .css}                  # Name, list, "Saving..."
│   ├── services/                               # API/auth logic
│   │   ├── playlist.js                            # savePlaylistToSpotify(...)
│   │   ├── search.js                              # searchTracks(query)
│   │   └── spotifyAuth.js                         # PKCE + spotifyFetch wrapper
│   ├── index.css                               # Global app styles
│   └── main.jsx                                # React root render
├── .gitignore                               # Ignore node_modules, .env, build output
├── index.html                               # Vite entry HTML (mount point for React)
├── package-lock.json                        # NPM lockfile (commit this)
├── package.json                             # Project metadata, scripts, dependencies
└── vite.config.js                           # Vite config
```

---

## Live Site

**[View the Live Project](https://jammming-wapp.netlify.app/)**

---

## Testing & Debugging

- Manual checklist in **`TESTING.md`** (Search, Add/Remove/Dedup, Save Flow, Auth & Errors).
- **Chrome DevTools** (Network/Offline, Slow 3G) & **React DevTools** for state inspection.

See detailed notes in [TESTING.md](./TESTING.md).

---

## Design Docs

- Part 2: **Exclude Playlist Items from Search Results** — reasoning, tiny diffs, caveats.

---

## Limitations

 - Some API responses are cached (DevTools may show `304` revalidation).
 - Spotify rate limits (429) are rare on dev clients; UI surfaces a friendly error if they occur.
 - Different releases of ”the same song” have different IDs and are treated as distinct — by design.

---

## Future Improvements

- Private playlist support (`playlist-modify-private`) + toggle.
- Debounced search-on-typing with minimal requests.
- Toast notifications instead of alerts.
- Persist in-progress playlist to `sessionStorage`.

---

## Contact
If you're a recruiter, mentor, or fellow developer interested in collaboration or feedback:

**Arek Krakowiak**  
[369arek12@protonmail.com](mailto:369arek12@protonmail.com)

---

Thank you for viewing this project!