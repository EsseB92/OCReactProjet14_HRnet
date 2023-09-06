import { createSlice } from "@reduxjs/toolkit";
import employeesItems from "./employeesItems";

const initialState = {
  employees: employeesItems,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    },
    deleteEmployees: (state, action) => {
      const employeesToDelete = action.payload;
      const newEmployees = state.employees.filter(
        (employee) => !employeesToDelete.includes(employee.id)
      );
      return {
        ...state,
        employees: newEmployees,
      };
    },
  },
});

export const { addEmployee, deleteEmployees } = employeesSlice.actions;
export default employeesSlice.reducer;
