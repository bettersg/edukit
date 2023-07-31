// @ts-nocheck
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectedTuteeSlice } from '@/types/stateSlice'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect } from 'react'
import { EducationLevel, SecondaryStream, fancyPrimarySubjects, fancySecondarySubjects, fancyJcSubjects, fancyIbSubjects } from '@/types/educationSubjects'
import { Subject, TutorSubjects } from '@/types/person'
import { Badge, Button, Table } from 'flowbite-react'
import { createColumnHelper, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'
import React, { useMemo } from 'react'

interface DetailsTableData {
  id: number,
  name: string,
  gender: string,
  subjects: string,
  isProbonoOk: string,
  isNoFinAidOk: string,
  secStreams: string,
  commit: string,
  matchingScore: number
}

const mapception = {
  "primary": fancyPrimarySubjects,
  "lowerSecondary": fancySecondarySubjects,
  "upperSecondary": fancySecondarySubjects,
  "jc": fancyJcSubjects,
  "ib": fancyIbSubjects
}

const booleanMap = {
  "true": "Yes",
  "false": "No",
  "null": "Null"
}

const MatchDetailsPage = () => {
  const navigate = useNavigate()
  const selectedTuteeMatches: selectedTuteeSlice = useSelector((state,action)=>state.selectedTuteeMatches)
  // console.log(selectedTuteeMatches)
  const getRelevantSubjects = (eduLevel: EducationLevel, tutorSubjects:TutorSubjects)=>{
    let relevantSubjects: Subject[]
    switch (eduLevel) {
      case EducationLevel.Primary:
        relevantSubjects = tutorSubjects.primary.map((subject) => fancyPrimarySubjects[subject])
        break;
      case EducationLevel.LowerSecondary:
        relevantSubjects = tutorSubjects.lowerSecondary.map((subject) => fancySecondarySubjects[subject])
        break;
      case EducationLevel.UpperSecondary:
        relevantSubjects = tutorSubjects.upperSecondary.map((subject) => fancySecondarySubjects[subject])
        break;
      case EducationLevel.JuniorCollege:
        relevantSubjects = tutorSubjects.jc.map((subject) => fancyJcSubjects[subject])
        break;
      case EducationLevel.InternationalBaccalaureate:
        relevantSubjects = tutorSubjects.ib.map((subject) => fancyIbSubjects[subject])
        break;
      default:
        break;
    }
    return relevantSubjects?.join(", ")
  }
  
  useEffect(()=>{
    if (!selectedTuteeMatches) {navigate("/")}
  },[])

  const streamMapping = {
    "na": "N(A)",
    "nt": "N(T)",
    "exp": "Exp",
    "ip": "IP",
    "ib": "IB"
  }

  const levelMapping = {
    "primary": "Primary",
    "lowerSecondary": "Lower Secondary",
    "upperSecondary": "Upper Secondary",
    "jc": "JC",
    "ib": "IB"
  }

  const rows: DetailsTableData[] = selectedTuteeMatches.tutorInfo.map((tutor, i)=>(
    {
      entity: "Tutor",
      id: tutor.personalData.index,
      name: tutor.personalData.name,
      gender: tutor.personalData.gender,
      subjects: getRelevantSubjects(selectedTuteeMatches.tutee.educationLevel, tutor.tutorSubjects),
      isProbonoOk: booleanMap[String(tutor.isProBonoOk)],
      isNoFinAidOk: booleanMap[String(tutor.isUnaidedOk)],
      secStreams: tutor.acceptableSecondaryStreams.map((stream) => streamMapping[stream]).join(", "),
      commit: tutor.commitStr,
      matchingScore: tutor.matchingScore
    }
  ));

  const columnHelper = createColumnHelper<DetailsTableData>();

  const columns = useMemo(() => [
    columnHelper.display({
      id: 'entity',
      header: () => <span>Entity</span>,
      cell: (props) => <Badge color="success" className="justify-center">{props.row.original.entity}</Badge>,
    }),
    columnHelper.accessor('id', {
      header: () => <span>Row</span>,
    }),
    columnHelper.accessor('name', {
      header: () => <span>Name</span>,
    }),
    columnHelper.accessor('gender', {
      header: () => <span>Gender — Gender Pref</span>
    }),
    columnHelper.accessor('subjects', {
      header: () => <span>Edu Level — Subjects</span>
    }),
    columnHelper.accessor('isProbonoOk', {
      header: () => <span>Probono Ok?</span>
    }),
    columnHelper.accessor('isNoFinAidOk', {
      header: () => <span>On Fin Aid</span>
    }),
    columnHelper.accessor('secStreams', {
      header: () => <span>Sec Streams</span>
    }),
    columnHelper.accessor('commit', {
      header: () => <span>hrs/wk — thru year?</span>
    }),
    columnHelper.accessor('matchingScore', {
      header: () => <span>M-Score</span>
    }),
  ], []);

  const columnsMUI: GridColDef[] = [
    { field: 'Entity', headerName: 'Entity', width: 90 },
    { field: 'Index', headerName: 'Row', width: 20, type: 'number'},
    { field: 'Name', headerName: 'Name', width: 120, type: 'string'},
    { field: 'Gender_GenderPref', headerName: 'Gender — Gender Pref', width: 170, type: 'string'},
    { field: 'SubjectsEduLevel', headerName: 'Edu Level — Subjects', width: 370, type: 'string'},
    { field: 'IsProbonoOk', headerName: 'Probono Ok?', width: 110, type: 'string'},
    { field: 'IsNoFinAidOk', headerName: 'No Aid Ok?', width: 110, type: 'string'},
    { field: 'SecStreams', headerName: 'Sec Streams', width: 110, type: 'string'},
    { field: 'Commit', headerName: 'hrs/wk — thru year?', width: 150, type: 'string'},
    { field: 'MatchingScore', headerName: 'M-Score', width: 90, type: 'number'},
  ];
  const rowsTutors = selectedTuteeMatches.tutorInfo.map((tutor, idx)=>{
    return {
    id: (idx+1),
    Entity: ("Tutor " + String(idx + 1)),
    Index: tutor?.personalData?.index,
    Name: tutor?.personalData?.name,
    Gender_GenderPref: (tutor?.personalData?.gender),
    SubjectsEduLevel: getRelevantSubjects(selectedTuteeMatches.tutee.educationLevel, tutor.tutorSubjects),
    IsProbonoOk: booleanMap[String(tutor.isProBonoOk)],
    IsNoFinAidOk: booleanMap[String(tutor.isUnaidedOk)],
    SecStreams: tutor.acceptableSecondaryStreams.map((stream) => streamMapping[stream]).join(", "),
    MatchingScore: (tutor?.matchingScore),
    Commit: (tutor?.commitStr)
  }})
  console.log(selectedTuteeMatches)
  const rowsMUI = [
    {
      id: 0, 
      Entity: "Tutee", 
      Index: selectedTuteeMatches.tutee.personalData?.index, 
      Name: selectedTuteeMatches.tutee.personalData?.name, 
      Gender_GenderPref: (selectedTuteeMatches.tutee.personalData?.gender + " — " + selectedTuteeMatches.tutee.preferedGender), 
      SubjectsEduLevel: (levelMapping[selectedTuteeMatches.tutee.educationLevel] + " — " + selectedTuteeMatches.tutee.subjects?.map((subject) => mapception[selectedTuteeMatches.tutee.educationLevel][subject]).join(", ")), 
      IsNoFinAidOk: booleanMap[(selectedTuteeMatches.tutee.isOnFinancialAid)],
      SecStreams: (selectedTuteeMatches.tutee.secondaryStream) == SecondaryStream.undefined ? "" : (selectedTuteeMatches.tutee.secondaryStream),
      Commit: "",
      MatchingScore: ""
    },
    ...rowsTutors,
  ]

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetAll: false
  })
  return (
    <div class="flex flex-col gap-4 items-center">
      <h2 className="h2">Match Details</h2>
      {/* <Table>
        <Table.Head>
          <Table.HeadCell>
            Row
          </Table.HeadCell>
          <Table.HeadCell>
            Name
          </Table.HeadCell>
          <Table.HeadCell>
            Gender — Gender Pref
          </Table.HeadCell>
          <Table.HeadCell>
            Edu Level — Subjects
          </Table.HeadCell>
          <Table.HeadCell>
            Probono Ok?
          </Table.HeadCell>
          <Table.HeadCell>
            On Fin Aid
          </Table.HeadCell>
          <Table.HeadCell>
            Sec Streams
          </Table.HeadCell>
          <Table.HeadCell>
            hrs/wk — thru year?
          </Table.HeadCell>
          <Table.HeadCell>
            M-Score
          </Table.HeadCell>
        </Table.Head>
        
      </Table> */}

      <Table>
        <Table.Head>
          {table.getHeaderGroups().map(headerGroup => (
            <React.Fragment key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <Table.HeadCell key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Table.HeadCell>
              ))}
            </React.Fragment>
          ))}
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell><Badge color="warning" className="justify-center">Tutee</Badge></Table.Cell>
            <Table.Cell>{rowsMUI[0].Index}</Table.Cell>
            <Table.Cell>{rowsMUI[0].Name}</Table.Cell>
            <Table.Cell>{rowsMUI[0].Gender_GenderPref}</Table.Cell>
            <Table.Cell>{rowsMUI[0].SubjectsEduLevel}</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>{rowsMUI[0].IsNoFinAidOk}</Table.Cell>
            <Table.Cell>{rowsMUI[0].SecStreams}</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
          </Table.Row>
        </Table.Body>
        <Table.Body>
        {table.getRowModel().rows.map((row, i) => (
          <Table.Row key={i} data-row={i}>
            {row.getVisibleCells().map(cell => (
              <Table.Cell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
        </Table.Body>
      </Table>

      <DataGrid getRowHeight={() => 'auto'} sx={{maxWidth: "100%"}} rows={rowsMUI} columns={columnsMUI}/>

      <Button color="primary" onClick={() => navigate("/")}>Back</Button>
    </div>
  )
}

export default MatchDetailsPage