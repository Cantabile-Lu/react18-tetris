import style from './style.module.less';
import * as classNames from 'classnames';
import Decorate from '../../components/Decorate';
function App() {
	return (
		<div className={style.app}>
			<div
				className={classNames({
					[style.rect]: true,
					[style.drop]: true
				})}
			>
				<Decorate />
			</div>
		</div>
	);
}

export default App;
