import ErrorBoundary from 'antd/es/alert/ErrorBoundary'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ConfigProvider } from 'antd'
import { AntDesingTheme } from './settings/ant-desing-setting/theme'
import MainLayout from './layouts/MainLayouts'
import AppRouter from './routes/AppRouter'
import { HashRouter } from 'react-router-dom';
import './App.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <ConfigProvider theme={AntDesingTheme}>
          <MainLayout>
            <HashRouter>
              <AppRouter />
            </HashRouter>
          </MainLayout>
        </ConfigProvider>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>,
)
