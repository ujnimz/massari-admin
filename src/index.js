import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';

// Redux Store
import {store} from './redux/store';
import {Provider} from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SnackbarProvider>
    </Provider>
  </React.StrictMode>,
);
