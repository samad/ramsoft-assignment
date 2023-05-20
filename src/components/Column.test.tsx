import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Column from './Column';
import { AppDispatch } from '../context/index';
import { initialState } from '../context/data';

describe('Column Component Specs', () => {
	test('Should display a column with a title and add task button', () => {
		render(
			<Column
				title={initialState.columns[0].name}
				rows={initialState.columns[0].rows}
				id={initialState.columns[0].id}
			/>,
		);

		const columnHeading = screen.getByText(/ToDo's/i);
		const addTaskButton = screen.getByTestId('add-button');

		expect(columnHeading).toBeInTheDocument();
		expect(addTaskButton).toBeInTheDocument();
		expect(addTaskButton).toHaveTextContent('Add New Task');
	});

	test('Clicking on Add Task Button Should Run addTask function from Context', () => {
		const addTask = jest.fn() as any;
		const removeTask = jest.fn() as any;
		const setActive = jest.fn() as any;
		const updateTask = jest.fn() as any;

		render(
			<AppDispatch.Provider value={{ addTask, removeTask, setActive, updateTask }}>
				<Column
					title={initialState.columns[0].name}
					rows={initialState.columns[0].rows}
					id={initialState.columns[0].id}
				/>
			</AppDispatch.Provider>,
		);

		const addTaskButton = screen.getByTestId('add-button');
		userEvent.click(addTaskButton);

		expect(addTask).toBeCalledTimes(1);
	});
});
