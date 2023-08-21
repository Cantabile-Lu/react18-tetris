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
	fall(n = 1): Required<IBlock> {
		const index = this.xy.get(0)! + n;
		return {
			shape: this.shape,
			type: this.type,
			xy: List([index, this.xy.get(1)!]),
			rotateIndex: this.rotateIndex,
			timeStamp: Date.now()
		};
	}

	/**
	 * @description 左移动
	 */
	left(): Required<IBlock> {
		return {
			shape: this.shape,
			type: this.type,
			xy: List([this.xy.get(0)!, this.xy.get(1)! - 1]),
			rotateIndex: this.rotateIndex,
			timeStamp: this.timeStamp
		};
	}

	right(): Required<IBlock> {
		return {
			shape: this.shape,
			type: this.type,
			xy: List([this.xy.get(0)!, this.xy.get(1)! + 1]),
			rotateIndex: this.rotateIndex,
			timeStamp: this.timeStamp
		};
	}

	// 旋转
	rotate(): Required<IBlock> {
		const shape = this.shape;
		let result: List<List<number>> = List([]);
		shape.forEach((m) =>
			m.forEach((n, k) => {
				const index = m.size - k - 1;
				if (result.get(index) === undefined) {
					// 如果没有这一行, 则创建
					result = result.set(index, List([]));
				}
				const tempK = result.get(index)!.push(n);
				result = result.set(index, tempK);
			})
		);
		const origin = {
			I: [
				[-1, 1],
				[1, -1]
			],
			L: [[0, 0]],
			J: [[0, 0]],
			Z: [[0, 0]],
			S: [[0, 0]],
			O: [[0, 0]],
			T: [
				[0, 0],
				[1, 0],
				[-1, 1],
				[0, -1]
			]
		};
		// 旋转后的xy
		const nextXy = List([
			this.xy.get(0)! + origin[this.type][this.rotateIndex][0],
			this.xy.get(1)! + origin[this.type][this.rotateIndex][1]
		]);
		// 旋转后的index
		const nextRotateIndex =
			this.rotateIndex + 1 >= origin[this.type].length
				? 0
				: this.rotateIndex + 1;
		return {
			shape: result,
			type: this.type,
			xy: nextXy,
			rotateIndex: nextRotateIndex,
			timeStamp: this.timeStamp
		};
	}
}
