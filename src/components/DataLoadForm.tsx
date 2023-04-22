import {Stack, Button} from "@mui/material"

const DataLoadForm = () => {
  return (
    <Stack alignItems="center" justifyContent="center" sx={{w:100}}>
    <Stack direction="row">
      <Stack direction="column" alignItems="center" justifyContent="center" sx={{m:2}}>
        <a href="https://docs.google.com/spreadsheets/d/1fN--bOYKGJRl2K7yNPembayRfZq4uf_N/edit?usp=share_link&ouid=101206299132410192457&rtpof=true&sd=true" target="_blank" style={{margin:"1rem"}}>Tutor Database HyperLink</a>
        <a href="https://docs.google.com/spreadsheets/d/1D12x7sSkni-S0bSXZM34FNuOonwgFpZJ/edit?usp=share_link&ouid=101206299132410192457&rtpof=true&sd=true" target="_blank" style={{margin:"1rem"}}>Tutee Database HyperLink</a>
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