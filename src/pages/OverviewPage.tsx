
import { Spinner } from 'flowbite-react';
import { Suspense, lazy } from 'react'


// import MainMatchingTable from '../components/MainMatchingTable'
// import DownloadCSVButton from '../components/DownloadCSVButton'



const OverviewPage = () => {
  const MainMatchingTable = lazy(() => import("@/components/MainMatchingTable"));
  const DownloadCSVButton = lazy(() => import("@/components/DownloadCSVButton"));
  return (
    <div className="flex flex-col gap-4 items-center">
      <Suspense fallback={(
        <div className="text-center my-4">
          <Spinner
            aria-label="Loading matching table"
          />
        </div>
      )}>
        <MainMatchingTable />
        <DownloadCSVButton />
      </Suspense>
      
    </div>
  )
}

export default OverviewPage
