import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface speedRunState {
	speedRun: number;
}

const initialState: speedRunState = {
	speedRun: 1
};
export const speedRunSlice = createSlice({
	name: 'speedRun',
	initialState,
	reducers: {
		changeSpeedRun(state, action: PayloadAction<number>) {
			state.speedRun = action.payload;
		}
	}
});

export const { changeSpeedRun } = speedRunSlice.actions;
export default speedRunSlice.reducer;
