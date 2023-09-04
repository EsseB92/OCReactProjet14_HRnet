import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import employeesReducer from "../features/employees/employeesSlice";

const store = createStore(
  { reducer: { employees: employeesReducer } },
  applyMiddleware()
);

export default store;
