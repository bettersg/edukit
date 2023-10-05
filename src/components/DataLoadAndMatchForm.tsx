import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Link from './utility/Link';

import { Tutee, TuteeDataFormat, Tutor } from '../types/person';
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

import { getMatchScore } from '@/utils/score';
import KSSSOTuteeFormat from '@/utils/classes/KSSSOTuteeFormat';
import KSGeneralTuteeFormat from '@/utils/classes/KSGeneralTuteeFormat';
import KSTutorFormat from '@/utils/classes/KSTutorFormat';
import TuteeMatches from '@/utils/classes/TuteeMatches';

import {
  Card,
  Checkbox,
  Label,
  Button,
  Select,
  FileInput,
  Radio,
} from 'flowbite-react';

import { parse } from 'papaparse';
import { useOnMountUnsafe } from '@/utils/hooks';

const DataLoadAndMatchForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedTuteeDataFormat, setSelectedTuteeDataFormat] =
    useState<TuteeDataFormat>(TuteeDataFormat.KSGeneral);
  const [useCsvTutor, setUseCsvTutor] = useState<boolean>(true);
  const [useCsvTutee, setUseCsvTutee] = useState<boolean>(true);
  const [csvTutorData, setCsvTutorData] = useState<MatrixData[]>();
  const [csvTuteeData, setCsvTuteeData] = useState<MatrixData[]>();
  const [csvTutorFilename, setCsvTutorFilename] = useState<string>('');
  const [csvTuteeFilename, setCsvTuteeFilename] = useState<string>('');
  const [csvTutorId, setCsvTutorId] = useState<string>('');
  const [csvTuteeId, setCsvTuteeId] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  const [token, setToken] = useState<string>('');

  const [files, setFiles] = useState<
    gapi.client.Response<gapi.client.drive.FileList>['result']['files']
  >([]);

  // const [done, setDone] = useState<boolean>(false);

  useOnMountUnsafe(() => {
    let signedIn = false;

    gapi.load('client', () => {
      gapi.client
        .init({
          discoveryDocs: [
            'https://sheets.googleapis.com/$discovery/rest?version=v4',
            'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest',
          ],
        })
        .then(
          function () {
            console.log('discovery document loaded');
          },
          function (reason) {
            console.log('Error: ' + reason.result.error.message);
          },
        );
    });

    const client = google.accounts.oauth2.initTokenClient({
      client_id: import.meta.env.VITE_GOOGLE_ID,
      scope:
        'https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.metadata.readonly',
      callback: async tokenResponse => {
        setToken(tokenResponse.access_token);
        signedIn = true;

        let response: gapi.client.Response<gapi.client.drive.FileList>;

        try {
          response = await gapi.client.drive.files.list({
            access_token: tokenResponse.access_token,
            q: "mimeType='application/vnd.google-apps.spreadsheet'",
          });
        } catch (err) {
          console.error(err);
          alert('Error loading spreadsheet names from Google Drive');
          return;
        }

        console.log(response.result.files);
        setFiles(response.result.files);

        const defaultTutor = response.result.files!.find(
          e => e.name == 'TutorDB',
        );
        const defaultTutee = response.result.files!.find(
          e => e.name == 'TuteeDB',
        );

        setUseCsvTutee(false);
        setUseCsvTutor(false);

        if (defaultTutor?.id) setCsvTutorId(defaultTutor.id);
        if (defaultTutee?.id) setCsvTuteeId(defaultTutee.id);
      },
    });

    document.getElementById('signin-btn')?.addEventListener('click', () => {
      if (!signedIn) {
        console.log('request');
        client.requestAccessToken();
      } else {
        console.log('revoke');
        google.accounts.oauth2.revoke(token, () => {
          setToken('');
          signedIn = false;
          setUseCsvTutee(true);
          setUseCsvTutor(true);
        });
      }
    });
  });

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
        selectedTuteeDataFormat !== TuteeDataFormat.KSSSO
      ) {
        alert('Please select a valid tutee data format');
        return;
      }
      const [tutorRawData, tuteeRawData] = await Promise.all([
        !useCsvTutor && csvTutorId
          ? getGSheetsData(csvTutorId, 'Tutor', false)
          : tutorRawDataIn ?? getGSheetsData(csvTutorId, 'Tutor', false),
        !useCsvTutee && csvTuteeId
          ? getGSheetsData(csvTuteeId, 'Tutee', false)
          : tuteeRawDataIn ?? getGSheetsData(csvTuteeId, 'Tutee', false),
      ]);
      console.log('tutor', tutorRawData, 'tutee', tuteeRawData);

      const tutorFormatter = new KSTutorFormat(tutorRawData);
      const tutorParsedData = tutorFormatter.getRelevantData();
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
    const tutorParsedData = window.tutorParsedData;
    const tuteeParsedData = window.tuteeParsedData;
    if (!tutorParsedData || !tuteeParsedData) {
      alert('Data not loaded!');
      return;
    }
    const matchingList: MatchingList = [];
    for (let tutee of tuteeParsedData) {
      const tuteeMatches: {
        tutee: TuteeSummary;
        tutorMatches: TutorMatchSummary[];
      } = {
        tutee: {
          index: tutee.personalData.index!,
          name: tutee.personalData.name!,
        },
        tutorMatches: [],
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
        (a, b) => b.matchingScore! - a.matchingScore!,
      );
      if (tuteeMatches.tutorMatches.length > 51) {
        tuteeMatches.tutorMatches = tuteeMatches.tutorMatches.slice(0, 50);
      }
      matchingList.push(tuteeMatches);
    }
    const tuteeMatches = new TuteeMatches(tutorParsedData, tuteeParsedData);
    window.matchingList = tuteeMatches.matchingList;
    const matchesSummary: {
      tutee: TuteeSummary;
      tutor1: TutorMatchSummary;
      tutor2: TutorMatchSummary;
      tutor3: TutorMatchSummary;
      tutor4: TutorMatchSummary;
      tutor5: TutorMatchSummary;
    }[] = [];
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
    dispatch(matchesSummaryActions.resetMatchesSummary(''));
    dispatch(selectedTuteeMatchesActions.resetSelectedTuteeMatches(''));
    navigate('/');
  };

  const handleSelectorChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedTuteeDataFormat(() => event.target.value as TuteeDataFormat);
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

      const { result }: { result } = e.target;

      if (typeof e.target.result !== 'string') {
        alert(
          'Error parsing file. Please check that the file is in the correct format.',
        );
        return;
      }

      try {
        // @ts-ignore
        const output: { data: MatrixData[]; errors: string[] } = parse(result, {
          // @ts-ignore
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
            Sign in with Google and select the google sheet file to be used (if
            applicable).
          </p>

          <div className="card-buttons">
            {/* @ts-expect-error https://github.com/themesberg/flowbite-react/issues/962 */}
            <Button color="primary" id="signin-btn">
              {token ? 'Sign out from Google' : 'Authorize Google Account'}
            </Button>
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Step 2
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Insert the tutor data into the database or upload a CSV file. If
            fetching data via Google Sheets, select the correct spreadsheet. The
            data must be in a sheet named 'Tutor' exactly. Spreadsheets titled
            as 'TutorDB' will be automatically selected.
          </p>

          {/* <div className="flex items-center gap-2">
            <Checkbox
              id="tutor-csv"
              color="primary"
              checked={token ? useCsvTutor : true}
              disabled={!token}
              onChange={e => setUseCsvTutor(e.target.checked)}
            />
            <Label htmlFor="tutor-csv">Use CSV</Label>
          </div> */}
          <fieldset className="flex max-w-md flex-col gap-4" id="tutor-radio">
            <legend className="mb-4">Choose data source</legend>
            <div
              className="flex flex-row gap-4"
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              //   setUseCsvTutor(e.target.value == 'true' ? true : false)
              // }
            >
              <div className="flex items-center gap-2">
                <Radio
                  id="tutorcsv"
                  name="tutor"
                  value="true"
                  onChange={e => {
                    console.log('true');
                    setUseCsvTutor(true);
                  }}
                  checked={token ? useCsvTutor : true}
                />
                <Label htmlFor="tutorcsv">Load via CSV</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="tutorsheets"
                  name="tutor"
                  value="false"
                  disabled={!token}
                  onChange={e => {
                    console.log('false');
                    setUseCsvTutor(false);
                  }}
                  checked={token ? !useCsvTutor : false}
                />
                <Label htmlFor="tutorsheets" disabled={!token}>
                  Load via GSheets
                </Label>
              </div>
            </div>
          </fieldset>

          <div className="card-buttons">
            {!useCsvTutor && files && files.length > 0 ? (
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="tutorSheetsList"
                    value="Select the Sheet with the tutor data"
                  />
                </div>
                <div className="flex flex-row items-stretch !rounded-l-none">
                  <Select
                    id="tutorSheetsList"
                    color="primaryLeft"
                    required
                    value={csvTutorId}
                    onChange={e => {
                      setCsvTutorId(e.target.value);
                    }}
                  >
                    {files.map(file => {
                      return (
                        <option key={file.id} value={file.id}>
                          {file.name}
                        </option>
                      );
                    })}
                  </Select>
                  {/* @ts-expect-error https://github.com/themesberg/flowbite-react/issues/962 */}
                  <Button
                    color="primary"
                    className="h-[42px] !rounded-l-none"
                    href={`https://docs.google.com/spreadsheets/d/${csvTutorId}/edit#gid=0`}
                    target="_blank"
                  >
                    <span className="flex flex-row gap-2 items-center">
                      Go{' '}
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
                </div>
              </div>
            ) : (
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
                  helperText="Tutor Format: KS Tutor (.CSV)"
                />
              </div>
            )}
          </div>
        </Card>
        <Card className="lg:col-span-2">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Step 3
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Insert the tutee data into the database or upload a CSV file. If
            fetching data via Google Sheets, select the correct spreadsheet. The
            data must be in a sheet named 'Tutee' exactly. Spreadsheets titled
            as 'TuteeDB' will be automatically selected.
          </p>
          <div className="mt-[-0.5rem]">
            <div className="mb-2 block">
              <Label htmlFor="format-type" value="Select tutee data format" />
            </div>
            <Select
              id="format-type"
              color="primary"
              onChange={handleSelectorChange}
              value={selectedTuteeDataFormat}
            >
              <option value={TuteeDataFormat.KSSSO}>KS SSO</option>
              <option value={TuteeDataFormat.KSGeneral}>KS General</option>
            </Select>
          </div>

          {/* <div className="flex items-center gap-2">
            <Checkbox
              id="tutee-csv"
              color="primary"
              checked={token ? useCsvTutee : true}
              disabled={!token}
              onChange={e => setUseCsvTutee(e.target.checked)}
            />
            <Label htmlFor="tutee-csv">Use CSV</Label>
          </div> */}

          <fieldset className="flex max-w-md flex-col gap-4" id="tutee-radio">
            <legend className="mb-4">Choose data source</legend>
            <div
              className="flex flex-row gap-4"
              // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              //   setUseCsvTutor(e.target.value == 'true' ? true : false)
              // }
            >
              <div className="flex items-center gap-2">
                <Radio
                  id="tuteecsv"
                  name="tutee"
                  value="true"
                  onChange={e => {
                    console.log('true');
                    setUseCsvTutee(true);
                  }}
                  checked={token ? useCsvTutee : true}
                />
                <Label htmlFor="tuteecsv">Load via CSV</Label>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id="tuteesheets"
                  name="tutee"
                  value="false"
                  disabled={!token}
                  onChange={e => {
                    console.log('false');
                    setUseCsvTutee(false);
                  }}
                  checked={token ? !useCsvTutee : false}
                />
                <Label htmlFor="tuteesheets" disabled={!token}>
                  Load via GSheets
                </Label>
              </div>
            </div>
          </fieldset>

          <div className="card-buttons">
            {!useCsvTutee && files && files.length > 0 ? (
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="tuteeSheetsList"
                    value="Select the Sheet with the tutee data"
                  />
                </div>
                <div className="flex flex-row items-stretch !rounded-l-none">
                  <Select
                    id="tuteeSheetsList"
                    color="primaryLeft"
                    required
                    value={csvTuteeId}
                    onChange={e => {
                      setCsvTuteeId(e.target.value);
                    }}
                  >
                    {files.map(file => {
                      return (
                        <option key={file.id} value={file.id}>
                          {file.name}
                        </option>
                      );
                    })}
                  </Select>
                  {/* @ts-expect-error https://github.com/themesberg/flowbite-react/issues/962 */}
                  <Button
                    color="primary"
                    className="h-[42px] !rounded-l-none"
                    href={`https://docs.google.com/spreadsheets/d/${csvTuteeId}/edit#gid=0`}
                    target="_blank"
                  >
                    <span className="flex flex-row gap-2 items-center">
                      Go{' '}
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
                </div>
              </div>
            ) : (
              <div className="max-w-md self-end" id="fileTuteeUpload">
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
                  helperText="Tutee Format: KS SSO or KS General (.CSV)"
                />
              </div>
            )}
            {/* {useCsvTutee ? (
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
                  helperText="Tutee Format: KS General or KS SSO (.CSV)"
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
            )} */}
          </div>
        </Card>
        <Card>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Step 4
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
            {/* @ts-expect-error https://github.com/themesberg/flowbite-react/issues/962 */}
            <Button
              color="primary"
              onClick={() => {
                loadData(csvTutorData ?? null, csvTuteeData ?? null);
              }}
            >
              Load
            </Button>
            {/* @ts-expect-error https://github.com/themesberg/flowbite-react/issues/962 */}
            <Button color="primary" onClick={calculateMatches}>
              Match
            </Button>
            {/* @ts-expect-error https://github.com/themesberg/flowbite-react/issues/962 */}
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
