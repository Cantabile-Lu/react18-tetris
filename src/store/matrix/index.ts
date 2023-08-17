import { createSlice } from '@reduxjs/toolkit';

export const matrixSlice = createSlice({
	name: 'matrix',
	initialState: {
		matrix: []
	},
	reducers: {
		changeMatrix(state) {
			console.log(`🚀🚀🚀🚀🚀-> in index.ts on 10`, state);
		}
	}
});

export const { changeMatrix } = matrixSlice.actions;
export default matrixSlice.reducer;
