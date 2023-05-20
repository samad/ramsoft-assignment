export interface IRow {
  id: number | string;
  name: string;
  description: string;
  deadline: number;
  active: boolean;
}

export interface IColumn {
  id: string | number;
  name: string;
  rows: IRow[];
}

export interface IState {
  columns: IColumn[];
}

export interface IDispatchState {
  addTask: (payload: { columnID: string | number; data: IRow }) => void;
  removeTask: (payload: { columnID: string | number; rowID: number | string }) => void;
  setActive: (payload: { columnID: string | number; rowID: string | number; active: boolean }) => void;
  updateTask: (payload: { columnID: string | number; data: IRow }) => void;
}

export const ADD_TASK = 'ADD_TASK';
export const UPDATE_TASK = 'UPDATE_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const TOGGLE_TASK_ACTIVE = 'TOGGLE_TASK_ACTIVE';

export type Action = {
  type: typeof ADD_TASK | typeof UPDATE_TASK | typeof REMOVE_TASK | typeof TOGGLE_TASK_ACTIVE;
  payload: any;
};
