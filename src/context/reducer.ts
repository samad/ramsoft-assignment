import * as types from './types';

const reducer = (state: types.IState, action: types.Action): types.IState => {
  let filteredColumn;

  switch (action.type) {
    case types.ADD_TASK:
      filteredColumn = state.columns.map((column) => {
        const { id, rows } = column;

        if (id === action.payload.columnID) {
          rows.push(action.payload.data);

          return {
            ...column,
            rows,
          };
        }

        return column;
      });

      return {
        ...state,
        columns: [...filteredColumn],
      };

    case types.UPDATE_TASK:
      filteredColumn = state.columns.map((column) => {
        const { id, rows } = column;

        if (id === action.payload.columnID) {
          return {
            ...column,
            rows: rows.map((row) => {
              const { id } = row;

              if (id === action.payload.data.id) {
                return {
                  ...row,
                  ...action.payload.data,
                };
              }

              return row;
            }),
          };
        }

        return column;
      });

      return {
        ...state,
        columns: [...filteredColumn],
      };

    case types.REMOVE_TASK:
      filteredColumn = state.columns.map((column) => {
        const { id, rows } = column;

        if (id === action.payload.columnID) {
          return {
            ...column,
            rows: rows.filter(({ id }) => id !== action.payload.rowID),
          };
        }

        return column;
      });

      return {
        ...state,
        columns: [...filteredColumn],
      };

    case types.TOGGLE_TASK_ACTIVE:
      filteredColumn = state.columns.map((column) => {
        const { id, rows } = column;

        if (id === action.payload.columnID) {
          return {
            ...column,
            rows: rows.map((row) => {
              const { id } = row;

              if (id === action.payload.rowID) {
                return {
                  ...row,
                  active: true,
                };
              }

              return row;
            }),
          };
        }

        return column;
      });

      return {
        ...state,
        columns: [...filteredColumn],
      };

    default:
      return state;
  }
};

export default reducer;
