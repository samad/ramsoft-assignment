import { Container } from '@mui/material';

import Column from '../components/Column';
import { useAppContext } from '../context';

const Root = () => {
	const { columns } = useAppContext();

	return (
		<Container sx={{ display: 'flex', gap: 2 }}>
			{columns.map(({ id, name, rows }) => (
				<Column key={id} title={name} rows={rows} id={id} />
			))}
		</Container>
	);
};

export default Root;
