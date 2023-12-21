import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/store/store';

export const createWrapper = () => {
  return ({ children }) => <BrowserRouter>{children}</BrowserRouter>;
};

export const renderWithBrowserRouter = (ui: ReactElement) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{ui}</BrowserRouter>
    </Provider>,
  );
};
