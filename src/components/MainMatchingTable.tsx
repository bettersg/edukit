// @ts-nocheck
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux';
import { Tutee, Tutor } from '@/types/person';

import { selectedTuteeMatchesActions } from '../store/selectedTuteeMatchesSlice'; 
import {DataGrid, GridColDef, GridEventListener, GridValueGetterParams} from '@mui/x-data-grid'

const MainMatchingTable = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const matchingTable = useSelector((state)=>state.matchesSummary)
    const columns: GridColDef[] = [
        { field: 'Tutee', headerName: 'Tutee Name — Row', width: 170 },
        { field: 'Tutor1', headerName: 'Tutor 1', width: 70, type: 'number'},
        { field: 'Tutor2', headerName: 'Tutor 2', width: 70, type: 'number'},
        { field: 'Tutor3', headerName: 'Tutor 3', width: 70, type: 'number'},
        { field: 'Tutor4', headerName: 'Tutor 4', width: 70, type: 'number'},
        { field: 'Tutor5', headerName: 'Tutor 5', width: 70, type: 'number'},
      ];
      const rows = matchingTable.map((tuteeDetail, idx)=>{
        return {id:idx, Tutee:(tuteeDetail.tutee.name + " - "+String(tuteeDetail.tutee.index)), Tutor1: tuteeDetail.tutor1.index, Tutor2: tuteeDetail.tutor2.index, Tutor3: tuteeDetail.tutor3.index, Tutor4: tuteeDetail.tutor4.index, Tutor5: tuteeDetail.tutor5.index}
      })
      // console.log("Matched data:")
      // console.log(rows)
      // const rows = matchingTable.map((tutorDetail, idx)=>{
      //   return {id:idx, Tutor:(tutorDetail.tutor.name + " - "+String(tutorDetail.tutor.index)), Tutee1: tutorDetail.tutee1.index, Tutee2: tutorDetail.tutee2.index, Tutee3: tutorDetail.tutee3.index, Tutee4: tutorDetail.tutee4.index, Tutee5: tutorDetail.tutee5.index}
      // })
      const handleRowClick : GridEventListener = (params, event, details) => {
        const tuteeIndex = parseInt(params.row.Tutee.split("-")[1])
        const tutee = window.tuteeParsedData.find((row:Tutee)=>(parseInt(row.personalData.index) === tuteeIndex))
        const tuteeMatchSummary = matchingTable.find((matchItem)=>(matchItem.tutee.index==tuteeIndex))
        const tutorParsedData: Tutor[] = window.tutorParsedData
        let tutor1 = tutorParsedData.find((row)=>(parseInt(row.personalData.index) === parseInt(params.row.Tutor1)))
        tutor1 = {...tutor1, matchingScore:(tuteeMatchSummary.tutor1.matchingScore)} 
        let tutor2 = tutorParsedData.find((row)=>(parseInt(row.personalData.index) === parseInt(params.row.Tutor2)))
        tutor2 = {...tutor2, matchingScore:tuteeMatchSummary.tutor2.matchingScore}
        let tutor3 = tutorParsedData.find((row)=>(parseInt(row.personalData.index) === parseInt(params.row.Tutor3)))
        tutor3 = {...tutor3, matchingScore:tuteeMatchSummary.tutor3.matchingScore}
        let tutor4 = tutorParsedData.find((row)=>(parseInt(row.personalData.index) === parseInt(params.row.Tutor4)))
        tutor4 = {...tutor4, matchingScore:tuteeMatchSummary.tutor4.matchingScore}
        let tutor5 = tutorParsedData.find((row)=>(parseInt(row.personalData.index) === parseInt(params.row.Tutor5)))
        tutor5 = {...tutor5, matchingScore:tuteeMatchSummary.tutor5.matchingScore}
        const tutorInfo = [tutor1, tutor2, tutor3, tutor4, tutor5]
        console.log("Tutor-Parsed-Data", window.tutorParsedData)
        const selectedTuteeMatchesState = {
          tutee,
          tutorInfo
        }
        console.log("tutpr parsed :", tutorParsedData, "state", selectedTuteeMatchesState)
        dispatch(selectedTuteeMatchesActions.updateSelectedTuteeMatches(selectedTuteeMatchesState))
        navigate("/details")
      }

  return (
    <>
        <div class="flex flex-col items-center">
          <h2 className="h2 my-4">Overview</h2>

          <DataGrid sx={{cursor: 'pointer', width: "100%"}} rows={rows} columns={columns} onRowClick={handleRowClick}/>

        </div>
    </>
  )
}

export default MainMatchingTable