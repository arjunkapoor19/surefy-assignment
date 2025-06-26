import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  createTransform,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './rootReducer';
import { initialState as tableInitialState, Column, TableState } from './tableSlice';


 // This transform defines how the 'table' slice is persisted.
 
const tableStateTransform = createTransform(
  // Inbound: State from Redux -> State to be persisted
  (inboundState: TableState) => {
    return { columns: inboundState.columns };
  },
  // Outbound: State from storage -> State for Redux
  (outboundState: { columns: Column[] }) => {
    return { ...tableInitialState, columns: outboundState.columns };
  },
  // Configuration for the transform
  { whitelist: ['table'] }
);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['table'],
  transforms: [tableStateTransform],
};


// We disable the ESLint rule for this line because this is a deliberate and necessary exception.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;