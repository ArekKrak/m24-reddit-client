// The Header component shows the app title "Reddit Light" and the search input & button.

import { useState } from 'react'; // Store the current search text using state
import './Header.css';

export default function Header({ onSearch }) {

    return (
        <header className="header-style">
            <h1>Reddit Light</h1>
            <div className="header-search">
                <input className="header-placeholder" type="text" placeholder="Search Reddit..." />
                <button className="header-button">Search</button>
            </div>
        </header>
    );
}