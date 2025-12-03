# Reddit Light — Minimal Reddit Client (React + Redux)

![HTML5](https://img.shields.io/badge/HTML5-Markup-fff?logo=html5&logoColor=E34F26&style=flat)
![CSS3](https://img.shields.io/badge/CSS3-Styling-fff?logo=css3&logoColor=1572B6&style=flat)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2023-F7DF1E?logo=javascript&logoColor=black&style=flat)
![React](https://img.shields.io/badge/React-19%20%2B%20Hooks-61DAFB?logo=react&logoColor=black&style=flat)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-State-764ABC?logo=redux&logoColor=white&style=flat)
![CRA](https://img.shields.io/badge/Create%20React%20App-React--Scripts%205-09D3AC?logo=create-react-app&logoColor=white&style=flat)
![Jest](https://img.shields.io/badge/Jest-Testing-C21325?logo=jest&logoColor=white&style=flat)
![RTL](https://img.shields.io/badge/React%20Testing%20Library-Unit%20%2B%20E2E-E33332?style=flat)
![ReactMarkdown](https://img.shields.io/badge/React--Markdown-Comments-000000?style=flat)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-181717?logo=github&logoColor=white&style=flat)](https://github.com/ArekKrak/m24-reddit-client)
[![Netlify Status](https://api.netlify.com/api/v1/badges/63652daf-024a-4abd-8982-7f4089b0d695/deploy-status)](https://app.netlify.com/projects/reddit-light/deploys)

This app was built as part of the Codecademy *Front-End Web Development* path (**Reddit Client** project).  

**Course Brief (summary):**  
Build a small Reddit Client in React, backed by Redux Toolkit, that lets users browse posts from a few subreddits, search, and view a post's comments in a simple modal.

---

## Overview

**Reddit Light** is a minimal Reddit reader focused on clarity and responsiveness:

- Load posts from a default subreddit (`r/news`)
- Switch to other popular subreddits from the sidebar
- Use the search bar to load posts from any subreddit by name
- Open an individual post in a modal and read its comments

The app talks to the public Reddit API via a Create React App proxy to `https://www.reddit.com`, is wired through Redux Toolkit thunks, and comes with unit tests plus one integration-style test that exercises the main user flow.

   **Status:** Core project requirements implemented (subreddit list, search, comments modal, tests, basic rate-limit handling and responsive layout).

---

## Features

- **Subreddit sidebar** 
    - Fixed list of starter subreddits (`news`, `python`, `javascript`, `reactjs`).
    - Clicking a name loads fresh posts for that subreddit via the Reddit API.
    - On small screens, the sidebar becomes a full-width section above the posts.
- **Post feed** 
    - Clean card layout: **subreddit + author**, **title**, and **score/comments count**.
    - Cards are sized and spaced to work on both desktop and mobile.
    - Hover animations (lift + shadow) to make the list feel more tactile.
- **Search bar** 
    - Search input in the header treats the term as a **subreddit name**:
        - e.g. typing `reactjs` and pressing **Search** or hitting **Enter** loads posts from `r/reactjs`.
    - Trims surrounding whitespace ( `" python "` → `"python"` ).
    - Ignores empty/whitespace-only queries to avoid useless requests.
- **Post detail modal with comments** 
    - Clicking a post opens a centered modal showing:
        - Title, subreddit, author
        - Upvotes and comment count
    - The modal dispatches a thunk to fetch comments by `permalink`:
        - Reddit's `[postListing, commentsListing]` structure is mapped to a flat array of comment objects.
        - **Comments rendered as Markdown** (via `react-markdown`).
    - The comments area:
        - Shows `"Loading comments..."` while fetching.
        - Shows a friendly error message if the request fails.
        - Shows `"No comments to display."` if the request succeeds but returns no comments.
    - Overlay backdrop prevents interaction with the page underneath. `Esc` and **Close** button dismiss the modal.
- **Error handling & fallback data** 
    - If `www.reddit.com` responds with a **403** or returns HTML instead of JSON, the app:
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
- **React Redux** — hooks (`useSelector`, `useDispatch`) for store access in components.
- **JavaScript (ES202x)** — functional components and hooks.
- **Reddit public API** — `https://www.reddit.com/r/{subreddit}.json` for posts, `{permalink}.json` for comments.
- **React Markdown** — lightweight rendering of comment bodies.
- **Jest + React Testing Library** — unit tests and a simple end-to-end app flow.
- **CSS** — custom styles with CSS variables for colors, spacing, and radii.

---

## Screens / Flow

- **Subreddit browsing** 
    - Choose a subreddit from the left sidebar.
    - The main feed updates with fresh posts for that subreddit.
- **Searching**
    - Type a subreddit name into **Search Reddit...** and press **Search**.
    - The app dispatches `fetchPostsForSubreddit(term)` and shows posts from that subreddit.
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

## Wireframes

The initial layout was sketched as:

- Header with title and search bar at the top
- Left sidebar card listing subreddits
- Main column of post cards
- Centered modal for post details and comments

---

## Project Structure

```
m24-reddit-client/
├── docs/
│   ├── project-plan.md                         # Part plan
│   └── README.md                               # Project documentation
├── public/
│   ├── index.html                              # CRA entry HTML
│   ├── manifest.json                           # Web app manifest: icons, theme, display/start URL
│   └── favicon.ico                             # icons...
├── src/
│   ├── api/
│   │   ├── reddit.js                           # fetchSubredditPosts + fetchCommentsForPost
│   │   └── reddit.test.js                      # Testing suite
│   ├── app/                                 
│   │   └── store.js                            # Redux store configuration (registers the `posts` slice)
│   ├── features/
│   │   ├── Header/
│   │   │   ├── Header.js                       # Header with app title and controlled search input
│   │   │   ├── Header.css                      # Layout + responsive styles for the header/search bar
│   │   │   └── Header.test.js                  # Tests for trimming input and ignoring blank searches
│   │   ├── PostList/
│   │   │   ├── PostList.js                     # Renders a list of PostCard components
│   │   │   ├── PostList.css                    # Layout styles for the posts column
│   │   │   ├── PostList.test.js                # Tests that it renders cards / handles empty list
│   │   │   ├── PostCard.js                     # Single post card (subreddit, author, title, stats)
│   │   │   ├── PostCard.css                    # Card styling + hover animation
│   │   │   ├── PostCard.test.js                # Tests for the card's text and heading structure
│   │   │   ├── PostDetailModal.js              # Modal for a selected post (details + comments)
│   │   │   ├── PostDetailModal.css             # Modal layout, backdrop, animations, scroll area
│   │   │   ├── postsSlice.js                   # Redux slice + thunks for posts and comments
│   │   │   └── postsSlice.test.js              # Tests for slice reducers and thunk lifecycle
│   │   └── SubredditList/
│   │       ├── SubredditList.js                # Sidebar listing starter subreddits
│   │       ├── SubredditList.css               # Sidebar card styling + hover effects
│   │       └── SubredditList.test.js           # Tests that it renders "Subreddits" and r/name items
│   │
│   ├── App.js                   # Top-level layout: header, sidebar, posts, modal logic
│   ├── App.css                  # Global layout pieces (grid, error banner, spinner, buttons)
│   ├── index.js                 # React entry point; creates root and wraps App in <Provider>
│   ├── index.css                # Global typography, colours, and CSS variables
│   ├── App.e2e.test.js          # Integration-style test for load > search > open modal > comments
│   └── setupTests.js            # Jest / RTL setup (adds custom matchers from @testing-library/jest-dom)
│
├── package.json                               # Project metadata, CRA scripts, dependencies
└── package-lock.json                          # Exact dependency versions for reproducible installs
```

---

## Live Site

**[View the Live Project](https://reddit-light.netlify.app/)**

---

## Testing & Quality

### Unit / integration tests
All tests are written with **Jest** and **React Testing Library**.
- **API layer**
    - `reddit.test.js`
        - Verifies that fetchSubredditPosts:
            - Hits the correct URL for a given subreddit.
            - Maps Reddit's `children[].data` shape to a flat array of post objects.
            - Throws a helpful error when the HTTP status isn't OK.
- **Components**
    - `Header.test.js`
        - Calls `onSearch` with **trimmed text**.
        - Does not call `onSearch` for empty / whitespace-only input
    - `PostCard.test.js`
        - Renders subreddit + author line, title in an `<h3>`, and the footer "X upvotes • Y comments".
    - `PostList.test.js`
        - Renders one `PostCard` per post in the array.
        - Renders nothing when `posts` is empty.
    - `SubredditList.test.js`
        - Renders "Subreddits" heading.
        - Lists each subreddit as `r/name`.
- **Redux slice**
    - `postsSlice.test.js`
        - Initial state when reducer is called with `undefined`.
        - `setPosts`, `setStatus`, and `setError` reducers.
        - Thunk lifecycle:
            - `fetchPostsForSubreddit.pending` sets `status: "loading"` and remembers `currentSubreddit`.
            - `.fulfilled` → `status: "succeeded"` and updates `items`.
            - `.rejected` → `status: "failed"` and stores the error message.

### End-to-end flow test
- `App.e2e.test.js`
    - Mocks `./api/reddit.js` (posts + comments) and stubs `react-markdown`.
    - Renders the real `<App />` wrapped in the real Redux store.
    - Covers the full user journey:
        1. Initial load shows the mocked `"News post"` from `r/news`.
        2. User types `"reactjs"` into **Search Reddit...** and clicks **Search**.
        3. `"React post"` appears in the feed.
        4. User clicks `"React post"` → modal opens.
        5. Modal shows a **Comments** heading and the mocked comment body.

### Lighthouse
Chrome DevTools Lighthouse audits (run against the local dev server):
- **Mobile**
    - Performance: **75**
    - Accessibility: **100**
    - Best Practices: **100**
    - SEO: **100**
- **Desktop**
    - Performance: **99**
    - Accessibility: **100**
    - Best Practices: **100**
    - SEO: **100**

The remaining performance on mobile is mostly down to JavaScript execution and dev-build overhead; for a production build hosted with caching, these numbers would typically improve.

---

## Design Notes

- Layout built with **flexbox** and fixed max-widths for readability.
- Color palette:
    - Dark background (`--color-bg`) with slightly lighter surfaces for cards and sidebar.
    - High-contrast text colors chosen to satisfy Lighthouse accessibility checks.
- Modal:
    - Uses a full-viewport backdrop (`.modal-backdrop`) and a centered panel (`.modal-content`).
    - Designed to be keyboard friendly and easy to dismiss.

---

## Limitations

- **Public Reddit API instability**
    Occasionally, the public Reddit endpoint responds with errors or unexpected HTML pages instead of JSON. When this happens:
    - The app surfaces a clear error banner.
    - If no posts are available yet, it falls back to a small cached dataset.
- **Fixed subreddit list**
    The sidebar currently uses a fixed shortlist of subreddits rather than a full "discover" experience.
- **Read-only client**
    The app does not support voting, posting, or authenticated features. It's designed as a simple reader.

---

## Future Improvements

- Let users add custom subreddits beyond the initial four.
- Load more than the first page of posts (e.g. "Load more", or infinite scroll).
- Show basic **post metadata** in the modal (e.g. link to the original Reddit post).
- Replace the basic error banners with reusable, dismissible toast messages.

---

## Contact
If you're a recruiter, mentor, or fellow developer interested in collaboration or feedback:

**Arek Krakowiak**  
[369arek12@protonmail.com](mailto:369arek12@protonmail.com)

---

Thank you for viewing this project!