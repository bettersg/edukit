import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectedTuteeSlice } from '@/types/stateSlice';
import { useEffect, useState } from 'react';
import {
  EducationLevel,
  SecondaryStream,
  fancyPrimarySubjects,
  fancySecondarySubjects,
  fancyJcSubjects,
  fancyIbSubjects,
} from '@/types/educationSubjects';
import { Gender, Subject, TutorSubjects } from '@/types/person';
import { Badge, Button, Pagination, Select, Table } from 'flowbite-react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnDef,
} from '@tanstack/react-table';
import React, { useMemo } from 'react';

interface BaseDetailsTableData {
  id: number;
  entity: string;
  name: string;
  subjects: string;
  matchingScore: number;
  // gender?: string;
  // isProbonoOk?: string;
  // isNoFinAidOk?: string;
  // secStreams?: string;
  // commit?: string;
  // phoneNum?: string;
}

interface KSTableData extends BaseDetailsTableData {
  gender: string;
  isProbonoOk: string;
  isNoFinAidOk: string;
  secStreams: string;
  commit: string;
  phoneNum: string;
}

const mapception = {
  primary: fancyPrimarySubjects,
  lowerSecondary: fancySecondarySubjects,
  upperSecondary: fancySecondarySubjects,
  jc: fancyJcSubjects,
  ib: fancyIbSubjects,
};

const booleanMap = {
  true: 'Yes',
  false: 'No',
  null: 'Null',
  undefined: 'Null',
};

