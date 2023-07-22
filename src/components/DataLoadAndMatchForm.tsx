// @ts-nocheck
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Stack, Button, Select, MenuItem, InputLabel, Divider, Link, Typography, Card, CardContent, CardActions, FormControl, Box } from '@mui/material'
// import {} from '@mui'

import { Tutee, TuteeDataFormat, Tutor } from "../types/person"
import { MatchingList, TuteeSummary, TutorMatchSummary } from '@/types/globalVariables'

import { matchesSummaryActions } from '../store/matchesSummarySlice'
import { selectedTuteeMatchesActions } from '@/store/selectedTuteeMatchesSlice'

import { getGSheetsData } from '@/utils/api'
import { API_ENDPOINT_TUTEE, API_ENDPOINT_TUTOR } from '@/utils/api'

import {transformKSTutorData} from '@/utils/parseKSTutorData'
import {transformKSGeneralTuteeData} from "@/utils/parseKSGeneraTuteeData"

import {getMatchScore} from '@/utils/score'
import KSSSOTuteeFormat from '@/utils/data/KSSSOTuteeFormat';
import KSTutorFormat from '@/utils/data/KSTutorFormat';

const DataLoadAndMatchForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedTuteeDataFormat, setSelectedTuteeDataFormat] = useState<TuteeDataFormat>('KSSSO')

  const loadData = async () => {
    try {
        console.log("loading", selectedTuteeDataFormat)
        if (selectedTuteeDataFormat !== TuteeDataFormat.KSGeneral && selectedTuteeDataFormat !== TuteeDataFormat.KSSSO) {
          alert("Please select a valid tutee data format");
          return;
        }
        const tutorRawData = await getGSheetsData(API_ENDPOINT_TUTOR, false)
        const tutorFormatter = new KSTutorFormat(tutorRawData);
        const tutorParsedData = tutorFormatter.fromGSheetsData();
        console.log(tutorParsedData);
        const tuteeRawData = await getGSheetsData(API_ENDPOINT_TUTEE, false)
        let tuteeParsedData : Tutee[] = [];
        switch (selectedTuteeDataFormat){
            case TuteeDataFormat.KSGeneral:
                tuteeParsedData = transformKSGeneralTuteeData(tuteeRawData)
                break
            case TuteeDataFormat.KSSSO:
                // console.log("Using new formatter");
                const formatter = new KSSSOTuteeFormat(tuteeRawData)
                tuteeParsedData = formatter.fromGSheetsData();
                console.log("Tutee parsed data", tuteeParsedData)
                break
        }
        if ((tutorParsedData.length > 0)
        && (tuteeParsedData.length>0)){
            window.tutorParsedData = tutorParsedData.reverse()
            window.tuteeParsedData = tuteeParsedData
            alert ('Tutor & Tutee Data Loaded')
        }else {
            alert ('Data not Loaded')
        }
    } catch(error){
        console.log(error)
    }
}  
  const calculateMatches = () => {
    const tutorParsedData:Tutor[] = window.tutorParsedData
    const tuteeParsedData:Tutee[] = window.tuteeParsedData
    console.log("Tutor - ", tutorParsedData, "Tutee - ", tuteeParsedData)
    if (!tutorParsedData || !tuteeParsedData) {
      alert('Data not loaded!')
      return
    }
    const matchingList:MatchingList = []
    for (let tutee of tuteeParsedData) {
      const tuteeMatches : {
        tutee: TuteeSummary,
        tutorMatches: TutorMatchSummary[]
      } = { tutee: {}, tutorMatches: [] }
      tuteeMatches.tutee = {
        index: tutee.personalData.index,
        name: tutee.personalData.name,
      }
      for (let tutor of tutorParsedData) {
        const tutorMatchingScoreObj = {
          index: tutor.personalData.index,
          contactNum: tutor.personalData.contact?.phone,
          name: tutor.personalData.name,
          matchingScore: getMatchScore(tutor, tutee),
        }
        tuteeMatches.tutorMatches.push(tutorMatchingScoreObj)
      }
      tuteeMatches.tutorMatches.sort(
        (a, b) => b.matchingScore - a.matchingScore
      )
      if (tuteeMatches.tutorMatches.length > 51) {
        tuteeMatches.tutorMatches =
          tuteeMatches.tutorMatches.slice(0, 50)
      }
      matchingList.push(tuteeMatches)
    }
    window.matchingList = matchingList
    const matchesSummary = []
    for (let matchingListItem of matchingList) {
      const matchesSummaryItem = {
        tutee: matchingListItem.tutee,
        tutor1: matchingListItem.tutorMatches[0],
        tutor2: matchingListItem.tutorMatches[1],
        tutor3: matchingListItem.tutorMatches[2],
        tutor4: matchingListItem.tutorMatches[3],
        tutor5: matchingListItem.tutorMatches[4],
      }
      matchesSummary.push(matchesSummaryItem)
    }
    dispatch(matchesSummaryActions.updateMatchesSummary(matchesSummary))
    // console.log("matching list", matchingList)
    navigate('/')
  }

  const clearData = () => {
    delete window.tutorParsedData
    delete window.tuteeParsedData
    delete window.matchingList
    dispatch(matchesSummaryActions.resetMatchesSummary())
    dispatch(selectedTuteeMatchesActions.resetSelectedTuteeMatches())
    // dispatch(unmatchedTuteesActions.resetUnmatchedTutees())
    // dispatch(selectedTutorMatchesActions.resetSelectedTutorMatches())
    navigate('/')
  }

  const handleSelectorChange = (event: Select.SelectChangeEvent) => {
    setSelectedTuteeDataFormat(()=>event.target.value)
    // console.log(selectedTuteeDataFormat)    
  }
 
  return (
    <div style={{}}>
      <Box sx={{display: "grid", gridTemplateColumns: {md: "repeat(3, auto)", sm: "repeat(2, auto)", xs: "repeat(1, auto)"}, gap: "1rem"}}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{mb: 1.5}}>Step 1</Typography>
          <Typography variant="body1">Insert the tutor data into the database.</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small" 
            href="https://docs.google.com/spreadsheets/d/1WFCDr9R4_A3wDRCeWcR6K8XK-_Rx30gqGGCgzF6Y65c/edit#gid=0" 
            target="_blank"
          >Go to Tutor Database</Button>
        </CardActions>
      </Card>
      {/* sx={{maxWidth: {sm: "100%", md: "33%"}}} */}
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{mb: 1.5}}>Step 2</Typography>
          <Typography variant="body1" sx={{mb: 1.5}}>Insert the tutee data into the database and select the correct format.</Typography>
          <FormControl fullWidth>
            <InputLabel id="select-label">Tutee Data Format</InputLabel>
            <Select
              labelId="select-label"
              id="simple-select"
              value={selectedTuteeDataFormat}
              label="Tutee Data Format"
              onChange={handleSelectorChange}
            >
              <MenuItem value={TuteeDataFormat.KSSSO}>KS SSO (default)</MenuItem>
              <MenuItem value={TuteeDataFormat.KSGeneral}>KS General</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
        <CardActions>
          <Button
            size="small" 
            href="https://docs.google.com/spreadsheets/d/1QyUr8axA_qb5kuddaL4dvOwNo7VT8k5o2POgLO9G84g/edit#gid=0" 
            target="_blank"
          >Go to Tutee Database</Button>
        </CardActions>
      </Card>
      <Card sx={{gridColumn: {
        xs: "1",
        sm: "1 / span 2",
        md: "3"
      }}}>
        <CardContent>
          <Typography variant="h4" sx={{mb: 1.5}}>Step 3</Typography>
          <Typography variant="body1" sx={{mb: 1.5}}>Confirm your data is of the <Link href="https://docs.google.com/spreadsheets/d/1Xj0zkL2h0nyUR25NKtCIv3QVjZee6bLyWUdpbxVCVT0/edit#gid=0" target="_blank">correct format</Link> and load & match the data.</Typography>
          
        </CardContent>
        <CardActions sx={{p: 1.5}}>
          <Button variant="contained" onClick={loadData}>
            Load
          </Button>
          <Button variant="contained" onClick={calculateMatches}>
            Match
          </Button>
          <Button color="secondary" onClick={clearData}>
            Clear
          </Button>
        </CardActions>
      </Card>
      </Box>
    </div>
  )
}

export default DataLoadAndMatchForm