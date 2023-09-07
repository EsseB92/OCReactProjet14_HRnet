import { createSelector, createSlice } from "@reduxjs/toolkit";
import employeesItems from "./employeesItems";

/**
 * Initialise l'état par défaut.
 */
const initialState = {
  employees: employeesItems,
};

/**
 * Slice pour gérer les employés.
 *
 * @type {import('@reduxjs/toolkit').Slice}
 */
const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    /**
     * Ajoute un nouvel employé à la liste des employés.
     *
     * @param {Object} state - État actuel.
     * @param {Object} action - Action contenant le nouvel employé.
     * @returns {Object} Le nouvel état
     */
    addEmployee: (state, action) => {
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    },
    /**
     * Supprime les employés spécifiés de la liste des employés.
     *
     * @param {Object} state - État actuel.
     * @param {Object} action - Action contenant les IDs des employés à supprimer.
     * @return {Object} Le nouvel état
     */
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

export const selectAllEmployees = (state) => state.employees.items;
/**
 * Selector pour obtenir la liste de tous les employés.
 *
 * @type {import('@reduxjs/toolkit').Selector}
 */
export const selectAllEmployeesSelector = createSelector(
  [selectAllEmployees],
  (employees) => employees
);

export default employeesSlice.reducer;
