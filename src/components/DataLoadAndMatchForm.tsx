// @ts-nocheck
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Link from './utility/Link';

import { Tutee, TuteeDataFormat, Tutor } from "../types/person"
import { MatchingList, TuteeSummary, TutorMatchSummary } from '@/types/globalVariables'
import { MatrixData } from '@/types/google-sheets';

import { matchesSummaryActions } from '../store/matchesSummarySlice'
import { selectedTuteeMatchesActions } from '@/store/selectedTuteeMatchesSlice'

import { getGSheetsData } from '@/utils/api'
import { API_ENDPOINT_TUTEE, API_ENDPOINT_TUTOR } from '@/utils/api'

import {transformKSGeneralTuteeData} from "@/utils/parseKSGeneraTuteeData"

import {getMatchScore} from '@/utils/score'
import KSSSOTuteeFormat from '@/utils/data/KSSSOTuteeFormat';
import KSTutorFormat from '@/utils/data/KSTutorFormat';

import { Card, Checkbox, Label, Button, Select, FileInput } from 'flowbite-react';

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Step 1
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
              Insert the tutor data into the database or upload a CSV file.
          </p>
          <div className="flex items-center gap-2">
            <Checkbox id="tutor-csv" color="primary" value={useCsvTutor} onChange={(e) => setUseCsvTutor(e.target.checked)} />
            <Label htmlFor="tutor-csv">
              Use CSV
            </Label>
          </div>

          <div className="card-buttons">
          {useCsvTutor ? (
              <div
              className="max-w-md self-end"
              id="fileTutorUpload"
            >
              <FileInput
                onChange={(e) => handleFileUpload(e, "tutor", setCsvTutorData, setCsvTutorFilename)}
                id="tutor-file"
                accept=".csv"
                helperText="Tutor Format: KS Tutor (.CSV)"
              />
            </div>
            ) : (
              <Button 
                className=""
                href="https://docs.google.com/spreadsheets/d/1WFCDr9R4_A3wDRCeWcR6K8XK-_Rx30gqGGCgzF6Y65c/edit#gid=0" 
                target="_blank"
                color="primary"
              ><span className="flex flex-row gap-2 items-center">
                Go to Tutor Database
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </span></Button>
            )}
          </div>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Step 2
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
              Insert the tutee data into the database or upload a CSV file. Choose the correct format.
          </p>
          <div className="mt-[-0.5rem]">
            <div className="mb-2 block">
              <Label
                htmlFor="format-type"
                value="Select tutee data format"
              />
            </div>
            <Select
              id="format-type"
              color="primary"
            >
              <option selected>
                KS SSO (default)
              </option>
              <option>
                KS General
              </option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="tutee-csv" color="primary" value={useCsvTutee} onChange={(e) => setUseCsvTutee(e.target.checked)} />
            <Label htmlFor="tutee-csv">
              Use CSV
            </Label>
          </div>

          <div className="card-buttons">
          {useCsvTutee ? (

              <div
                className="max-w-md self-end"
                id="fileUpload"
              >
                <FileInput
                  onChange={(e) => handleFileUpload(e, "tutee", setCsvTuteeData, setCsvTuteeFilename)}
                  id="tutee-file"
                  accept=".csv"
                  helperText="Tutee Format: KS General or KS SSO (.CSV)"
                />
              </div>
            ) : (
              <Button 
                className=""
                href="https://docs.google.com/spreadsheets/d/1WFCDr9R4_A3wDRCeWcR6K8XK-_Rx30gqGGCgzF6Y65c/edit#gid=0" 
                target="_blank"
                color="primary"
              ><span className="flex flex-row gap-2 items-center">
                Go to Tutee Database
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
              </span></Button>
            )}
          </div>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Step 3
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
              Confirm your data is of the <Link href="https://docs.google.com/spreadsheets/d/1Xj0zkL2h0nyUR25NKtCIv3QVjZee6bLyWUdpbxVCVT0/edit#gid=0" target="_blank">correct format</Link> and load & match the data.
          </p>
          <div className="card-buttons">
            <Button color="primary" onClick={() => {loadData(csvTutorData ?? null, csvTuteeData ?? null)}}>
              Load
            </Button>
            <Button color="primary" onClick={calculateMatches}>
              Match
            </Button>
            <Button color="gray" onClick={clearData}>
              Clear
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DataLoadAndMatchForm