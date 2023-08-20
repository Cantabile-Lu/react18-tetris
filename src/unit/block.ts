import { Block } from '../types';
import { List } from 'immutable';
import { blockShape } from '../constant';

export const createBlock = (options: Block): Block => {
	const { type, timeStamp, shape, xy, rotateIndex } = options;
	function setXY(): List<number> {
		if (type === 'I') {
			return List([0, 3]);
		} else {
			return List([-1, 4]);
		}
	}
	options.xy = setXY();
	return {
		type,
		timeStamp: timeStamp ?? Date.now(),
		shape: shape ?? List(blockShape[type].map((e) => List(e))),
		xy,
		rotateIndex: rotateIndex ?? 0
	};
};
