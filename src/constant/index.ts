import { List } from 'immutable';
import { BlockType } from '../types';
// 块形状
export const blockShape = {
	I: [[1, 1, 1, 1]],
	L: [
		[0, 0, 1],
		[1, 1, 1]
	],
	J: [
		[1, 0, 0],
		[1, 1, 1]
	],
	Z: [
		[1, 1, 0],
		[0, 1, 1]
	],
	S: [
		[0, 1, 1],
		[1, 1, 0]
	],
	O: [
		[1, 1],
		[1, 1]
	],
	T: [
		[0, 1, 0],
		[1, 1, 1]
	]
};
// 块类型
export const blockType = Object.keys(blockShape) as Array<BlockType>;
// 空白格子
export const blankLine: number[] = Array(10).fill(0);
// 填充行
export const fillLine: number[] = Array(10).fill(1);
// 空白矩阵
export const blankMatrix = List<List<number>>(Array(20).fill(List(blankLine)));
// 下降速度
export const speeds = [800, 650, 500, 370, 250, 160];
