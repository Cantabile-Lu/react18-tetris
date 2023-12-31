/**
 * @description 矩阵组件
 */
import { memo, useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import classnames from 'classnames';
import { RootState } from '../../store';
import style from './style.module.less';
import { isClear, setMatrixLine } from '../../unit';
import { List } from 'immutable';
import { useHandlerEvent } from '../../hooks/useHandlerEvent.ts';

const Matrix = memo(() => {
	const { clear } = useHandlerEvent();
	const { matrix, cur } = useSelector((store: RootState) => {
		return {
			matrix: store.matrixSlice.matrix,
			cur: store.curSlice.cur //当前方块
		};
	}, shallowEqual);

	const [animateColor, setAnimateColor] = useState(0);
	const [clearLines, setClearLines] = useState<number[]>([]);

	useEffect(() => {
		const clears = isClear(matrix);
		setClearLines(clears);
		if (clears.length) {
			// 有可消除的行, 执行消除行动画
			clearAnimate(clears);
		}
	}, [matrix]);

	const t = window.setTimeout;
	type noop = () => void;

	const clearAnimate = (lines: number[]) => {
		const anima = (callback: noop) => {
			t(() => {
				setAnimateColor(0);
				t(() => {
					setAnimateColor(2);
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
						clear(matrix, lines);
					}, 100);
				});
			});
		});
	};
	const getResult = () => {
		let matrixData = matrix;
		if (clearLines.length) {
			const colors = Array(10).fill(animateColor);
			clearLines.forEach((line) => {
				matrixData = matrixData.set(line, List(colors));
			});
		} else if (cur) {
			//shape ->  I : [[1,1,1,1]]
			//shape ->  T: [
			// 		[0, 1, 0],
			// 		[1, 1, 1]
			// 	]
			matrixData = setMatrixLine(cur, matrixData);
		}
		return matrixData;
	};
	const data = getResult();
	return (
		<div className={style.matrix}>
			{data.map((p, k1) => (
				<p key={k1}>
					{p.map((e, k2) => (
						<b
							className={classnames({
								c: e === 1,
								d: e === 2
							})}
							key={k2}
						/>
					))}
				</p>
			))}
		</div>
	);
});

export default Matrix;
