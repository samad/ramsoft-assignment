import { useState, useRef, useCallback, FormEvent } from 'react';
import { Card, TextField, Typography, Input, Button, IconButton, styled, Box } from '@mui/material';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { IRow } from '../context/types';
import { useAppDispatch } from '../context';

const StyledCard = styled(Card)(({ theme }) => ({
	padding: theme.spacing(2),
	borderRadius: 12,
	cursor: 'pointer',
	background: theme.palette.background.default,

	'& + &': {
		marginTop: theme.spacing(2),
	},
}));

const CardFooter = styled('div')(() => ({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
}));

interface ITask {
	row: IRow;
	columnID: string | number;
}

const Task = ({ row: { deadline, description, name, active, id: rowID }, columnID }: ITask) => {
	const [formData, setFormData] = useState({
		name: name,
		description: description,
		deadline: deadline,
	});
	const ref = useRef<HTMLDivElement>(null);
	const { removeTask, setActive, updateTask } = useAppDispatch();

	const onSubmit = useCallback(
		(ev: FormEvent) => {
			ev.preventDefault();

			updateTask({ columnID, data: { ...formData, id: rowID, active: false } });
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[formData],
	);

	if (active) {
		return (
			<StyledCard ref={ref}>
				<form onSubmit={onSubmit} data-testid='edit-task-form'>
					<TextField
						label='Task Name'
						defaultValue={name}
						onChange={(ev) => setFormData((prevState) => ({ ...prevState, name: ev.target.value }))}
						sx={{ marginBottom: '1rem' }}
						data-testid='edit-name-input'
						required
						fullWidth
					/>
					<TextField
						label='Task Description'
						rows={3}
						onChange={(ev) =>
							setFormData((prevState) => ({ ...prevState, description: ev.target.value }))
						}
						defaultValue={description}
						sx={{ marginBottom: '1rem' }}
						data-testid='edit-description-input'
						multiline
						fullWidth
					/>
					<Typography sx={{ padding: '0 0.5rem' }} gutterBottom>
						Deadline
					</Typography>
					<Input
						type='date'
						onChange={(ev) =>
							setFormData((prevState) => ({
								...prevState,
								deadline: dayjs(ev.target.value).valueOf(),
							}))
						}
						defaultValue={dayjs(deadline).format('YYYY-MM-DD')}
						data-testid='edit-deadline-input'
						sx={{ marginBottom: '1rem', padding: '0 0.5rem' }}
						required
						fullWidth
					/>
					<Box textAlign='center' sx={{ '& > button + button': { marginLeft: '15px' } }}>
						<Button variant='contained' type='submit' size='small' data-testid='save-task'>
							Save
						</Button>
					</Box>
				</form>
			</StyledCard>
		);
	}

	return (
		<StyledCard data-testid='task'>
			<Typography fontWeight='bold' data-testid='name' gutterBottom>
				{name}
			</Typography>
			<Typography sx={{ overflow: 'hidden' }} data-testid='description' gutterBottom>
				{description}
			</Typography>
			<CardFooter>
				<Typography component='span' data-testid='deadline' fontStyle='italic'>
					{dayjs(deadline).format('MMM DD')}
				</Typography>
				<div>
					<IconButton
						size='small'
						sx={{ bgcolor: 'grey.700', color: 'white' }}
						data-testid='edit-task'
						title='Edit'
						onClick={() => setActive({ active: true, columnID, rowID })}>
						<EditIcon />
					</IconButton>
					<IconButton
						size='small'
						sx={{ bgcolor: 'error.main', color: 'white', marginLeft: 1 }}
						data-testid='delete-task'
						title='Delete'
						onClick={() => {
							if (window.confirm('Do you really want to delete this task?')) {
								removeTask({ columnID, rowID });
							}
						}}>
						<DeleteIcon />
					</IconButton>
				</div>
			</CardFooter>
		</StyledCard>
	);
};

export default Task;
