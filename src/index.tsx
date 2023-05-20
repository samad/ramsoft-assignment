import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

// Google Roboto Font Variants
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
	// Add Task in reducer double render issue because of React 18 (Only in strict mode)
	<StrictMode>
		<App />
	</StrictMode>,
);
