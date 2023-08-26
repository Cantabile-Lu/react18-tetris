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
import { useRef, useState } from 'react';
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

	const [lines, setLines] = useState<number[]>([]);
	const [animateColor, setAnimateColor] = useState(0);

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

	// 下一个方块
	const nextAround = (matrix: Matrix) => {
		let newMatrix = matrix;
		clearTimeout(timer.current);

		// 判断是否结束
		if (isGameOver(newMatrix)) {
			return;
		}

		// 是否有可消除行
		const clearLines = isClear(newMatrix);
		console.log(`🚀🚀🚀🚀🚀-> in useHandlerEvent.ts on 69`, clearLines);
		if (clearLines.length) {
			// 有消除行, 执行变色动画, 在调用下一个方块
			const colors = Array(10).fill(animateColor);
			clearLines.forEach((line) => {
				// 设置动画
				newMatrix = newMatrix.set(line, List(colors));
			});
		}
		dispatch(changeMatrix(newMatrix));
		// 设置下一个可移动块
		dispatch(changeCur({ type: 'O' }));
		auto();
	};
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
	return { start, move, rotate, down, pause };
};
