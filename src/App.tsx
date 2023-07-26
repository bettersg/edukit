import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

// @ts-nocheck
import MainLayout from './layout/MainLayout'
import OverviewPage from './pages/OverviewPage'
import MatchDetailsPage from './pages/MatchDetailsPage'

import './index.css'

import { Flowbite, type CustomFlowbiteTheme } from 'flowbite-react'



export const FlowbiteTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: 'dark:bg-blue-600 dark:hover:bg-blue-700 focus:ring-blue-300 text-white bg-blue-700 hover:bg-blue-800 dark:focus:ring-blue-800',
      gray: "text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    },
  },
  checkbox: {
    root: {
      base: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
    }
  },
  select: {
    field: {
      select: {
        colors: {
          primary: "focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 border border-gray-300 text-gray-900 "
        }
      }
    }
  }
};

export const CustomTheme = {
  link: {
    primary: {
      textColor: "text-blue-600 dark:text-blue-500"
    }
  }
}



function App() {
  const [count, setCount] = useState(0)

  return (
    <Flowbite theme={{theme: FlowbiteTheme as CustomFlowbiteTheme}}>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<OverviewPage/>}></Route>
          <Route path="/details" element={<MatchDetailsPage/>}></Route>
        </Route>
        </Routes>
      </BrowserRouter>
    </Flowbite>
  )
}

export default App
