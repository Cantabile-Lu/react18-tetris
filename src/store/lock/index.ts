import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface LockState {
	lock: boolean;
}

const initialState: LockState = {
	lock: false
};
export const lockSlice = createSlice({
	name: 'lock',
	initialState,
	reducers: {
		changeLock(state, action: PayloadAction<boolean>) {
			state.lock = action.payload;
		}
	}
});

export const { changeLock } = lockSlice.actions;
export default lockSlice.reducer;
