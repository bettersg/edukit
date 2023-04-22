import {useSelector} from 'react-redux'
import {Stack, Box, Button, ButtonGroup} from '@mui/material'

const MissingTuteeTable = () => {
  const unmatchedList = useSelector((state)=>state.unmatchedTutees)
  return (
    <>
    <Stack alignItems="center">
    <h2>MissingTuteeTable</h2>
    <Box sx={{display:"flex", flexDirection:"column", alignItems:"center", flexWrap:"wrap",m:1}}>
      <ButtonGroup variant="outlined" aria-label="outlined button group">
        {unmatchedList.map((tutee, idx)=>{
          // console.log(tutee)
          return <Button key={idx}>{tutee}</Button>
        })}
      </ButtonGroup>
    </Box>
    </Stack>
    </>
  )
}

export default MissingTuteeTable