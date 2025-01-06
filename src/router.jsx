import App from './App';
import Error from './Error';
import { createBrowserRouter } from 'react-router-dom';

const routes = [
	{
		path: '/',
		errorElement: <Error />,
		element: <App />,
	},
	{
		path: '/:content',
		element: <App />,
	},
];

const router = createBrowserRouter(routes);

export default router;
