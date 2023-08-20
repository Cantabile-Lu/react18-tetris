import { List } from 'immutable';
import { blankMatrix, blockShape } from '../constant';
// 块形状
export type BlockType = keyof typeof blockShape;

export interface IBlock {
	type: BlockType;
	timeStamp?: number;
	shape?: List<List<number>>;
	xy?: List<number>;
	rotateIndex?: number;
}
export type Matrix = typeof blankMatrix;
