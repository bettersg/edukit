import { useSelector } from 'react-redux';
import {Stack} from '@mui/material'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'

const MainMatchingTable = () => {
    const matchingTable = useSelector((state)=>state.matchesSummary)
    const columns: GridColDef[] = [
        { field: 'Tutor', headerName: 'Tutor', width: 130 },
        { field: 'Tutee1', headerName: 'Tutee-1', width: 70, type: 'number'},
        { field: 'Tutee2', headerName: 'Tutee-2', width: 70, type: 'number'},
        { field: 'Tutee3', headerName: 'Tutee-3', width: 70, type: 'number'},
        { field: 'Tutee4', headerName: 'Tutee-4', width: 70, type: 'number'},
        { field: 'Tutee5', headerName: 'Tutee-5', width: 70, type: 'number'},
      ];
      
      const rows = matchingTable.map((tutorDetail, idx)=>{
        // console.log(idx, tutorDetail)
        return {id:idx, Tutor:tutorDetail.tutor, Tutee1: tutorDetail.tutee1, Tutee2: tutorDetail.tutee2, Tutee3: tutorDetail.tutee3, Tutee4: tutorDetail.tutee4, Tutee5: tutorDetail.tutee5}
      })

  return (
    <>
        <Stack alignItems="center">
        <h2>
        MainMatchingTable
        </h2>
        <DataGrid  rows={rows} columns={columns}/>
        </Stack>
    </>
  )
}

export default MainMatchingTable