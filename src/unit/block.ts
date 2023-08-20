import { BlockType, IBlock } from '../types';
import { List } from 'immutable';
import { blockShape } from '../constant';

function setXY(type: BlockType) {
	if (type === 'I') {
		return List([0, 3]);
	} else {
		return List([-1, 4]);
	}
}
export class Block {
	type: BlockType;
	timeStamp: number;
	shape: List<List<number>>;
	xy: List<number>;
	rotateIndex: number;
	constructor(options: IBlock) {
		const { type, timeStamp, shape, rotateIndex, xy } = options;
		this.type = type;
		this.timeStamp = timeStamp ?? Date.now();
		this.shape = shape ?? List(blockShape[type].map((e) => List(e)));
		this.xy = xy ?? setXY(type);
		// this.xy = List([1, 3]);
		this.rotateIndex = rotateIndex ?? 0;
	}

	/**
	 * @description 降落
	 * 通过不断改变xy的值实现
	 */
	fall(n = 1): IBlock {
		const index = this.xy.get(0)! + n;
		return {
			shape: this.shape,
			type: this.type,
			xy: List([index, this.xy.get(1)!]),
			rotateIndex: this.rotateIndex,
			timeStamp: Date.now()
		};
	}
}
