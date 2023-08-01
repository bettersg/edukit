// @ts-nocheck
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Tutee, Tutor } from '@/types/person';

import { selectedTuteeMatchesActions } from '../store/selectedTuteeMatchesSlice';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
} from '@tanstack/react-table';
import { Table, Pagination, Select } from 'flowbite-react';
import React, { useMemo } from 'react';
import { MatchingList } from '@/types/globalVariables';

interface MatchingTableData {
  tutee: string;
  tutor1: number;
  tutor2: number;
  tutor3: number;
  tutor4: number;
  tutor5: number;
}

const MainMatchingTable = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchingTable = useSelector(state => state.matchesSummary);
  // console.log(matchingTable, "MATCHING TABLE")
  const rows: MatchingTableData[] = matchingTable.map((tuteeMatch, i) => {
    return {
      // id: i,
      tutee: tuteeMatch.tutee.name + ' - ' + String(tuteeMatch.tutee.index),
      tutor1: tuteeMatch.tutor1.index,
      tutor2: tuteeMatch.tutor2.index,
      tutor3: tuteeMatch.tutor3.index,
      tutor4: tuteeMatch.tutor4.index,
      tutor5: tuteeMatch.tutor5.index,
    };
  });

  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    const tuteeParsedData: Tutee[] = window.tuteeParsedData;
    const tutorParsedData: Tutor[] = window.tutorParsedData;
    const matchingTable: MatchingList = window.matchingList;
    const row = matchingTable[Number(e.currentTarget.dataset.row)];

    const tuteeIndex = row.tutee.index;
    const tutee = tuteeParsedData.find(
      row => row.personalData.index === tuteeIndex,
    );

    let tutorInfo: {
      matchingScore: any;
      personalData?: Person | undefined;
      isProBonoOk?: boolean | undefined;
      isUnaidedOk?: boolean | undefined;
      acceptableSecondaryStreams?: SecondaryStream[] | undefined;
      tutorSubjects?: TutorSubjects | undefined;
      commitStr?: string | undefined;
    }[] = [];

    for (let i = 0; i < row.tutorMatches.length; i++) {
      const tutorIndex = row.tutorMatches[i].index;
      let tutorRaw = tutorParsedData.find(
        row => row.personalData.index === tutorIndex,
      );
      let tutor = {
        ...tutorRaw,
        matchingScore: row.tutorMatches[i].matchingScore,
      };

      tutorInfo.push(tutor);
    }
    tutorInfo = tutorInfo.filter(tutor => tutor.matchingScore > 0);
    const selectedTuteeMatchesState = {
      tutee,
      tutorInfo,
    };
    console.log(selectedTuteeMatchesState, 'state Change');
    dispatch(
      selectedTuteeMatchesActions.updateSelectedTuteeMatches(
        selectedTuteeMatchesState,
      ),
    );
    navigate('/details');
  };

  const columnHelper = createColumnHelper<MatchingTableData>();

  const columns = useMemo(
    () => [
      columnHelper.accessor('tutee', {
        header: () => <span>Tutee Name — Row</span>,
      }),
      columnHelper.accessor('tutor1', {
        header: () => <span>Tutor 1</span>,
      }),
      columnHelper.accessor('tutor2', {
        header: () => <span>Tutor 2</span>,
      }),
      columnHelper.accessor('tutor3', {
        header: () => <span>Tutor 3</span>,
      }),
      columnHelper.accessor('tutor4', {
        header: () => <span>Tutor 4</span>,
      }),
      columnHelper.accessor('tutor5', {
        header: () => <span>Tutor 5</span>,
      }),
    ],
    [],
  );
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    autoResetAll: false,
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <>
      <div class="flex flex-col items-center gap-4">
        <h2 className="h2">Overview</h2>
        <div className="flex gap-2 flex-col">
          <Table hoverable>
            <Table.Head>
              {table.getHeaderGroups().map(headerGroup => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Table.HeadCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Table.HeadCell>
                  ))}
                </React.Fragment>
              ))}
            </Table.Head>
            <Table.Body>
              {table.getRowModel().rows.map((row, i) => (
                <Table.Row
                  key={
                    i +
                    table.getState().pagination.pageSize *
                      table.getState().pagination.pageIndex
                  }
                  data-row={
                    i +
                    table.getState().pagination.pageSize *
                      table.getState().pagination.pageIndex
                  }
                  onClick={handleRowClick}
                  className="cursor-pointer"
                >
                  {row.getVisibleCells().map(cell => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          {table.getPageCount() > 1 ? (
            <div className="flex flex-row justify-between items-center">
              <Pagination
                layout="pagination"
                currentPage={table.getState().pagination.pageIndex + 1}
                showIcons
                totalPages={table.getPageCount()}
                onPageChange={p => table.setPageIndex(p - 1)}
              />
              <div>
                <Select
                  value={table.getState().pagination.pageSize}
                  onChange={e => {
                    table.setPageSize(Number(e.target.value));
                  }}
                >
                  {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize} entries
                    </option>
                  ))}
                </Select>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default MainMatchingTable;
