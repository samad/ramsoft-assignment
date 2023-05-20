import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Navbar', () => {
	render(<App />);
	const linkElement = screen.getByText(/Jira Clone/i);
	expect(linkElement).toBeInTheDocument();
});
