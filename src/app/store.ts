import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from './rootReducer';
import { borrowLimitMiddleware } from './middleware/borrowLimitMiddleware';

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(borrowLimitMiddleware),
  });
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = typeof store.dispatch;
export type { RootState };
