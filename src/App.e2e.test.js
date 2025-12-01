import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import App from "./App.js"

/* Import the same module postsSlice uses */
import * as redditApi from "./api/reddit.js";

/* Stub react-markdown to a simple pass-through component */
jest.mock("react-markdown", () => ({
	__esModule: true,
	default: (props) => props.children
}));

/* Tell Jest to mock that module */
jest.mock("./api/reddit.js");

test("user can load posts, search, and open a post detail with comments", async () => {
  /* Fake data for initial 'news' load */
	const newPosts = [
		{
			id: "1",
			title: "News post",
			author: "amy",
			subreddit: "news",
			score: 10,
			noOfComments: 3,
			permalink: "/r/news/comments/1/news_post/"
		}
	];

	/* Fake data for 'reactjs' search */
	const reactPosts = [
		{
			id: "2",
			title: "React post",
			author: "john",
			subreddit: "reactjs",
			score: 12,
			noOfComments: 7,
			permalink: "/r/reactjs/comments/2/react_post/"
		}
	];

	/* Fake comments returned for the detail modal */
	const mockComments = [
		{ id: "c1", body: "News post", author: "john_doe" }
	];

	redditApi.fetchSubredditPosts.mockImplementation(async (subreddit) => {
		if (subreddit === "news") return newPosts;
		if (subreddit === "reactjs") return reactPosts;
		return [];
	});

	redditApi.fetchCommentsForPost.mockResolvedValue(mockComments);

	/* Render the real app with the real store */
	render(
		<Provider store={store}>
			<App />
		</Provider>
	);

	/* 1. Initial load shows the 'news' post */
	expect(await screen.findByText("News post")).toBeInTheDocument();

	/* 2. Search for "reactjs" */
	const input = screen.getByPlaceholderText(/search reddit/i);
	fireEvent.change(input, { target: { value: "reactjs" } });

	const searchButton = screen.getByRole("button", { name: /search/i });
	fireEvent.click(searchButton);

	/* React post appears */
	expect(await screen.findByText("React post")).toBeInTheDocument();

	/* 3. User clicks the post to open the modal */
	fireEvent.click(screen.getByText("React post"));

	/* Modal shows comments header and the mocked comment text */
	expect(await screen.findByText(/comments/i)).toBeInTheDocument();
	expect(await screen.findByText("Nice post")).toBeInTheDocument();
});