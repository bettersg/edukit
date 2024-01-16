import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { CustomFlowbiteTheme, Flowbite } from 'flowbite-react';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export const theme: CustomFlowbiteTheme = {
  navbar: {
    link: {
      active: {
        on: 'bg-yellow-500 text-white dark:text-white md:bg-transparent md:text-yellow-500',
        off: 'border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-yellow-500 md:dark:hover:bg-transparent md:dark:hover:text-white',
      },
    },
  },
  card: {
    img: {
      // base: 'h-[400px] object-cover object-top',
    },
  },
};

const router = createBrowserRouter([{ path: '*', element: <App /> }]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Flowbite theme={{ theme: theme }}>
      <RouterProvider router={router} />
    </Flowbite>
  </React.StrictMode>,
);
