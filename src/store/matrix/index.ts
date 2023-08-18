import { createSlice } from '@reduxjs/toolkit';
import { blankMatrix } from '../../constant';
import { List } from 'immutable';

export interface IMatrix {
	matrix: List<number[]>;
}

const initialState: IMatrix = {
	matrix: blankMatrix
};
export const matrixSlice = createSlice({
	name: 'matrix',
	initialState,
	reducers: {
		changeMatrix(state) {
			console.log(`🚀🚀🚀🚀🚀-> in index.ts on 10`, state);
		}
	}
});

export const { changeMatrix } = matrixSlice.actions;
export default matrixSlice.reducer;
