import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { blankMatrix } from '../../constant';
import { Matrix } from '../../types';
export interface IMatrix {
	matrix: Matrix;
	value: number;
}

const initialState: IMatrix = {
	matrix: blankMatrix,
	value: 0
};
export const matrixSlice = createSlice({
	name: 'matrix',
	initialState,
	reducers: {
		changeMatrix(state, action: PayloadAction<Matrix>) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			state.matrix = action.payload;
		}
	}
});

export const { changeMatrix } = matrixSlice.actions;
export default matrixSlice.reducer;
