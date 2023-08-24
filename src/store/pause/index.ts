import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface PauseState {
	pause: boolean;
}

const initialState: PauseState = {
	pause: false
};
export const pauseSlice = createSlice({
	name: 'pause',
	initialState,
	reducers: {
		changePause(state, action: PayloadAction<boolean>) {
			state.pause = action.payload;
		}
	}
});

export const { changePause } = pauseSlice.actions;
export default pauseSlice.reducer;
