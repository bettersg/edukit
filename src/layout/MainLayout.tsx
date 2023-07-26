// @ts-nocheck
import {Outlet} from 'react-router-dom'

import DataLoadForm from '../components/DataLoadForm'
import DataLoadAndMatchForm from '@/components/DataLoadAndMatchForm'


const MainLayout = () => {
  return (
    <div>
        <div style={{margin: "1rem 1rem"}}>
          <h1 className="h1 mb-2">Tutor-Tutee Matching Tool</h1>
          <a className="h4 link mb-4 block" href="https://docs.google.com/spreadsheets/d/1Xj0zkL2h0nyUR25NKtCIv3QVjZee6bLyWUdpbxVCVT0/edit#gid=0">Information about this tool</a>
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