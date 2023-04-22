import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// @ts-nocheck
import MainLayout from './layout/MainLayout'
import OverviewPage from './pages/OverviewPage'
import MatchDetailsPage from './pages/MatchDetailsPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<OverviewPage/>}></Route>
          <Route path="/details" element={<MatchDetailsPage/>}></Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
