import React from 'react';

import EntryPoint from './EntryPoint';

// Redux
import { Provider } from 'react-redux';
import store from './logic/store';

const App = () => {
  return (
    <Provider store={store}>
      <EntryPoint />
    </Provider>
  );
};

export default App;
