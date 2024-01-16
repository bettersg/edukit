import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Index from './routes/index.tsx';

const About = React.lazy(() => import('./routes/about.tsx'));

export function Fallback() {
  return (
    <div className="flex items-center justify-center w-full p-16">
      <p>Loading...</p>
    </div>
  );
}

function NotFound() {
  return <div>Not Found</div>;
}

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<Index />} />
        <Route
          path="/about"
          element={
            <React.Suspense fallback={<Fallback />}>
              <About />
            </React.Suspense>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
