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
import { List } from 'immutable';
import { blankLine, speeds } from '../constant';
import { changePause } from '../store/pause';
import { Music } from '../unit/Music.ts';
import { changeLock } from '../store/lock';

/**
 * @description 处理事件
 * @date: 2023-08-19
 */

type MusicType = {
	start: () => void;
	clear: () => void;
	fall: () => void;
	gameOver: () => void;
	rotate: () => void;
	move: () => void;
};
const defaultMusic: MusicType = {
	start: () => {},
	clear: () => {},
	fall: () => {},
	gameOver: () => {},
	rotate: () => {},
	move: () => {}
};
export const useHandlerEvent = () => {
	const selector = store.getState;
	const dispatch = useDispatch();
	const timer = useRef(0);

	const [music, setMusic] = useState<MusicType>(defaultMusic);

	const auto = (timeout = 0) => {
		const out = timeout < 0 ? 500 : timeout;
		// 自动降落函数
		const fall = () => {
			// 获取当前可移动块
			const cur = selector().curSlice.cur!;
			// 调用块降落函数, 增加xy种的x值
			const next = cur.fall();
			let newMatrix = selector().matrixSlice.matrix;
			// 比较是否触底
			const isWant = want(next as Required<IBlock>, newMatrix);
			if (isWant) {
				dispatch(changeCur(next));
				// 递归调用自身
				timer.current = window.setTimeout(
					fall,
					speeds[selector().speedRunSlice.speedRun] - 1
				);
			} else {
				// 获取当前块并设置新的矩阵
				newMatrix = setMatrixLine(cur, newMatrix);
				// 块触底
				nextAround(newMatrix);
			}
			// 重置当前可移动块
		};
		clearTimeout(timer.current);
		timer.current = window.setTimeout(fall, out);
	};
	const clear = (matrix: Matrix, lines: number[]) => {
		lines.forEach((line) => {
			// 清除 一行
			matrix = matrix.splice(line, 1);
			// 补齐一行空白格
			matrix = matrix.unshift(List(blankLine));
		});
		// 清除之后从新设置矩阵
		dispatch(changeMatrix(matrix));
	};
	// 下一个方块
	const nextAround = (matrix: Matrix) => {
		clearTimeout(timer.current);

		dispatch(changeMatrix(matrix));
		// 判断是否结束
		if (isGameOver(matrix)) {
			music.gameOver();
			overStart();
			return;
		}
		// 是否清除
		if (isClear(matrix).length) {
			music.clear();
		}

		setTimeout(() => {
			// 设置下一个可移动块
			dispatch(changeCur({ type: getNextBlock() }));
			auto();
		}, 100);
	};

	// 开始游戏
	const start = () => {
		// 1: 开始动画
		// 2: 开始音效

		music.start();
		// 3:  设置难度起始行
		// 4:  设置当前可移动块
		dispatch(changeCur({ type: getNextBlock() }));
		auto();
		// 5:  设置下一个可移动块
		// 6:  开始自动落下
	};
	const space = () => {
		const cur = selector().curSlice.cur;
		// 如果被锁, 则不能开始
		if (selector().lockSlice.lock) {
			return;
		}
		// 如果游戏已经开始, 那么表示的是迅速落下
		if (cur) {
			music.fall();
			// 游戏已经开始, 如果是暂停状态,则解除暂停
			if (selector().pauseSlice.pause) {
				pause(false);
				return;
			}
			let index = 0;
			// 获取到底部的块
			let bottom = cur.fall(index);
			while (want(bottom, selector().matrixSlice.matrix)) {
				bottom = cur.fall(index);
				// 递增
				index++;
			}
			bottom = cur.fall(index - 2);

			dispatch(changeCur(bottom));
			let matrix = selector().matrixSlice.matrix;
			matrix = setMatrixLine(bottom, matrix);
			nextAround(matrix);
		} else {
			start();
		}
	};

	const overStart = () => {
		dispatch(changeLock(true));
	};
	// 左右移动块
	const move = (isRight: boolean) => {
		if (selector().lockSlice.lock) {
			return;
		}
		const cur = selector().curSlice.cur;
		music.move();

		if (cur) {
			if (selector().pauseSlice.pause) {
				pause(false);
				return; // 如果本次操作仅仅是解除暂停, 则不进行移动
			}
			const next = isRight ? cur.right() : cur.left();
			if (want(next, selector().matrixSlice.matrix)) {
				dispatch(changeCur(next));
			}
		}
	};

	// 旋转块
	const rotate = () => {
		const cur = selector().curSlice.cur;
		music.rotate();
		if (cur) {
			if (selector().pauseSlice.pause) {
				pause(false);
				return; // 如果本次操作仅仅是解除暂停, 则不进行移动
			}
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
		music.move();
		if (isPause) {
			pause(false);
			return;
		}
		if (cur) {
			if (selector().pauseSlice.pause) {
				pause(false);
				return; // 如果本次操作仅仅是解除暂停, 则不进行移动
			}
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

	const s = () => {
		const musicTarget = new Music('./music.mp3');
		setMusic(musicTarget);
	};
	return { start, space, move, rotate, down, pause, clear, s };
};
