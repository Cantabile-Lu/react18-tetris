import {
	configureStore,
	createImmutableStateInvariantMiddleware
} from '@reduxjs/toolkit';
import matrixSlice from './matrix';
import curSlice from './cur';

const immutableInvariantMiddleware = createImmutableStateInvariantMiddleware({
	ignoredPaths: ['curSlice.cur', 'matrixSlice.matrix']
});
export const store = configureStore({
	reducer: {
		matrixSlice,
		curSlice
	},
	//https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
	middleware: [immutableInvariantMiddleware]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
