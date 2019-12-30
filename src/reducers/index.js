import { combineReducers, createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import appStatus from "./appStatus";
import { AsyncStorage } from "react-native";

const reducers = combineReducers({
  appStatus
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);
const persistor = persistStore(store);

export { store, persistor };
