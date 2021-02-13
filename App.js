import React from 'react';

import EntryPoint from './EntryPoint';

// Redux
import { Provider } from 'react-redux';
import store from './logic/store';

import Modal from "./logic/components/Layout/Modal";

const App = () => {
  return (
		<Provider store={store}>
			<EntryPoint />
			<Modal />
		</Provider>
	);
};

export default App;
