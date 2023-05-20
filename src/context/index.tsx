import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

import * as types from './types';
import reducer from './reducer';
import initialState from './data';

export const AppContext = createContext<types.IState>(initialState);
export const AppDispatch = createContext<types.IDispatchState>({
  addTask: () => null,
  removeTask: () => null,
  setActive: () => null,
  updateTask: () => null,
});

export const Context = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // LocalStorage is a local operation (No database / latency issues / cost issues) so saving data on every render
    localStorage.setItem('jira-clone-state', JSON.stringify(state));
  });

  const addTask = useCallback((payload: { columnID: string | number; data: types.IRow }) => {
    dispatch({
      type: types.ADD_TASK,
      payload,
    });
  }, []);

  const removeTask = useCallback((payload: { columnID: string | number; rowID: string | number }) => {
    dispatch({
      type: types.REMOVE_TASK,
      payload,
    });
  }, []);

  const setActive = useCallback((payload: { columnID: string | number; rowID: string | number; active: boolean }) => {
    dispatch({
      type: types.TOGGLE_TASK_ACTIVE,
      payload,
    });
  }, []);

  const updateTask = useCallback((payload: { columnID: string | number; data: types.IRow }) => {
    dispatch({
      type: types.UPDATE_TASK,
      payload,
    });
  }, []);

  return (
    <AppContext.Provider value={{ columns: state.columns }}>
      <AppDispatch.Provider
        value={{
          addTask,
          removeTask,
          setActive,
          updateTask,
        }}>
        {children}
      </AppDispatch.Provider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error('useAppContext must be used within AppContext Provider');
  }

  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppDispatch);

  if (context === undefined) {
    throw new Error('useAppDispatch must be used within AppContext Provider');
  }

  return context;
};