const MatchDetailsPage = () => {
  const navigate = useNavigate();
  const selectedTuteeMatches: selectedTuteeSlice = useSelector(
    (state: { selectedTuteeMatches: selectedTuteeSlice }) =>
      state.selectedTuteeMatches,
  );

  const initSort: SortingState = [
    {
      id: 'matchingScore',
      desc: true,
    },
    // {
    //   id: 'commit',
    //   desc: true,
    // },
    {
      id: 'name',
      desc: false,
    },
  ];

  const [sorting, setSorting] = useState<SortingState>(initSort);

  const getRelevantSubjects = (
    eduLevel: EducationLevel,
    tutorSubjects: TutorSubjects,
  ) => {
    let relevantSubjects: Subject[] = [];
    switch (eduLevel) {
      case EducationLevel.Primary:
        relevantSubjects = tutorSubjects.primary!.map(
          subject => fancyPrimarySubjects[subject],
        );
        break;
      case EducationLevel.LowerSecondary:
        relevantSubjects = tutorSubjects.lowerSecondary!.map(
          subject => fancySecondarySubjects[subject],
        );
        break;
      case EducationLevel.UpperSecondary:
        relevantSubjects = tutorSubjects.upperSecondary!.map(
          subject => fancySecondarySubjects[subject],
        );
        break;
      case EducationLevel.JuniorCollege:
        relevantSubjects = tutorSubjects.jc!.map(
          subject => fancyJcSubjects[subject],
        );
        break;
      case EducationLevel.InternationalBaccalaureate:
        relevantSubjects = tutorSubjects.ib!.map(
          subject => fancyIbSubjects[subject],
        );
        break;
      default:
        break;
    }
    return relevantSubjects?.join(', ');
  };

  useEffect(() => {
    if (!selectedTuteeMatches) {
      navigate('/');
    }
  }, []);

  const streamMapping = {
    na: 'N(A)',
    nt: 'N(T)',
    exp: 'Exp',
    ip: 'IP',
    ib: 'IB',
  };

  const levelMapping = {
    primary: 'Primary',
    lowerSecondary: 'Lower Secondary',
    upperSecondary: 'Upper Secondary',
    jc: 'JC',
    ib: 'IB',
  };

  const [KScolumns, setKSColumns] = useState<ColumnDef<KSTableData, any>[]>([]);
  const [EHcolumns, setEHcolumns] = useState<
    ColumnDef<BaseDetailsTableData, any>[]
  >([]);
  const [rows, setRows] = useState<KSTableData[] | BaseDetailsTableData[]>([]);
  const [tuteeRows, setTuteeRows] = useState<
    BaseDetailsTableData | KSTableData | undefined
  >();

  useEffect(() => {
    if (!selectedTuteeMatches) {
      navigate('/');
    } else {
      switch (selectedTuteeMatches.dataFormat) {
        case 'KSFormat':
          {
            const ksRows = selectedTuteeMatches.tutorInfo.map((tutor, i) => ({
              entity: 'Tutor',
              id: tutor.personalData.index!,
              name: tutor.personalData.name!,
              gender: tutor.personalData.gender!,
              subjects: getRelevantSubjects(
                selectedTuteeMatches.tutee.educationLevel!,
                tutor.tutorSubjects,
              ),
              isProbonoOk: booleanMap[String(tutor.isProBonoOk)],
              isNoFinAidOk: booleanMap[String(tutor.isUnaidedOk)],
              secStreams:
                tutor.acceptableSecondaryStreams
                  ?.map(stream => streamMapping[stream])
                  ?.join(', ') ?? '',
              commit: tutor.commitStr ?? '',
              matchingScore: tutor.matchingScore,
              phoneNum: String(tutor.personalData.contact?.phone).replace(
                'undefined',
                'Unprovided',
              ),
            }));
            const columnHelper = createColumnHelper<KSTableData>();

            setKSColumns([
              columnHelper.display({
                id: 'entity',
                header: () => <span>Entity</span>,
                cell: props => (
                  <Badge color="success" className="justify-center">
                    {props.row.original.entity}
                  </Badge>
                ),
              }),
              columnHelper.accessor('id', {
                header: () => <span>Index</span>,
              }),
              columnHelper.accessor('name', {
                header: () => <span>Name</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('gender', {
                header: () => <span>Gender — Gender Pref</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('subjects', {
                header: () => <span>Edu Level — Subjects</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('isProbonoOk', {
                header: () => <span>Probono Ok?</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('isNoFinAidOk', {
                header: () => <span>On Fin Aid</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('secStreams', {
                header: () => <span>Sec Streams</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('commit', {
                header: () => <span>hrs/wk — thru year?</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('matchingScore', {
                header: () => <span>M-Score</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('phoneNum', {
                header: () => <span>Phone</span>,
                enableMultiSort: false,
                enableSorting: false,
              }),
            ]);
            setRows(ksRows as KSTableData[]);

            setTuteeRows({
              id: selectedTuteeMatches.tutee.personalData?.index!,
              entity: 'Tutee',
              name: selectedTuteeMatches.tutee.personalData?.name!,
              gender:
                String(
                  selectedTuteeMatches.tutee.personalData?.gender!,
                ).replace('undefined', 'Unprovided') +
                ' — ' +
                selectedTuteeMatches.tutee.preferedGender,
              subjects:
                levelMapping[selectedTuteeMatches.tutee.educationLevel!] +
                ' — ' +
                selectedTuteeMatches.tutee.subjects
                  ?.map(
                    subject =>
                      mapception[selectedTuteeMatches.tutee.educationLevel!][
                        subject
                      ],
                  )
                  .join(', '),
              isNoFinAidOk:
                booleanMap[
                  String(selectedTuteeMatches.tutee.isOnFinancialAid!)
                ],
              isProbonoOk: String(false),
              secStreams:
                selectedTuteeMatches.tutee.secondaryStream ==
                SecondaryStream.undefined
                  ? ''
                  : streamMapping[selectedTuteeMatches.tutee.secondaryStream!],
              commit: '',
              matchingScore: 0,
              phoneNum: String(
                selectedTuteeMatches.tutee.personalData?.contact?.phone,
              ).replace('undefined', 'Unprovided'),
            } as KSTableData);
          }
          break;
        case 'EHFormat':
          {
            const ehRows = selectedTuteeMatches.tutorInfo.map((tutor, i) => ({
              entity: 'Tutor',
              id: tutor.personalData.index!,
              name: tutor.personalData.name!,
              subjects: getRelevantSubjects(
                selectedTuteeMatches.tutee.educationLevel!,
                tutor.tutorSubjects,
              ),
              matchingScore: tutor.matchingScore,
            }));

            const columnHelper = createColumnHelper<BaseDetailsTableData>();

            setEHcolumns([
              columnHelper.display({
                id: 'entity',
                header: () => <span>Entity</span>,
                cell: props => (
                  <Badge color="success" className="justify-center">
                    {props.row.original.entity}
                  </Badge>
                ),
              }),
              columnHelper.accessor('id', {
                header: () => <span>Row</span>,
              }),
              columnHelper.accessor('name', {
                header: () => <span>Name</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('subjects', {
                header: () => <span>Edu Level — Subjects</span>,
                enableMultiSort: true,
              }),
              columnHelper.accessor('matchingScore', {
                header: () => <span>M-Score</span>,
                enableMultiSort: true,
              }),
            ]);
            setRows(ehRows as BaseDetailsTableData[]);
            setTuteeRows({
              id: selectedTuteeMatches.tutee.personalData?.index!,
              entity: 'Tutee',
              name: selectedTuteeMatches.tutee.personalData?.name!,
              subjects:
                levelMapping[selectedTuteeMatches.tutee.educationLevel!] +
                ' — ' +
                selectedTuteeMatches.tutee.subjects
                  ?.map(
                    subject =>
                      mapception[selectedTuteeMatches.tutee.educationLevel!][
                        subject
                      ],
                  )
                  .join(', '),
              matchingScore: 0,
            } as BaseDetailsTableData);
          }
          break;
        default:
          break;
      }
    }
  }, []);

  type CorrectCols = ColumnDef<BaseDetailsTableData | KSTableData, any>[];

  const table = useReactTable<KSTableData | BaseDetailsTableData>({
    data: rows,
    columns: (selectedTuteeMatches.dataFormat === 'KSFormat'
      ? KScolumns
      : EHcolumns) as CorrectCols,
    getCoreRowModel: getCoreRowModel(),
    autoResetAll: false,
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      sorting: initSort,
    },
    enableMultiSort: true,
    isMultiSortEvent: e => {
      return true;
    },
  });

  const renderTutorFormat = (tuteeRow: BaseDetailsTableData | KSTableData) => {
    switch (selectedTuteeMatches.dataFormat) {
      case 'KSFormat':
        return (
          <>
            <Table.Cell>
              <Badge color="warning" className="justify-center">
                Tutee
              </Badge>
            </Table.Cell>
            <Table.Cell>{tuteeRow.id}</Table.Cell>
            <Table.Cell>{tuteeRow.name}</Table.Cell>
            <Table.Cell>{(tuteeRow as KSTableData).gender}</Table.Cell>
            <Table.Cell>{tuteeRow.subjects}</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>{(tuteeRow as KSTableData).isNoFinAidOk}</Table.Cell>
            <Table.Cell>{(tuteeRow as KSTableData).secStreams}</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
            <Table.Cell>{(tuteeRow as KSTableData).phoneNum}</Table.Cell>
          </>
        );
      case 'EHFormat':
        return (
          <>
            <Table.Cell>
              <Badge color="warning" className="justify-center">
                Tutee
              </Badge>
            </Table.Cell>
            <Table.Cell>{tuteeRow.id}</Table.Cell>
            <Table.Cell>{tuteeRow.name}</Table.Cell>
            <Table.Cell>{tuteeRow.subjects}</Table.Cell>
            <Table.Cell>N/A</Table.Cell>
          </>
        );
    }
  };
  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="h2">Match Details</h2>
      <div className="flex flex-col gap-2 max-w-full">
        <div>
          <Table>
            <Table.Head>
              {table.getHeaderGroups().map(headerGroup => (
                <React.Fragment key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <Table.HeadCell key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className:
                              (header.column.getCanSort()
                                ? 'cursor-pointer select-none '
                                : '') + 'flex flex-row gap-2 items-center',
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {header.column.getCanSort() ? (
                            <span>
                              {{
                                asc: (
                                  <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13V1m0 0L1 5m4-4 4 4"
                                    />
                                  </svg>
                                ),
                                desc: (
                                  <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 1v12m0 0 4-4m-4 4L1 9"
                                    />
                                  </svg>
                                ),
                                false: (
                                  <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 16 20"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4 6v13m0 0 3-3m-3 3-3-3m11-2V1m0 0L9 4m3-3 3 3"
                                    />
                                  </svg>
                                ),
                              }[
                                String(header.column.getIsSorted()) as string
                              ] ?? null}
                            </span>
                          ) : (
                            <></>
                          )}
                        </div>
                      )}
                    </Table.HeadCell>
                  ))}
                </React.Fragment>
              ))}
            </Table.Head>
            <Table.Body className={rows.length > 0 ? 'border-b' : ''}>
              <Table.Row>{tuteeRows && renderTutorFormat(tuteeRows)}</Table.Row>
            </Table.Body>
            <Table.Body>
              {table.getRowModel().rows.map((row, i) => (
                <Table.Row key={i} data-row={i}>
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
        </div>
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

      <Button color="primary" onClick={() => navigate('/')}>
        Back
      </Button>
    </div>
  );
};

export default MatchDetailsPage;
