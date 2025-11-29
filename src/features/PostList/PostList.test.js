/* The test suite to check if the post list component:
    - takes a `posts` array,
    - renders a `PostCard` for each item, inside a <section> */

import { render, screen } from "@testing-library/react";
import PostList from "./PostList";

describe("PostList", () => {
    const mockPosts = [
        {
            id: "1",
            subreddit: "javascript",
            author: "john",
            title: "First post",
            score: 21,
            noOfComments: 9
        },
        {
            id: "2",
            subreddit: "reactjs",
            author: "kenny",
            title: "Second post",
            score: 34,
            noOfComments: 15
        }
    ];
    /* Test 1 to check a PostCard per post is rendered */
    it("renders a PostCard for each post", () => {
        render(<PostList posts={mockPosts} />);
        expect(screen.getByText("First post")).toBeInTheDocument();
        expect(screen.getByText("Second post")).toBeInTheDocument();
    });
    /* Test 2 to check nothing is rendered when posts is empty */
    it("renders no posts when the list is empty", () => {
        render(<PostList posts={[]} />);
        const articles = screen.queryAllByRole("article");
        expect(articles).toHaveLength(0);
    });
});