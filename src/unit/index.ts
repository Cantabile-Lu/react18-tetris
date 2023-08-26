import { BlockType, IBlock, Matrix } from '../types';
import { blankLine, blockType } from '../constant';
import { List } from 'immutable';

/**
 * @description 判断是否可以移动
 */
export const want = (next: Required<IBlock>, matrix: Matrix): boolean => {
	const { xy, shape } = next;
	const horizontal = shape.get(0)!.size;
	const x = xy.get(0)!;
	const y = xy.get(1)!;
	return shape.every((m, k1) => {
		return m.every((n, k2) => {
			// left
			if (y < 0) {
				return false;
			}
			// right
			if (y + horizontal > 10) {
				return false;
			}
			if (x + k1 < 0) {
				return true;
			}
			if (x + k1 >= 20) {
				return false;
			}
			if (n) {
				return !matrix.get(x + k1)?.get(y + k2);
			}
			return true;
		});
	});
};

/**
 * @description  设置矩阵行
 * @return {Matrix} matrix
 * @date: 2023-08-20
 */
export const setMatrixLine = (
	cur: Required<IBlock>,
	matrix: Matrix
): Matrix => {
	const { xy, shape } = cur;
	shape.forEach((m, k1) =>
		m.forEach((n, k2) => {
			if (n && xy.get(0)! + k1 >= 0) {
				// 竖坐标可以为负
				let line = matrix.get(xy.get(0)! + k1)!;
				line = line.set(xy.get(1)! + k2, 1);
				matrix = matrix.set(xy.get(0)! + k1, line);
			}
		})
	);
	return matrix;
};
/**
 * @description 是否游戏结束
 * 通过判断数组第一行是否有值
 * @return {boolean} boolean
 */
export const isGameOver = (matrix: Matrix): boolean => {
	return matrix.get(0)!.some((n) => !!n);
};

/**
 * @description 当前矩阵是否有可消除行
 * @date: 2023-08-23
 */
export const isClear = (matrix: Matrix) => {
	const cleanliness: number[] = [];
	matrix.forEach((m, k) => {
		if (m.every((n) => !!n)) {
			cleanliness.push(k);
		}
	});
	if (!cleanliness.length) {
		return [];
	}
	return cleanliness;
};
/**
 * @description 生成随机方块值
 */
export const getNextBlock = (): BlockType => {
	const len = blockType.length;
	return blockType[Math.floor(Math.random() * len)];
};
// 消除行
export const clear = (matrix: Matrix, lines: number[]) => {
	lines.forEach((line) => {
		// 清除 一行
		matrix = matrix.splice(line, 1);
		// 补齐一行空白格
		matrix = matrix.unshift(List(blankLine));
	});
	return matrix;
	// dispatch(changeMatrix(matrix));
	// auto();
};
