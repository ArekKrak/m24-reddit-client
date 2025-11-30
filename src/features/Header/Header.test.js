/* This test suite checks if the Header component:
    - has search call `onSearch` with trimmed text
    - has empty/whitespace input not call `onSearch` */

import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
    
    it("renders the `onSearch` calls with trimmed text", () => {
        const handleSearch = jest.fn();
        const input = screen.getByPlaceholderText("Search Reddit...");
        fireEvent.change(input, { target: { value: " python " } });
        const button = screen.getByRole("button", { name: /search/i });
        fireEvent.click(button);

        expect(handleSearch).toHaveBeenCalledTimes(1);
        expect(handleSearch).toHaveBeenCalledWith("python");

        render(<Header onSearch={handleSearch}/>)
    });
});