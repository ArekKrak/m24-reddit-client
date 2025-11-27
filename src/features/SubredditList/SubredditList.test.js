import React from 'react';
import { render, screen } from '@testing-library/react';
import SubredditList from './SubredditList';

test('renders the list of subreddits', () => {
    const mockSubreddits = ['news', 'python', 'javascript'];

    // Render component with fake data
    render(<SubredditList subreddits={mockSubreddits} />);

    // Heading is present
    expect(screen.getByText(/subreddits/i)).toBeInTheDocument();

    // Each subreddit appears as "r/name"
    mockSubreddits.forEach((name) => {
        expect(screen.getByText(`r/${name}`)).toBeInTheDocument();
    });
});