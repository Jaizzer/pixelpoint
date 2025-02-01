import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import GlobalFonts from './fonts';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<GlobalFonts />
		<RouterProvider router={router} />
	</StrictMode>
);
