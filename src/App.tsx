import { Provider } from 'react-redux';

import { store } from './store';
import Containers from './pages/containers/index.tsx';

function App() {
	return (
		<Provider store={store}>
			<Containers />
		</Provider>
	);
}

export default App;
