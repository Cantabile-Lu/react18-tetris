import { useDispatch } from 'react-redux';
import { changeCur } from '../store/cur';
import { store } from '../store';
import {
	getNextBlock,
	isClear,
	isGameOver,
	setMatrixLine,
	want
} from '../unit';
import { IBlock, Matrix } from '../types';
import { useRef } from 'react';
import { changeMatrix } from '../store/matrix';
import { is, List } from 'immutable';
import { blankLine } from '../constant';
import { changePause } from '../store/pause';

/**
 * @description 处理事件
 * @date: 2023-08-19
 */
export const useHandlerEvent = () => {
	const selector = store.getState;
	const dispatch = useDispatch();
	const timer = useRef(0);
	const auto = (timeout = 0) => {
		// 自动降落函数
		const fall = () => {
			// 获取当前可移动块
			const cur = selector().curSlice.cur!;
			// 调用块降落函数, 增加xy种的x值
			const next = cur.fall();
			// 比较是否触底
			const isWant = want(
				next as Required<IBlock>,
				selector().matrixSlice.matrix
			);
			if (isWant) {
				dispatch(changeCur(next));
				// 递归调用自身
				timer.current = window.setTimeout(fall, 100);
			} else {
				// 获取当前块并设置新的矩阵
				const newMatrix = setMatrixLine(cur, selector().matrixSlice.matrix);
				// 块触底
				nextAround(newMatrix);
			}
			// 重置当前可移动块
		};
		clearTimeout(timer.current);
		timer.current = window.setTimeout(fall, 1000);
	};

	// 消除行
	const clear = (matrix: Matrix, lines: number[]) => {
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
	// 下一个方块
	const nextAround = (matrix: Matrix) => {
		let newMatrix = matrix;
		clearTimeout(timer.current);

		// 判断是否结束
		if (isGameOver(newMatrix)) {
			return;
		}

		// 是否可消除
		const lines = isClear(newMatrix);
		if (lines.length) {
			// 如果湿可以消除的话, 设置颜色
			const colors: number[] = Array(10).fill(2);
			lines.forEach((line) => {
				newMatrix = newMatrix.set(line, List(colors));
			});
			clearAnimate(newMatrix, lines);
		}
		dispatch(changeMatrix(newMatrix));
		// 设置下一个可移动块
		dispatch(changeCur({ type: 'O' }));
		auto();
	};
	function clearAnimate(matrix: Matrix, lines: number[]) {
		const t = window.setTimeout;
		const anima = (callback: Function) => {
			t(() => {
				t(() => {
					if (typeof callback === 'function') {
						callback();
					}
				}, 100);
			}, 100);
		};
		anima(() => {
			anima(() => {
				anima(() => {
					t(() => {
						const newMatrix = clear(matrix, lines);
						dispatch(changeMatrix(newMatrix));
					}, 100);
				});
			});
		});
	}
	// 开始游戏
	const start = () => {
		// 1: 开始动画
		// 2: 开始音效
		// 3:  设置难度起始行
		// 4:  设置当前可移动块
		dispatch(changeCur({ type: 'O' }));
		// 5:  设置下一个可移动块
		// 6:  开始自动落下
		auto();
	};
	// 左右移动块
	const move = (isRight: boolean) => {
		const cur = selector().curSlice.cur;
		if (cur) {
			const next = isRight ? cur.right() : cur.left();
			if (want(next, selector().matrixSlice.matrix)) {
				dispatch(changeCur(next));
			}
		}
	};

	// 旋转块
	const rotate = () => {
		const cur = selector().curSlice.cur;
		if (cur) {
			const next = cur.rotate();
			if (want(next, selector().matrixSlice.matrix)) {
				dispatch(changeCur(next));
			}
		}
	};
	// 下落
	const down = () => {
		// 1: 可以快速落下方块
		// 2: 可以设置难度, 起始行
		const cur = selector().curSlice.cur;
		const isPause = selector().pauseSlice.pause;
		if (isPause) {
			pause(false);
			return;
		}
		if (cur) {
			const next = cur.fall();
			if (want(next, selector().matrixSlice.matrix)) {
				dispatch(changeCur(next));
			}
		}
	};

	// 暂停
	const pause = (isPause: boolean) => {
		dispatch(changePause(isPause));
		if (isPause) {
			clearTimeout(timer.current);
			return;
		}
		auto();
	};
	return { start, move, rotate, down, clear, pause };
};
