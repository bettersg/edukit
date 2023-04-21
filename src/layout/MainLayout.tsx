import {Outlet} from 'react-router-dom'
import {Typography, Stack} from '@mui/material'
import DataLoadForm from '../components/DataLoadForm'
const MainLayout = () => {
  return (
    <>
        <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography variant="h3">Tutor-Tutee Matching Tool</Typography>
        </Stack>
        <DataLoadForm/>  
        <Outlet/>
    </>
  )
}

export default MainLayout