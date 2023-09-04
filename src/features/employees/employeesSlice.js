import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employees: [],
};

export const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee(state, action) {
      return {
        ...state,
        employees: [...state.employees, action.employee],
      };
    },
    deleteEmployee(state, action) {
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.employee.id
        ),
      };
    },
  },
});

export const { addEmployee } = employeesSlice.actions;
export default employeesSlice.reducer;
