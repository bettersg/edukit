import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// @ts-nocheck
import MainLayout from './layout/MainLayout'
import OverviewPage from './pages/OverviewPage'
import MatchDetailsPage from './pages/MatchDetailsPage'
import { StyledEngineProvider, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css'

const theme = createTheme({
  typography: {
    h1: { fontSize: '5rem' },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 525,
      md: 768,
      lg: 1024,
      xl: 1280,
      // '2xl': 1536,
      // '3xl': 1920,
      // '4xl': 2560,
      // '5xl': 3200,
    },
  },
});


function App() {
  const [count, setCount] = useState(0)

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={responsiveFontSizes(theme, { breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'], factor: 5 })}>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<MainLayout/>}>
            <Route index element={<OverviewPage/>}></Route>
            <Route path="/details" element={<MatchDetailsPage/>}></Route>
          </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  )
}

export default App
