import { expect, afterEach, afterAll, beforeAll } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import {server} from './server.js'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))



// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
  server.resetHandlers();
});


afterAll(() => server.close())