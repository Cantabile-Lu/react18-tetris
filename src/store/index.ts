import { configureStore } from '@reduxjs/toolkit';
import matrixSlice from './matrix';
export const store = configureStore({
	reducer: {
		matrixSlice
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
