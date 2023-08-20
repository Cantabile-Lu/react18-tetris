import { List } from 'immutable';
import { blockShape } from '../constant';
// 块形状
export type BlockType = keyof typeof blockShape;
export interface Block {
	type: BlockType;
	timeStamp?: number;
	shape?: List<List<number>>;
	xy?: List<number>;
	rotateIndex?: number;
}
// 初始化块
export type InitBlock = Partial<Omit<Block, 'type'>>;
