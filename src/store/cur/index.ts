import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Block } from '../../unit/block';
import { IBlock } from '../../types';
export interface ICur {
	cur: Block | null;
}
const initialState: ICur = {
	cur: null
};
export const curSlice = createSlice({
	name: 'cur',
	initialState,
	reducers: {
		changeCur(state, action: PayloadAction<IBlock>) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			state.cur = new Block(action.payload);
		}
	}
});

export const { changeCur } = curSlice.actions;
export default curSlice.reducer;
