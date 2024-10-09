import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';
import AuthProvider from './context/AuthContext';
import './i18n';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

// <React.StrictMode>
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
