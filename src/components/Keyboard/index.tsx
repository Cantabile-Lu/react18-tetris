/**
 * @description 键盘组件
 * @date: 2023-08-19
 */

import style from './style.module.less';
import { Button } from './Button';
export const Keyboard = () => {
	return (
		<div className={style.keyboard}>
			<Button
				color="blue"
				size="s1"
				top={0}
				left={374}
				label={'上'}
				arrow="translate(0, 63px)"
				position
				active={() => {}}
			/>
			<Button
				color="blue"
				size="s1"
				top={180}
				left={374}
				label={'下'}
				arrow="translate(0,-71px) rotate(180deg)"
				active={() => {}}
			/>
			<Button
				color="blue"
				size="s1"
				top={90}
				left={284}
				label={'左'}
				arrow="translate(60px, -12px) rotate(270deg)"
				active={() => {}}
			/>
			<Button
				color="blue"
				size="s1"
				top={90}
				left={464}
				label={'右'}
				arrow="translate(-60px, -12px) rotate(90deg)"
				active={() => {}}
			/>
			<Button
				color="blue"
				size="s0"
				top={100}
				left={52}
				label={`开始`}
				active={() => {
					console.log(`🚀🚀🚀🚀🚀-> in index.tsx on 54`, `开始`);
				}}
			/>
			<Button
				color="red"
				size="s2"
				top={0}
				left={196}
				label={`R`}
				active={() => {}}
			/>
			<Button
				color="green"
				size="s2"
				top={0}
				left={106}
				label={`S`}
				active={() => {}}
			/>
			<Button
				color="green"
				size="s2"
				top={0}
				left={16}
				label={`P`}
				active={() => {}}
			/>
		</div>
	);
};
