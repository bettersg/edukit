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
        { field: 'Tutor', headerName: 'Tutor_Name+Id', width: 130 },
        { field: 'Tutee1', headerName: 'Tutee-1', width: 70, type: 'number'},
        { field: 'Tutee2', headerName: 'Tutee-2', width: 70, type: 'number'},
        { field: 'Tutee3', headerName: 'Tutee-3', width: 70, type: 'number'},
        { field: 'Tutee4', headerName: 'Tutee-4', width: 70, type: 'number'},
        { field: 'Tutee5', headerName: 'Tutee-5', width: 70, type: 'number'},
      ];
      const rows = matchingTable.map((tutorDetail, idx)=>{
        // console.log(idx, tutorDetail)
        return {id:idx, Tutor:(tutorDetail.tutor.name + " - "+String(tutorDetail.tutor.index)), Tutee1: tutorDetail.tutee1.index, Tutee2: tutorDetail.tutee2.index, Tutee3: tutorDetail.tutee3.index, Tutee4: tutorDetail.tutee4.index, Tutee5: tutorDetail.tutee5.index}
      })
      const handleRowClick : GridEventListener = (params, event, details) => {
        const tutorIndex = parseInt(params.row.Tutor.split("-")[1])
        const tutor = window.tutorRawData.find((row)=>(parseInt(row.index) === tutorIndex))
        const tutorMatchSummary = matchingTable.find((matchItem)=>(matchItem.tutor.index==tutorIndex))
        console.log(tutorMatchSummary)
        let tutee1 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee1)))
        tutee1 = {...tutee1, matchingScore:(tutorMatchSummary.tutee1.matchingScore)} 
        let tutee2 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee2)))
        tutee2 = {...tutee2, matchingScore:tutorMatchSummary.tutee2.matchingScore}
        let tutee3 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee3)))
        tutee3 = {...tutee3, matchingScore:tutorMatchSummary.tutee3.matchingScore}
        let tutee4 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee4)))
        tutee4 = {...tutee4, matchingScore:tutorMatchSummary.tutee4.matchingScore}
        let tutee5 = window.tuteeRawData.find((row)=>(parseInt(row.index) === parseInt(params.row.Tutee5)))
        tutee5 = {...tutee5, matchingScore:tutorMatchSummary.tutee5.matchingScore}
        // console.log(tutor, tutee1, tutee2, tutee3, tutee4, tutee5)
        const tuteeInfo = [tutee1, tutee2, tutee3, tutee4, tutee5]
        const selectedTutorMatchesState = {
          tutor: tutor,
          tuteeInfo
        }
        console.log(selectedTutorMatchesState)
        dispatch(selectedTutorMatchesActions.updateSelectedTutorMatches(selectedTutorMatchesState))
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