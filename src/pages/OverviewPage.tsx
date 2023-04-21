import {Stack} from '@mui/material'
import MainMatchingTable from "../components/MainMatchingTable"
import MissingTuteeTable from "../components/MissingTuteeTable"

const OverviewPage = () => {
  return (
    <Stack direction="column">
     <MainMatchingTable/>
     <MissingTuteeTable/> 
    </Stack>
  )
}

export default OverviewPage