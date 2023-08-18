import style from './style.module.less';
import classNames from 'classnames';
import Decorate from '../../components/Decorate';
import Matrix from '../../components/Matrix';
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
				<div className={style.screen}>
					<div className={style.panel}>
						<Matrix />
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
