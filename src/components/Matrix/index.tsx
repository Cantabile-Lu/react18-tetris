/**
 * @description 矩阵组件
 */
import { memo } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import classnames from 'classnames';
import { RootState } from '../../store';
import style from './style.module.less';

const Matrix = memo(() => {
	const { matrix } = useSelector((store: RootState) => {
		return {
			matrix: store.matrixSlice.matrix
		};
	}, shallowEqual);
	return (
		<div className={style.matrix}>
			{matrix.map((p, k1) => (
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
