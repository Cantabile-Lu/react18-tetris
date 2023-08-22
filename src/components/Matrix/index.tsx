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

const Matrix = memo(() => {
	const { matrix, cur } = useSelector((store: RootState) => {
		return {
			matrix: store.matrixSlice.matrix,
			cur: store.curSlice.cur //当前方块
		};
	}, shallowEqual);

	const [clearLines, setClearLines] = useState<number[]>([]); //消除的行数

	useEffect(() => {
		const clearLines = isClear(matrix);
		setClearLines(clearLines);
	}, [matrix]);
	const getResult = () => {
		let matrixData = matrix;
		if (cur) {
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
