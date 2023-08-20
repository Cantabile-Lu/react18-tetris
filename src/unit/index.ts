import { IBlock, Matrix } from '../types';

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
