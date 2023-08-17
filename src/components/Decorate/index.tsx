import { memo } from 'react';
import cn from 'classnames';
import style from './style.module.less';

const Index = memo(() => {
	return (
		<>
			<div className={style.decorate}>
				<div className={style.topBorder}>
					<span className={cn(['l', style.mr])} style={{ width: 40 }} />
					<span className={cn(['l', style.mr])} />
					<span className={cn(['l', style.mr])} />
					<span className={cn(['l', style.mr])} />
					<span className={cn(['l', style.mr])} />
					<span className={cn(['r', style.ml])} style={{ width: 40 }} />
					<span className={cn(['r', style.ml])} />
					<span className={cn(['r', style.ml])} />
					<span className={cn(['r', style.ml])} />
					<span className={cn(['r', style.ml])} />
				</div>
				<h1>俄罗斯方块</h1>
				<div className={style.view}>
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<b className="c" />
					<div className="clear" />
					<em />
					<b className="c" />
					<p />
					<em />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<b className="c" />
					<div className="clear" />
					<em />
					<b className="c" />
					<p />
					<b className="c" />
					<b className="c" />
					<b className="c" />
					<b className="c" />
					<p />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<p />
					<b className="c" />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<p />
					<em />
					<b className="c" />
					<div className="clear" />
					<em />
					<b className="c" />
					<div className="clear" />
					<em />
					<b className="c" />
					<div className="clear" />
					<em />
					<b className="c" />
				</div>
				<div className={cn([style.view, style.l])}>
					<em />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<p />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<p />
					<b className="c" />
					<b className="c" />
					<b className="c" />
					<b className="c" />
					<p />
					<em />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<b className="c" />
					<div className="clear" />
					<em />
					<b className="c" />
					<p />
					<b className="c" />
					<b className="c" />
					<div className="clear" />
					<em />
					<b className="c" />
					<div className="clear" />
					<em />
					<b className="c" />
					<p />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
					<div className="clear" />
					<b className="c" />
				</div>
			</div>
		</>
	);
});
Index.displayName = 'Index';
export default Index;
