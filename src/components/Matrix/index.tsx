/**
 * @description 矩阵组件
 */
import { memo } from 'react';
interface Props {
	matrix: number[];
	cur: object;
}
const Matrix = memo((props: Props) => {
	return <div>{props.name}</div>;
});

export default Matrix;
