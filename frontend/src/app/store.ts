import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const themePersistConfig = {
  key: "theme",
  storage,
};
const themePersistedReducer = persistReducer(themePersistConfig, themeReducer);
const rootReducer = combineReducers({ theme: themePersistedReducer });
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
