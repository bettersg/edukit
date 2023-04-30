// @ts-nocheck
import {useSelector} from "react-redux"
import { CSVLink } from 'react-csv'
import {Button} from '@mui/material'
import { useEffect, useState } from "react"

const DownloadCSVButton = () => {
    const matchesSummary = useSelector((state)=>state.matchesSummary)
    const [csvData, setCsvData] = useState([["Tutor Index", "Tutor Name", "Tutee Matching ID (Descending Order)"]])
    useEffect(()=>{
        if (window.matchingList) {
            window.matchingList.map((row)=>{
            const tuteeIDArr = row.tuteeMatchingScores.map((tuteeRow)=>tuteeRow.index)
            const csvDataRowItem = [row.tutor.index, row.tutor.name, ...tuteeIDArr]
            setCsvData((state)=>[...state, csvDataRowItem])
        })}  
    },[matchesSummary])

  return (
    <Button variant="contained" sx={{w:1, m:1}}>{csvData && <CSVLink data={csvData} style={{color:"white", "textDecoration": "none"}}>CSV Download</CSVLink>}</Button>

  )
}

export default DownloadCSVButton