// @ts-nocheck
import { useSelector } from 'react-redux'
import {Stack} from '@mui/material'
import MainMatchingTable from "../components/MainMatchingTable"
import MissingTuteeTable from "../components/MissingTuteeTable"
import DownloadCSVButton from '../components/DownloadCSVButton'

const OverviewPage = () => {
  // const tutorDataLoaded = useSelector((state)=>{
  //   return state.matchesSummary[0]?.tutor.name
  // }) === "No data"
  // console.log(window.matchingList)
  return (
    <Stack direction="column" alignItems="center">
     <MainMatchingTable/>
     {/* <MissingTuteeTable/>  */}
     <DownloadCSVButton/>
    </Stack>
  )
}

export default OverviewPage