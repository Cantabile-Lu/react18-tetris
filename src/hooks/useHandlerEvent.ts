import { useDispatch } from 'react-redux';
import { changeCur } from '../store/cur';
import { store } from '../store';
import { setMatrixLine, want } from '../unit';
import { IBlock } from '../types';
import { useRef } from 'react';
import matrix, { changeMatrix } from '../store/matrix';

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
				timer.current = window.setTimeout(fall, 1000);
			} else {
				const newMatrix = setMatrixLine(cur, selector().matrixSlice.matrix);
				dispatch(changeMatrix(newMatrix));
				dispatch(changeCur({ type: 'L' }));
				fall();
			}
			// 重置当前可移动块
		};
		clearTimeout(timer.current);
		timer.current = window.setTimeout(fall, 1000);
	};
	// 开始游戏
	const start = () => {
		// 1: 开始动画
		// 2: 开始音效
		// 3:  设置难度起始行
		// 4:  设置当前可移动块
		dispatch(changeCur({ type: 'T' }));
		// 5:  设置下一个可移动块
		// 6:  开始自动落下
		auto();
	};
	return { start };
};
