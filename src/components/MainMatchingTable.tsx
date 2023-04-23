// @ts-nocheck
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux';
import {selectedTutorMatchesActions} from "../store/selectedTutorMatchesSlice"
import {Stack} from '@mui/material'
import {DataGrid, GridColDef, GridEventListener, GridValueGetterParams} from '@mui/x-data-grid'

const MainMatchingTable = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
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
      const handleRowClick : GridEventListener = (params, event, details) => {
        const tutorIndex = parseInt(params.row.Tutor.split("-")[1])
        const tutor = window.tutorRawData.find((row)=>(parseInt(row.index) === tutorIndex))
        const tutee1 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee1))) 
        const tutee2 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee2)))
        const tutee3 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee3)))
        const tutee4 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee4)))
        const tutee5 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee5)))
        // console.log(tutorIndex, tutee1, tutee2, tutee3, tutee4, tutee5)
        // console.log(window.tutorRawData)
        // console.log(window.tuteeRawData)
        console.log(tutor, tutee1, tutee2, tutee3, tutee4, tutee5)
        navigate("/details")
      }

  return (
    <>
        <Stack alignItems="center">
        <h2>
        MainMatchingTable
        </h2>
        <DataGrid  rows={rows} columns={columns} onRowClick={handleRowClick}/>
        </Stack>
    </>
  )
}

export default MainMatchingTable