import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import dayjs from 'dayjs';

import Task from './Task';
import { AppDispatch } from '../context/index';

describe('Task Component Specs', () => {
	test('Task details are rendering properly', () => {
		const addTask = jest.fn() as any;
		const removeTask = jest.fn() as any;
		const setActive = jest.fn() as any;
		const updateTask = jest.fn() as any;

		render(
			<AppDispatch.Provider value={{ addTask, removeTask, setActive, updateTask }}>
				<Task
					columnID={1}
					row={{
						id: 1,
						active: false,
						name: 'Test Name',
						description: 'Test Description',
						deadline: Date.now(),
					}}
				/>
			</AppDispatch.Provider>,
		);

		const task = screen.getByTestId('task');
		const name = screen.getByTestId('name');
		const description = screen.getByTestId('description');
		const deadline = screen.getByTestId('deadline');

		expect(task).toBeInTheDocument();
		expect(name).toHaveTextContent('Test Name');
		expect(description).toHaveTextContent('Test Description');
		expect(deadline).toHaveTextContent(dayjs().format('MMM DD'));
	});

	test('Edit Mode Should Show the Form', () => {
		const addTask = jest.fn() as any;
		const removeTask = jest.fn() as any;
		const setActive = jest.fn() as any;
		const updateTask = jest.fn() as any;

		render(
			<AppDispatch.Provider value={{ addTask, removeTask, setActive, updateTask }}>
				<Task
					columnID={1}
					row={{
						id: 1,
						active: true,
						name: 'Test Name',
						description: 'Test Description',
						deadline: Date.now(),
					}}
				/>
			</AppDispatch.Provider>,
		);

		const editTaskForm = screen.getByTestId('edit-task-form');
		const editNameInput = screen.getByTestId('edit-name-input');
		const editDescriptionInput = screen.getByTestId('edit-description-input');
		const editDeadlineInput = screen.getByTestId('edit-deadline-input');

		expect(editTaskForm).toBeInTheDocument();
		expect(editNameInput).toBeInTheDocument();
		expect(editDescriptionInput).toBeInTheDocument();
		expect(editDeadlineInput).toBeInTheDocument();
	});

	test('Submitting the edit form details should run updateTask function from context', () => {
		const addTask = jest.fn() as any;
		const removeTask = jest.fn() as any;
		const setActive = jest.fn() as any;
		const updateTask = jest.fn() as any;

		render(
			<AppDispatch.Provider value={{ addTask, removeTask, setActive, updateTask }}>
				<Task
					columnID={1}
					row={{
						id: 1,
						active: true,
						name: 'Test Name',
						description: 'Test Description',
						deadline: Date.now(),
					}}
				/>
			</AppDispatch.Provider>,
		);

		const saveTaskButton = screen.getByTestId('save-task');

		userEvent.click(saveTaskButton);

		expect(updateTask).toBeCalled();
	});

	test('Clicking on edit button on inactive task should run setActive function from context', () => {
		const addTask = jest.fn() as any;
		const removeTask = jest.fn() as any;
		const setActive = jest.fn() as any;
		const updateTask = jest.fn() as any;

		render(
			<AppDispatch.Provider value={{ addTask, removeTask, setActive, updateTask }}>
				<Task
					columnID={1}
					row={{
						id: 1,
						active: false,
						name: 'Test Name',
						description: 'Test Description',
						deadline: Date.now(),
					}}
				/>
			</AppDispatch.Provider>,
		);

		const editTask = screen.getByTestId('edit-task');

		userEvent.click(editTask);

		expect(setActive).toBeCalled();
	});

	test('Clicking on delete button on task should run removeTask function from context', () => {
		const addTask = jest.fn() as any;
		const removeTask = jest.fn() as any;
		const setActive = jest.fn() as any;
		const updateTask = jest.fn() as any;

		// Window confirm
		window.confirm = jest.fn(() => true);

		render(
			<AppDispatch.Provider value={{ addTask, removeTask, setActive, updateTask }}>
				<Task
					columnID={1}
					row={{
						id: 1,
						active: false,
						name: 'Test Name',
						description: 'Test Description',
						deadline: Date.now(),
					}}
				/>
			</AppDispatch.Provider>,
		);

		const deleteTask = screen.getByTestId('delete-task');

		userEvent.click(deleteTask);

		expect(removeTask).toBeCalled();
	});
});
