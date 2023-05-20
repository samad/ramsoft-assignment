import { AppBar, Toolbar, Typography } from '@mui/material';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Root from './routes/Root';
import ThemeProvider from './theme';
import { Context } from './context';

// React Router
const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
	},
]);

const App = () => {
	return (
		<ThemeProvider>
			<AppBar position='static' color='primary' enableColorOnDark>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Jira Clone
					</Typography>
				</Toolbar>
			</AppBar>
			<Context>
				<RouterProvider router={router} />
			</Context>
		</ThemeProvider>
	);
};

export default App;
