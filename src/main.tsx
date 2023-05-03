import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ConfigProvider } from 'antd';
import { AntDesingTheme } from './settings/ant-desing-setting/theme';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import './App.css';
import { AppRouter } from './router/AppRouter';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider theme={AntDesingTheme}>
				<HashRouter>
					<AppRouter />
				</HashRouter>
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);
