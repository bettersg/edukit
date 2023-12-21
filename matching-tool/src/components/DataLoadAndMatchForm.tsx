// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Link from './utility/Link';

import { Tutee, TuteeDataFormat, Tutor, TutorDataFormat } from '../types/person';
import {
  MatchingList,
  TuteeSummary,
  TutorMatchSummary,
} from '@/types/globalVariables';
import { MatrixData } from '@/types/google-sheets';

import { matchesSummaryActions } from '../store/matchesSummarySlice';
import { selectedTuteeMatchesActions } from '@/store/selectedTuteeMatchesSlice';

import { getGSheetsData } from '@/utils/api';
import { API_ENDPOINT_TUTEE, API_ENDPOINT_TUTOR } from '@/utils/api';

import { getEHMatchScore } from '@/utils/EHscore';
import KSSSOTuteeFormat from '@/utils/classes/KSSSOTuteeFormat';
import KSGeneralTuteeFormat from '@/utils/classes/KSGeneralTuteeFormat';
import KSTutorFormat from '@/utils/classes/KSTutorFormat';
import EHTutorFormat from '@/utils/classes/EHTutorFormat';
// import TuteeMatches from '@/utils/classes/KSTuteeMatches';
import TuteeMatches from '@/utils/classes/EHTuteeMatches';


import {
  Card,
  Checkbox,
  Label,
  Button,
  Select,
  FileInput,
} from 'flowbite-react';

import { parse } from 'papaparse';
import EHTuteeFormat from '@/utils/classes/EHTuteeFormat';
import { getKSMatchScore } from '@/utils/KSscore';

const DataLoadAndMatchForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTuteeDataFormat, setSelectedTuteeDataFormat] =
    useState<TuteeDataFormat>(TuteeDataFormat.KSGeneral);
  const [selectedTutorDataFormat, setSelectedTutorDataFormat] =
    useState<TutorDataFormat>(TutorDataFormat.KSGeneral);
  const [useCsvTutor, setUseCsvTutor] = useState<boolean>(false);
  const [useCsvTutee, setUseCsvTutee] = useState<boolean>(false);
  const [csvTutorData, setCsvTutorData] = useState<MatrixData[]>();
  const [csvTuteeData, setCsvTuteeData] = useState<MatrixData[]>();
  const [csvTutorFilename, setCsvTutorFilename] = useState<string>('');
  const [csvTuteeFilename, setCsvTuteeFilename] = useState<string>('');

  const loadData = async (
    tutorRawDataIn: MatrixData[] | null = null,
    tuteeRawDataIn: MatrixData[] | null = null,
  ) => {
    try {
      if (useCsvTutee && !tuteeRawDataIn) {
        alert('Please upload a .csv file for the tutee data as indicated.');
        return;
      }
      if (useCsvTutor && !tutorRawDataIn) {
        alert('Please upload a .csv file for the tutor data as indicated.');
        return;
      }
      console.log('loading', selectedTuteeDataFormat);
      if (
        selectedTuteeDataFormat !== TuteeDataFormat.KSGeneral &&
        selectedTuteeDataFormat !== TuteeDataFormat.KSSSO && 
        selectedTuteeDataFormat !== TuteeDataFormat.EH
      ) {
        alert('Please select a valid tutee data format');
        return;
      }
      const [tutorRawData, tuteeRawData] = await Promise.all([
        useCsvTutor
          ? tutorRawDataIn ?? getGSheetsData(API_ENDPOINT_TUTOR, false)
          : getGSheetsData(API_ENDPOINT_TUTOR, false),
        useCsvTutee
          ? tuteeRawDataIn ?? (await getGSheetsData(API_ENDPOINT_TUTEE, false))
          : await getGSheetsData(API_ENDPOINT_TUTEE, false),
      ]);

      let tutorParsedData: Tutor[] = [];
      switch (selectedTutorDataFormat) {
        case TutorDataFormat.KSGeneral:
          const formatterKSGen = new KSTutorFormat(tutorRawData);
          tutorParsedData = formatterKSGen.getRelevantData();
          break;
        case TutorDataFormat.EH:
          const formatterEH = new EHTutorFormat(tutorRawData);
          tutorParsedData = formatterEH.getRelevantData();
          break;
      }

      let tuteeParsedData: Tutee[] = [];
      switch (selectedTuteeDataFormat) {
        case TuteeDataFormat.KSGeneral:
          const formatterKSGen = new KSGeneralTuteeFormat(tuteeRawData);
          tuteeParsedData = formatterKSGen.getRelevantData();
          break;
        case TuteeDataFormat.KSSSO:
          const formatterKSSSO = new KSSSOTuteeFormat(tuteeRawData);
          tuteeParsedData = formatterKSSSO.getRelevantData();
          break;
        case TuteeDataFormat.EH:
          const formatterEH = new EHTuteeFormat(tuteeRawData);
          tuteeParsedData = formatterEH.getRelevantData();
          break;
      }

      if (tutorParsedData.length > 0 && tuteeParsedData.length > 0) {
        window.tutorParsedData = tutorParsedData.reverse();
        window.tuteeParsedData = tuteeParsedData;
        alert('Tutor & Tutee Data Loaded');
      } else {
        alert('Data not Loaded');
      }
    } catch (error) {
      console.error(error);
      alert(
        'Data not loaded, make sure your data is of the correct format. More information in dev console.',
      );
    }
  };
  const calculateMatches = () => {
    const tutorParsedData: Tutor[] = window.tutorParsedData;
    const tuteeParsedData: Tutee[] = window.tuteeParsedData;
    console.log(tutorParsedData);
    if (!tutorParsedData || !tuteeParsedData) {
      alert('Data not loaded!');
      return;
    }
    const matchingList: MatchingList = [];
    let getMatchScore: (tutor: Tutor, tutee: Tutee) => number;
    switch (selectedTuteeDataFormat) {
      case TuteeDataFormat.KSGeneral:
        getMatchScore = getKSMatchScore;
        break;
      case TuteeDataFormat.KSSSO:
        getMatchScore = getKSMatchScore;
        break;
      case TuteeDataFormat.EH:
        getMatchScore = getEHMatchScore;
        break;
    }
    for (let tutee of tuteeParsedData) {
      const tuteeMatches: {
        tutee: TuteeSummary;
        tutorMatches: TutorMatchSummary[];
      } = { tutee: {}, tutorMatches: [] };
      tuteeMatches.tutee = {
        index: tutee.personalData.index,
        name: tutee.personalData.name,
      };
      for (let tutor of tutorParsedData) {
        const tutorMatchingScoreObj = {
          index: tutor.personalData.index,
          contactNum: tutor.personalData.contact?.phone,
          name: tutor.personalData.name,
          matchingScore: getMatchScore(tutor, tutee),
        };
        tuteeMatches.tutorMatches.push(tutorMatchingScoreObj);
      }
      tuteeMatches.tutorMatches.sort(
        (a, b) => b.matchingScore - a.matchingScore,
      );
      if (tuteeMatches.tutorMatches.length > 51) {
        tuteeMatches.tutorMatches = tuteeMatches.tutorMatches.slice(0, 50);
      }
      matchingList.push(tuteeMatches);
    }
    const tuteeMatches = new TuteeMatches(tutorParsedData,tuteeParsedData, getMatchScore);
    window.matchingList = tuteeMatches.matchingList;
    const matchesSummary = [];
    for (let matchingListItem of matchingList) {
      const matchesSummaryItem = {
        tutee: matchingListItem.tutee,
        tutor1: matchingListItem.tutorMatches[0],
        tutor2: matchingListItem.tutorMatches[1],
        tutor3: matchingListItem.tutorMatches[2],
        tutor4: matchingListItem.tutorMatches[3],
        tutor5: matchingListItem.tutorMatches[4],
      };
      matchesSummary.push(matchesSummaryItem);
    }
    dispatch(matchesSummaryActions.updateMatchesSummary(matchesSummary));
    navigate('/');
  };

  const clearData = () => {
    delete window.tutorParsedData;
    delete window.tuteeParsedData;
    delete window.matchingList;
    dispatch(matchesSummaryActions.resetMatchesSummary());
    dispatch(selectedTuteeMatchesActions.resetSelectedTuteeMatches());
    navigate('/');
  };

  const handleTuteeSelectorChange = (event: Select.SelectChangeEvent) => {
    setSelectedTuteeDataFormat(() => event.target.value);
  };
  
  const handleTutorSelectorChange = (event: Select.SelectChangeEvent) => {
    setSelectedTutorDataFormat(() => event.target.value);
  };

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
    stateChange: typeof setCsvTutorData,
    filenameChange: typeof setCsvTutorFilename,
  ) => {
    if (!event.target.files) {
      alert('Please upload a .csv file for the ' + name + ' data.');
      return false;
    }
    console.log('file upload');
    const file = event.target.files[0];
    filenameChange(file.name);

    const reader = new FileReader();

    reader.onload = e => {
      if (!e?.target?.result) {
        return;
      }
      const { result }: { result: string } = e.target;
      try {
        const output: { data: MatrixData[]; errors: string[] } = parse(result, {
          headers: false,
        });
        if (output.errors.length > 0) {
          console.error(output.errors);
          alert(
            'Error parsing file. Please check that the file is in the correct format.',
          );
          return;
        }
        stateChange(output.data as MatrixData[]);
      } catch (err) {
        console.error(err);
        alert(
          'Error parsing file. Please check that the file is in the correct format.',
        );
      }
    };
    reader.readAsBinaryString(file);
  };

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
            <div className="mt-[-0.5rem]">
              <div className="mb-2 block">
                <Label htmlFor="format-type" value="Select tutor data format" />
              </div>
              <Select
                id="format-type"
                color="primary"
                onChange={handleTutorSelectorChange}
                value={selectedTutorDataFormat}
              >
                <option value={TutorDataFormat.KSGeneral}>KS General</option>
                <option value={TutorDataFormat.EH}>EH</option>
              </Select>
            </div>
          <div className="flex items-center gap-2">
            <Checkbox
                id="tutor-csv"
                color="primary"
                value={useCsvTutor}
                onChange={e => setUseCsvTutor(e.target.checked)}
              />
              <Label htmlFor="tutor-csv">Use CSV</Label>
          </div>

          <div className="card-buttons">
            {useCsvTutor ? (
              <div className="max-w-md self-end" id="fileTutorUpload">
                <FileInput
                  onChange={e =>
                    handleFileUpload(
                      e,
                      'tutor',
                      setCsvTutorData,
                      setCsvTutorFilename,
                    )
                  }
                  id="tutor-file"
                  accept=".csv"
                  helperText="Tutor Format: KS Tutor or EH (.CSV)"
                />
              </div>
            ) : (
              <Button
                className=""
                href="https://docs.google.com/spreadsheets/d/1WFCDr9R4_A3wDRCeWcR6K8XK-_Rx30gqGGCgzF6Y65c/edit#gid=0"
                target="_blank"
                color="primary"
              >
                <span className="flex flex-row gap-2 items-center">
                  Go to Tutor Database
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </span>
              </Button>
            )}
          </div>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Step 2
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Insert the tutee data into the database or upload a CSV file. Choose
            the correct format.
          </p>
          <div className="mt-[-0.5rem]">
            <div className="mb-2 block">
              <Label htmlFor="format-type" value="Select tutee data format" />
            </div>
            <Select
              id="format-type"
              color="primary"
              onChange={handleTuteeSelectorChange}
              value={selectedTuteeDataFormat}
            >
              <option value={TuteeDataFormat.KSSSO}>KS SSO</option>
              <option value={TuteeDataFormat.KSGeneral}>KS General</option>
              <option value={TuteeDataFormat.EH}>EH</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="tutee-csv"
              color="primary"
              value={useCsvTutee}
              onChange={e => setUseCsvTutee(e.target.checked)}
            />
            <Label htmlFor="tutee-csv">Use CSV</Label>
          </div>

          <div className="card-buttons">
            {useCsvTutee ? (
              <div className="max-w-md self-end" id="fileUpload">
                <FileInput
                  onChange={e =>
                    handleFileUpload(
                      e,
                      'tutee',
                      setCsvTuteeData,
                      setCsvTuteeFilename,
                    )
                  }
                  id="tutee-file"
                  accept=".csv"
                  helperText="Tutee Format: KS General or KS SSO or EH (.CSV)"
                />
              </div>
            ) : (
              <Button
                className=""
                href="https://docs.google.com/spreadsheets/d/1QyUr8axA_qb5kuddaL4dvOwNo7VT8k5o2POgLO9G84g/edit#gid=573031280"
                target="_blank"
                color="primary"
              >
                <span className="flex flex-row gap-2 items-center">
                  Go to Tutee Database
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </span>
              </Button>
            )}
          </div>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Step 3
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Confirm your data is of the{' '}
            <Link
              href="https://docs.google.com/spreadsheets/d/1Xj0zkL2h0nyUR25NKtCIv3QVjZee6bLyWUdpbxVCVT0/edit#gid=0"
              target="_blank"
            >
              correct format
            </Link>{' '}
            and load & match the data.
          </p>
          <div className="card-buttons">
            <Button
              color="primary"
              onClick={() => {
                loadData(csvTutorData ?? null, csvTuteeData ?? null);
              }}
            >
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
  );
};

export default DataLoadAndMatchForm;
