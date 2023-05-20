import { render, screen } from '@testing-library/react';

import ThemeProvider from './index';

describe('Theme Provider', () => {
	test('ThemeProvider renders children properly', () => {
		render(
			<ThemeProvider>
				<h1>Hello World!</h1>
			</ThemeProvider>,
		);
		const linkElement = screen.getByText(/Hello World/i);
		expect(linkElement).toBeInTheDocument();
	});
});
