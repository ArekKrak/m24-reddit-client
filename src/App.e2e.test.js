import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import App from "./App.js"

/* Import the same module postsSlice uses */
import * as redditApi from "./api/reddit.js";

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
		{ id: "c1", body: "Long post", author: "john_doe" }
	];

	redditApi.fetchCommentsForPost.mockResolvedValue(mockComments);
});