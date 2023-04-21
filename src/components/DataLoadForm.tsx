import {Stack, Button} from "@mui/material"

const DataLoadForm = () => {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{w:100}}>
    <Stack direction="row">
      <Stack direction="column" alignItems="center" justifyContent="center" sx={{m:2}}>
        <a href=""  style={{margin:"1rem"}}>Tutor Database HyperLink</a>
        <a href="" style={{margin:"1rem"}}>Tutee Database HyperLink</a>
      </Stack>
      <Stack direction="column">
      <Button variant="contained" sx={{m:1}}>Load Data</Button>
      <Button variant="contained" sx={{m:1}}>Clear Data</Button>
      <Button variant="contained" sx={{m:1}}>Match</Button>
      </Stack>
    </Stack>
    </Stack>
  )
}

export default DataLoadForm