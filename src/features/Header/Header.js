// The Header component shows the app title "Reddit Light" and the search input & button.

import { useState } from 'react'; // Store the current search text using state
import './Header.css';

/* Implement controlled search input */
export default function Header({ onSearch }) { // By adding `onSearch`, this function now lets the parent (`App`) decide what "search" does
    /* Local state so that `term` mirrors whatever is in the text box; `setTerm` updates it */
    const [term, setTerm] = useState("");

    function handleSearchClick() {
        const trimmed = term.trim();
        if (!trimmed) return;
        if (onSearch) {
            onSearch(trimmed);
        }
    }

    return (
        <header className="header-style">
            <h1>Reddit Light</h1>
            <div className="header-search">
                <input 
                    className="header-placeholder" 
                    type="text" 
                    placeholder="Search Reddit..." 
                    value={term}                    // React controls the input based on state
                    onChange={(e) => setTerm(e.target.value)}   // Keeps `term` in sync with what the user types
                />
                <button className="header-button" onClick={handleSearchClick}>Search</button>
            </div>
        </header>
    );
}