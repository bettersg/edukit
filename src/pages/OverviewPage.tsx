import { Stack } from '@mui/material'

// import MatchingTable from '@/components/MatchingTable'
import MainMatchingTable from '../components/MainMatchingTable'
import DownloadCSVButton from '../components/DownloadCSVButton'

const OverviewPage = () => {
  return (
    <Stack direction="column" alignItems="center" gap={2}>
      <MainMatchingTable />
      {/* <MatchingTable /> */}
      <DownloadCSVButton />
    </Stack>
  )
}

export default OverviewPage
