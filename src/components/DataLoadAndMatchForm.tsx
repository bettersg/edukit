// @ts-nocheck
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Stack, Button, Select, MenuItem, InputLabel, Divider, Link, Typography, Card, CardContent, CardActions, FormControl, FormGroup, Box, Checkbox, FormControlLabel } from '@mui/material'
// import {} from '@mui'
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { Tutee, TuteeDataFormat, Tutor } from "../types/person"
import { MatchingList, TuteeSummary, TutorMatchSummary } from '@/types/globalVariables'
import { MatrixData } from '@/types/google-sheets';

import { matchesSummaryActions } from '../store/matchesSummarySlice'
import { selectedTuteeMatchesActions } from '@/store/selectedTuteeMatchesSlice'

import { getGSheetsData } from '@/utils/api'
import { API_ENDPOINT_TUTEE, API_ENDPOINT_TUTOR } from '@/utils/api'

import {transformKSTutorData} from '@/utils/parseKSTutorData'
import {transformKSGeneralTuteeData} from "@/utils/parseKSGeneraTuteeData"

import {getMatchScore} from '@/utils/score'
import KSSSOTuteeFormat from '@/utils/data/KSSSOTuteeFormat';
import KSGeneralTuteeFormat from '@/utils/data/KSGeneralTuteeFormat';
import KSTutorFormat from '@/utils/data/KSTutorFormat';

import { parse } from 'papaparse';

