import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { registerSW } from 'virtual:pwa-register';
import { AuthProvider } from './store/authStore.jsx';

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available. Reload?')) {
      updateSW(true);
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
);


