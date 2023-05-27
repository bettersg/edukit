// @ts-nocheck
import {useSelector} from "react-redux"
import { CSVLink } from 'react-csv'
import {Button} from '@mui/material'
import { useEffect, useState } from "react"

const DownloadCSVButton = () => {
    const matchesSummary = useSelector((state)=>state.matchesSummary)
    const [csvData, setCsvData] = useState([["Tutee Index", "Tutee Name", "Tutor ID", "Tutor Contact #", "Best Tutor matches (ID & Contact Num) (Descending Order on Matching Score)"]])
    useEffect(()=>{
        if (window.matchingList) {
            window.matchingList.map((row)=>{
            const tutorIDArr = []
            row.tutorMatchingScores.forEach((tutorRow)=>{
              tutorIDArr.push(tutorRow.index, tutorRow.contactNum)})
            const csvDataRowItem = [row.tutee.index, row.tutee.name, ...tutorIDArr]
            setCsvData((state)=>[...state, csvDataRowItem])
        })}  
    },[matchesSummary])

  return (
    <Button variant="contained" sx={{w:1, m:1}}>{csvData && <CSVLink data={csvData} style={{color:"white", "textDecoration": "none"}}>CSV Download</CSVLink>}</Button>

  )
}

export default DownloadCSVButton