const DataLoadAndMatchForm = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedTuteeDataFormat, setSelectedTuteeDataFormat] = useState<TuteeDataFormat>('KSSSO')
  const [useCsvTutor, setUseCsvTutor] = useState<boolean>(false);
  const [useCsvTutee, setUseCsvTutee] = useState<boolean>(false);
  const [csvTutorData, setCsvTutorData] = useState<MatrixData[]>();
  const [csvTuteeData, setCsvTuteeData] = useState<MatrixData[]>();
  const [csvTutorFilename, setCsvTutorFilename] = useState<string>("");
  const [csvTuteeFilename, setCsvTuteeFilename] = useState<string>("");

  const loadData = async (tutorRawDataIn: MatrixData[] | null = null, tuteeRawDataIn: MatrixData[] | null = null) => {
    try {
        if (useCsvTutee && !tuteeRawDataIn) {
          alert("Please upload a .csv file for the tutee data as indicated.")
          return;
        }
        if (useCsvTutor && !tutorRawDataIn) {
          alert("Please upload a .csv file for the tutor data as indicated.")
          return;
        }
        console.log("loading", selectedTuteeDataFormat)
        if (selectedTuteeDataFormat !== TuteeDataFormat.KSGeneral && selectedTuteeDataFormat !== TuteeDataFormat.KSSSO) {
          alert("Please select a valid tutee data format");
          return;
        }
        const tutorRawData = useCsvTutor ? (tutorRawDataIn ?? await getGSheetsData(API_ENDPOINT_TUTOR, false)) : await getGSheetsData(API_ENDPOINT_TUTOR, false); 
        const tutorFormatter = new KSTutorFormat(tutorRawData);
        const tutorParsedData = tutorFormatter.fromDataMatrix();
        console.log(tutorParsedData);
        const tuteeRawData = useCsvTutee ? (tuteeRawDataIn ?? await getGSheetsData(API_ENDPOINT_TUTEE, false)) : await getGSheetsData(API_ENDPOINT_TUTEE, false);
        let tuteeParsedData : Tutee[] = [];
        switch (selectedTuteeDataFormat){
            case TuteeDataFormat.KSGeneral:
                tuteeParsedData = transformKSGeneralTuteeData(tuteeRawData)
                const formatterKSGen = new KSGeneralTuteeFormat(tuteeRawData)
                // tuteeParsedData = formatterKSGen.fromDataMatrix();
                break
            case TuteeDataFormat.KSSSO:
                // console.log("Using new formatter");
                const formatter = new KSSSOTuteeFormat(tuteeRawData)
                tuteeParsedData = formatter.fromDataMatrix();
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
    const tutorParsedData: Tutor[] = window.tutorParsedData
    const tuteeParsedData: Tutee[] = window.tuteeParsedData
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
    delete window.tutorParsedData;
    delete window.tuteeParsedData;
    delete window.matchingList;
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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, name: string, stateChange: typeof setCsvTutorData, filenameChange: typeof setCsvTutorFilename) => {
    if (!event.target.files) {
      alert("Please upload a .csv file for the " + name + " data.")
      return false;
    }
    console.log("file upload")
    const file = event.target.files[0];
    filenameChange(file.name);

    const reader = new FileReader();

    reader.onload = (e) => {
      if (!e?.target?.result) {
        console.log(e.target.result)
        return;
      }
      const { result }: { result: string } = e.target;
      try {
        const output: {data: MatrixData[], errors: string[]} = parse(result, { headers: false });
        if (output.errors.length > 0) {
          console.error(output.errors);
          alert("Error parsing file. Please check that the file is in the correct format.")
          return;
        }
        stateChange(output.data as MatrixData[]);
      } catch(err) {
        console.error(err)
        alert("Error parsing file. Please check that the file is in the correct format.")
      }
    };
    reader.readAsBinaryString(file);
  }


 
  return (
    <div style={{}}>
      <Box sx={{display: "grid", gridTemplateColumns: {md: "repeat(3, auto)", sm: "repeat(2, auto)", xs: "repeat(1, auto)"}, gap: "1rem"}}>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{mb: 1.5}}>Step 1</Typography>
          <Typography variant="body1">Insert the tutor data into the database.</Typography>
          <FormGroup>
            <FormControlLabel control={<Checkbox value={useCsvTutor} onChange={(e) => setUseCsvTutor(e.target.checked)} />} label="Use CSV" />
          </FormGroup>
          
          
        </CardContent>
        <CardActions>
          {useCsvTutor ? (
              <Button
                component="label"
                variant="outlined"
                sx={{m: 1.5}}
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
              >
                Upload Tutor CSV {csvTutorFilename !== "" ? `(${csvTutorFilename})` : ""}
                <input type="file" accept=".csv" hidden onChange={(e) => handleFileUpload(e, "tutor", setCsvTutorData, setCsvTutorFilename)} />
              </Button>
            ) : (
              <Button
                size="small" 
                href="https://docs.google.com/spreadsheets/d/1WFCDr9R4_A3wDRCeWcR6K8XK-_Rx30gqGGCgzF6Y65c/edit#gid=0" 
                target="_blank"
              >Go to Tutor Database</Button>
            )}
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
          <FormGroup>
            <FormControlLabel control={<Checkbox value={useCsvTutee} onChange={(e) => setUseCsvTutee(e.target.checked)} />} label="Use CSV" />
          </FormGroup>
        </CardContent>
        <CardActions>
          {useCsvTutee ? (
              <Button
                component="label"
                variant="outlined"
                sx={{m: 1.5}}
                startIcon={<UploadFileIcon />}
                sx={{ marginRight: "1rem" }}
              >
                Upload Tutee CSV {csvTuteeFilename !== "" ? `(${csvTuteeFilename})` : ""}
                <input type="file" accept=".csv" hidden onChange={(e) => handleFileUpload(e, "tutor", setCsvTuteeData, setCsvTuteeFilename)} />
              </Button>
            ) : (
              <Button
                size="small" 
                href="https://docs.google.com/spreadsheets/d/1QyUr8axA_qb5kuddaL4dvOwNo7VT8k5o2POgLO9G84g/edit#gid=0" 
                target="_blank"
              >Go to Tutee Database</Button>
            )}
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
          <Button variant="contained" onClick={() => {loadData(csvTutorData ?? null, csvTuteeData ?? null)}}>
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