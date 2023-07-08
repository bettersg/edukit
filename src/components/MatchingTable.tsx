// @ts-nocheck
import { useEffect, useState } from 'react'
import { Stack } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { Tutee, TuteeMatches, Tutor, TutorMatchScore } from '@/types/person'
import {
  getGSheetsData,
  transformKSTuteeData,
  transformKSTutorData,
} from '@/utils/api'
import { API_ENDPOINT_TUTEE, API_ENDPOINT_TUTOR } from '@/utils/config'
import { getMatchScore } from '@/utils/score'

const MatchingTable = () => {
  const [tutors, setTutors] = useState<Tutor[]>([])
  const [tutees, setTutees] = useState<Tutee[]>([])
  const [matches, setMatches] = useState<TuteeMatches[]>()

  const columns: GridColDef[] = [
    { field: 'tutee', headerName: 'Tutee', width: 200 },
    { field: 'tutor1', headerName: 'Tutor 1', width: 100, type: 'number' },
    { field: 'tutor2', headerName: 'Tutor 2' },
    { field: 'tutor3', headerName: 'Tutor 3' },
    { field: 'tutor4', headerName: 'Tutor 4' },
    { field: 'tutor5', headerName: 'Tutor 5' },
  ]

  /**
   *
   */
  const loadData = async () => {
    setTutors(
      await getGSheetsData<Tutor>(
        API_ENDPOINT_TUTOR,
        true,
        transformKSTutorData
      )
    )
    setTutees(
      await getGSheetsData<Tutee>(
        API_ENDPOINT_TUTEE,
        true,
        transformKSTuteeData
      )
    )
  }

  const matchTuteeToTutors = () => {
    const tuteeMatches = tutees?.map(
      (tutee: Tutee): TuteeMatches => ({
        ...tutee,
        tutors: tutors
          .map(
            (tutor: Tutor): TutorMatchScore => ({
              ...tutor,
              score: getMatchScore(tutor, tutee),
            })
          )
          .sort(
            (a: TutorMatchScore, b: TutorMatchScore): number =>
              b.score - a.score
          )
          .slice(0, 5),
      })
    )
    setMatches(tuteeMatches)
  }

  const showMatchResults = (matchResults: TuteeMatches[]) => {
    return matchResults.map
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    tutors && tutees && matchTuteeToTutors()
  }, [tutors, tutees])

  return (
    <Stack alignItems="center" sx={{ width: '75%' }}>
      {/* {matches && (
        <DataGrid
          columns={columns}
          rows={matches}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 10 } },
          }}
        />
      )} */}
    </Stack>
  )
}

export default MatchingTable
