// @ts-nocheck
import {Outlet} from 'react-router-dom'
import {Typography, Stack} from '@mui/material'
import DataLoadForm from '../components/DataLoadForm'
import DataLoadAndMatchForm from '@/components/DataLoadAndMatchForm'
const MainLayout = () => {
  return (
    <>
        <Stack direction="row" alignItems="center" justifyContent="center">
        <Typography variant="h3">Tutor-Tutee Matching Tool</Typography>
        </Stack>
        {/* <DataLoadForm/> */}
        <DataLoadAndMatchForm/>
        <Outlet/>
    </>
  )
}

export default MainLayout