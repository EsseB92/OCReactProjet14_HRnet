import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import employeesReducer from "../features/employees/employeesSlice";

const persistConfig = {
  key: "employees",
  storage,
};

const persistedReducer = persistReducer(persistConfig, employeesReducer);

const store = configureStore({
  reducer: { employees: persistedReducer },
});

const persistor = persistStore(store);

export { store, persistor };
