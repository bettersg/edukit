// @ts-nocheck
import {useSelector} from "react-redux"
import { CSVLink } from 'react-csv'

import { useEffect, useState } from "react"
import {MatchingList} from "@/types/globalVariables"
import { Button } from "flowbite-react"

const DownloadCSVButton = () => {
    const matchesSummary = useSelector((state)=>state.matchesSummary)
    const [csvData, setCsvData] = useState([["Tutee Index", "Tutee Name", "Tutor ID", "Tutor Name", "Tutor Contact #", "Best Tutor matches (ID & Contact Num) (Descending Order on Matching Score)"]])
    useEffect(()=>{
        const matchingList: MatchingList = window.matchingList
        console.log("mathing List", matchingList)
        if (matchingList) {
            matchingList.map((row)=>{
            const tutorIDArr = []
            row?.tutorMatches?.forEach((tutorRow)=>{
              tutorIDArr.push(tutorRow.index, tutorRow.name, tutorRow.contactNum)})
            const csvDataRowItem = [row.tutee.index, row.tutee.name, ...tutorIDArr]
            setCsvData((state)=>[...state, csvDataRowItem])
        })}  
    },[matchesSummary])

  return (
    <Button color="primary">{csvData && <CSVLink data={csvData} className="flex flex-row justify-center gap-2 text-white" style={{"textDecoration": "none"}}><svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
  </svg> Download CSV</CSVLink>}</Button>
  )
}

export default DownloadCSVButton