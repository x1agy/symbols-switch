import ConfigProvider from 'antd/es/config-provider';
import theme from 'antd/es/theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={{ algorithm: theme.darkAlgorithm }}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
