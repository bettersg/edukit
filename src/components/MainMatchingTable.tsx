import {Stack} from '@mui/material'
import {DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid'

const MainMatchingTable = () => {

    const columns: GridColDef[] = [
        { field: 'Tutor', headerName: 'Tutor', width: 130 },
        { field: 'Tutee1', headerName: 'Tutee-1', width: 70, type: 'number'},
        { field: 'Tutee2', headerName: 'Tutee-2', width: 70, type: 'number'},
        { field: 'Tutee3', headerName: 'Tutee-3', width: 70, type: 'number'},
        { field: 'Tutee4', headerName: 'Tutee-4', width: 70, type: 'number'},
        { field: 'Tutee5', headerName: 'Tutee-5', width: 70, type: 'number'},
      ];
      
      const rows = [
        { id:1, Tutor: "A", Tutee1: 101, Tutee2: 101,Tutee3: 101,Tutee4: 101,Tutee5: 101},
        { id:2, Tutor: "B", Tutee1: 101, Tutee2: 101,Tutee3: 101,Tutee4: 101,Tutee5: 101},
        { id:3, Tutor: "C", Tutee1: 101, Tutee2: 101,Tutee3: 101,Tutee4: 101,Tutee5: 101},
        { id:4, Tutor: "D", Tutee1: 101, Tutee2: 101,Tutee3: 101,Tutee4: 101,Tutee5: 101},
        { id:5, Tutor: "E", Tutee1: 101, Tutee2: 101,Tutee3: 101,Tutee4: 101,Tutee5: 101},
      ];

  return (
    <>
        <Stack alignItems="center">
        <p>
        MainMatchingTable
        </p>
        <DataGrid  rows={rows} columns={columns}/>
        </Stack>
    </>
  )
}

export default MainMatchingTable