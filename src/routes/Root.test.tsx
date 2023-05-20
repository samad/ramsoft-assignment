import { render, screen } from '@testing-library/react';

import Root from './Root';
import { Context } from '../context/index';

test('Renders Root with Column heading', () => {
	render(
		<Context>
			<Root />
		</Context>,
	);

	const ToDOHeading = screen.getByText(/ToDo/i);
	expect(ToDOHeading).toBeInTheDocument();
});
