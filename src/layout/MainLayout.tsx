// @ts-nocheck
import {Outlet} from 'react-router-dom'
import {Typography, Link, Divider, Stack} from '@mui/material'
import DataLoadForm from '../components/DataLoadForm'
import DataLoadAndMatchForm from '@/components/DataLoadAndMatchForm'

const MainLayout = () => {
  return (
    <div>
        <div style={{margin: "1rem 1rem"}}>
          <Typography variant="h1">Tutor-Tutee Matching Tool</Typography>
          <Link variant="h4" sx={{ marginBottom: "0.5em", display:"block"}} target="_blank" href="https://docs.google.com/spreadsheets/d/1Xj0zkL2h0nyUR25NKtCIv3QVjZee6bLyWUdpbxVCVT0/edit#gid=0">Information about this tool</Link>
          {/* <DataLoadForm/> */}
          <DataLoadAndMatchForm/>
          {/* <Stack justifyContent="center" direction="row">
            <Divider sx={{width: "90vw"}} />
          </Stack> */}
          <Outlet/>
        </div>
    </div>
  )
}

export default MainLayout