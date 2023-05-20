import { Box, Button, Typography, styled } from '@mui/material';

import Task from './Task';
import { IRow } from '../context/types';
import { useAppDispatch } from '../context';

const StyledBox = styled(Box)(({ theme }) => ({
	minHeight: 'calc(100vh - 150px)',
	width: 300,
	backgroundColor:
		theme.palette.mode === 'dark' ? theme.palette.grey['900'] : theme.palette.grey['300'],
	margin: '2rem 0 0 0',
	borderRadius: 12,
	padding: theme.spacing(2),
	flexShrink: 0,
}));

const Column = ({ title, rows, id }: { title: string; rows: IRow[]; id: string | number }) => {
	const { addTask } = useAppDispatch();

	return (
		<StyledBox data-testid='column'>
			<Typography align='center' gutterBottom>
				{title}
			</Typography>
			{rows.map((row) => (
				<Task key={row.id} columnID={id} row={row} />
			))}
			<Button
				variant='contained'
				sx={{ marginTop: 2 }}
				data-testid='add-button'
				onClick={() => {
					addTask({
						columnID: id,
						data: {
							id: rows.length + 1,
							name: '',
							description: '',
							deadline: Date.now(),
							active: true,
						},
					});
				}}
				fullWidth>
				Add New Task
			</Button>
		</StyledBox>
	);
};

export default Column;
