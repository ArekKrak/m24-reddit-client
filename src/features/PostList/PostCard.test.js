/* The test suite to check if the post card component:
    - renders *subreddit + author* line
    - renders the *title* in an `<h3>`
    - renders *score + comments* in the footer */

import { render, screen } from "@testing-library/react";
import PostCard from "./PostCard";

describe("PostCard", () => {
    const mockPost = {
        subreddit: "javascript",
        author: "testuser",
        title: "A sample post title",
        score: 107,
        noOfComments: 45
    };
    it("renders subreddit, author, title, and footer", async () => {
        render(<PostCard post={mockPost} />);
        /* Assert that the "r/javascript • Posted by u/testuser" line exists */
        expect(screen.getByText("r/javascript • Posted by u/testuser")).toBeInTheDocument();
        /* Assert that the title is rendered as a heading */
        expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent("A sample post title");
        /* Assert that the "107 upvotes • 45 comments" footer exists */
        expect(screen.getByText("107 upvotes • 45 comments")).toBeInTheDocument();
    });
});