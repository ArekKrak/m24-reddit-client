# PROJECT GOAL

Build a responsive Reddit client using React and Redux that lets users browse popular posts, search Reddit, filter by subreddit, and view post details with comments (including Markdown rendering) provided by Reddit API. The app will be tested, deployed, and optimised to score 90+ on Lighthouse (except media-related performance).

## TECH STACK - WHAT IT'S BUILT WITH

- Frontend: React (CRA), React Router (for detail view), CSS (plain, modules, maybe a small utility library later).
- State management: Redux Toolkit + React-Redux.
- API layer: Reddit JSON API via a small wrapper (src/api/reddit.js).
- Markdown: a React Markdown renderer (e.g. react-markdown) later on.
- Testing:
	- Unit/component tests: Jest + React Testing Library.
	- End-to-end: most likely Selenium.
- Tooling: Git + GitHub repo + GitHub Projects.
- Deployment: Netlify / GitHub Pages.
- Monitoring quality: Chrome DevTools + Lighthouse + Redux DevTools.

## MINIMUM VIABLE PRODUCT - FEATURE LIST:

1. Initial feed:
	- On first load, show a list of posts (e.g. `/r/news`).
2. Search:
	- Search box to query Reddit (`/search.json?q=...`).
	- Show results in the same post list view.
3. Filter by predefined categories:
	- A sidebar or header with a fixed list of subreddits (e.g. `r/python`, `r/javascript`, `r/reactjs`).
	- Clicking a subreddit reloads the list for that subreddit.
4. Post detail view with comments:
	- Click a post → open a modal or navigate to `/post/:id`.
	- Shows the post plus comments loaded from the JSON API.
	- Comments render Markdown correctly.
5. Basic UX states:
	- Loading indicators for posts & comments.
	- Error message if the API fails / rate limited, with a "try again" button.
6. Responsive layout:
	- Works on phone, tablet, desktop (not necessarily fancy, but usable).
7. Deployment & Lighthouse:
	- Deployed to a live URL.
	- 90+ scores except possible hit on Performance because of Reddit media.
	
## NATURAL BREAK POINTS - MY ROADMAP	

1. Base setup & cleanup:
	- CRA + Redux template clean.
	- Project repo + GitHub Project board created.
2. Reddit API layer:
	- Create `src/api/reddit.js`.
	- Functions like `getPopularPosts()`, `searchPosts(term)`, `getPostWithComments(permalink)`.
3. Redux slices & store:
	- `posts` slice for the main feed / search.
	- `subreddits` slice for sidebar filters (optional at first; list can be hardcoded).
	- Possibly a small `ui` slice for global loading/error later.
4. Core UI layout:
	- Header (search bar + title).
	- Main area: posts list + (optional) subreddit sidebar.
	- Basic post card UI.
5. Search & filters:
	- Hook search input to `posts` slice with a thunk.
	- Hook subreddit clicks up to fetch different feeds.
6. Post detail + comments:
	- Routing or modal.
	- Thunk to fetch comments.
	- Basic Markdown rendering.
7. Error & loading flows:
	- Show spinners / skeletons.
	- Show error message + retry.
	- Handle reddit rate limits gracefully.
8. Design polish & animations:
	- Cohesive styles (colors spacing, typography).
	- Small transitions (hover, loading transitions).
9. Testing & quality:
	- Unit tests for critical reducers and components.
	- At least one end-to-end flow (load → search → open post).
	- Lighthouse and small performance tweaks.
10. Deploy & README:
	- Deploy to Netlify / GitHub Pages.
	- Write README sections (wireframes, tech, features, future work).
	
## TIMELINE

**Phase 1:** Setup + Reddit API + basic posts list.\
**Phase 2:** Search & filters.\
**Phase 3:** Post detail + comments + Markdown.\
**Phase 4:** Error/loading UX + responsiveness.\
**Phase 5:** Design polish, testing, deploy, Lighthouse.





