/**
 * @description 按钮
 * @date: 2023-08-19
 */
import style from './style.module.less';
import cn from 'classnames';
type activeType = () => void;
interface Props {
	active: activeType;
	color: string;
	size: string;
	top: number;
	left: number;
	label: string;
	arrow?: string;
	position?: boolean;
}
export const Button = (props: Props) => {
	const { active, color, size, top, left, label, arrow, position } = props;
	return (
		<div
			className={cn({
				[style.button]: true,
				[style[color]]: true,
				[style[size]]: true
			})}
			onClick={active}
			style={{ top, left }}
		>
			<i className={cn({ [style.active]: active })} />
			{size === 's1' && (
				<em
					style={{
						transform: `${arrow} scale(1,2)`
					}}
				/>
			)}
			<span className={cn({ [style.position]: position })}>{label}</span>
		</div>
	);
};
