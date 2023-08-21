import { useDispatch } from 'react-redux';
import { changeCur } from '../store/cur';
import { store } from '../store';
import { getNextBlock, isGameOver, setMatrixLine, want } from '../unit';
import { IBlock, Matrix } from '../types';
import { useRef } from 'react';
import { changeMatrix } from '../store/matrix';

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
				// 获取当前块并设置新的矩阵
				const newMatrix = setMatrixLine(cur, selector().matrixSlice.matrix);
				// 块触底
				console.log(
					`🚀🚀🚀🚀🚀-> in useHandlerEvent.ts on 37`,
					'当前block触底'
				);
				nextAround(newMatrix);
			}
			// 重置当前可移动块
		};
		clearTimeout(timer.current);
		timer.current = window.setTimeout(fall, 1000);
	};

	// 下一个方块
	const nextAround = (matrix: Matrix) => {
		dispatch(changeMatrix(matrix));

		// 判断是否结束
		if (isGameOver(matrix)) {
			return;
		}
		// 设置下一个可移动块
		dispatch(changeCur({ type: getNextBlock() }));
		// 继续调用
		auto();
	};

	/**
	 * 1: 如果是生产-批发-零售花椒,辣椒这类产品需要注册
	 * 什么行业门类?
	 * 什么行业类别?
	 * 什么经营范围?
	 * 2: 经营这类产品需要食品经营许可证或者食品生产许可证吗?
	 * 3: 如果需要食品许可证的话, 生产地址是填家里的地址吗? 家里需要证件吗?
	 */
	// 开始游戏
	const start = () => {
		// 1: 开始动画
		// 2: 开始音效
		// 3:  设置难度起始行
		// 4:  设置当前可移动块
		dispatch(changeCur({ type: getNextBlock() }));
		// 5:  设置下一个可移动块
		// 6:  开始自动落下
		auto();
	};
	return { start };
};
