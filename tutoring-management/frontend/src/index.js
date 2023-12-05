import ReactDOM from 'react-dom/client';

//
import App from './App';
import * as serviceWorker from './serviceWorker';
import { UserContextProvider } from './UserContext';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <UserContextProvider>
        <App />
    </UserContextProvider>
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

