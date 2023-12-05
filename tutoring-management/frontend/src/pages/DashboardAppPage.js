import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

// @mui
import {
  Box,
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  TextField,
  MenuItem,
  Modal,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';

// services
import { getAllPairings, getMasterPairings, setPairingToken } from '../services/pairingService';
import { getAllTutees, setTuteeToken } from '../services/tuteeService';
import { setSessionToken } from '../services/sessionService';
import { setTutorToken } from '../services/tutorService';
import { setUserToken } from '../services/userService';

// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import UserContext from '../UserContext'

// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';


// mock
import USERLIST from '../_mock/user';
import account from '../_mock/account'


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'tutee', label: 'Tutee', alignRight: false },
  { id: 'tutor', label: 'Tutor', alignRight: false },
  { id: 'level', label: 'Level', alignRight: false },
  { id: 'endDate', label: 'Tutor End Date', alignRight: false },
  { id: 'lastSession', label: 'Days since Last Session', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.tutee.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function DashboardAppPage() {
  // const theme = useTheme();
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [modalOpen, setModalOpen] = useState(false)
  
  const [pairings, setPairings] = useState([])

  const [dashboard, setDashboard] = useState([])

  const [tutees, setTutees] = useState([])

  const [user, setUser] = useContext(UserContext)

  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const parsedUser = JSON.parse(loggedUserJSON)
    if (loggedUserJSON) {
      setUser(parsedUser)
      setPairingToken(parsedUser.token)
      setSessionToken(parsedUser.token)
      setTutorToken(parsedUser.token)
      setTuteeToken(parsedUser.token)
      setUserToken(parsedUser.token)
      initDashboard(parsedUser)
    } else if (!user && !parsedUser) {
      navigate('/login')
    } else {
      initDashboard(user)
    }
  }, [])

  // if token expires
    getMasterPairings().catch(error => {
      window.localStorage.removeItem('loggedUser')
      navigate('/login')
    })

  const initDashboard = (user) => {
    if (user.username === 'EduHopeSG') {
      getMasterPairings().then(data => { 
        setPairings(data)
        const dashboard = data.map(pairing => {
          const {id} = pairing
          const tutee = pairing.tutee.name
          const tutor = pairing.tutor.name
          const subject = pairing.level == null ? pairing.subjects[0].level.concat(' ', pairing.subjects[0].symbol) : pairing.level 
          const endDate = new Date(pairing.tutor.endDate).toDateString()
          const lastSession = Math.floor((new Date().getTime() - new Date(pairing.sessions[0].date).getTime()) / (1000 * 60 * 60 * 24))
          return { id, tutee, tutor, subject, endDate, lastSession }
        })
        setDashboard(dashboard)
      })
    } else {
      getAllPairings(user.id).then(data => { 
        setPairings(data)
        const dashboard = data.map(pairing => {
          const {id} = pairing
          const tutee = pairing.tutee.name
          const tutor = pairing.tutor.name
          const subject = pairing.level == null ? pairing.subjects[0].level.concat(' ', pairing.subjects[0].symbol) : pairing.level 
          const endDate = new Date(pairing.tutor.endDate).toDateString()
          const lastSession = Math.floor((new Date().getTime() - new Date(pairing.sessions[0].date).getTime()) / (1000 * 60 * 60 * 24))
          return { id, tutee, tutor, subject, endDate, lastSession }
        })
        setDashboard(dashboard)
      })
    }
    try {
      getAllTutees().then(data => setTutees(data))
    } catch {
      navigate('/login')
    }
  }

  const handleViewMore = (id) => {
    navigate(`/dashboard/tutee/${id}`)
  }

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = tutees.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) { // if el is not selected
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) { // if first el is selected
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleNewUser = () => {
    setModalOpen(true)
  }

  const handleUpdatePairing = (e) => {
    e.preventDefault()
    setModalOpen(false)
  }

  const handleCloseModal = () => setModalOpen(false)

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tutees.length) : 0;

  const filteredUsers = applySortFilter(dashboard, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <div>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby ="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update current pairing (feature to be added!)
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleUpdatePairing}>
              <div>
                <TextField name="tutee" label="Tutee name" sx={{ py: 0.5 }}/>
                <TextField name="tutor" label="Tutor name" sx={{ py: 0.5 }}/>
                <TextField name="level" label="Level and subject" sx={{ py: 0.5 }}/>
                <TextField name="tutorNum" label="Tutor number" sx={{ py: 0.5 }}/>
                <TextField name="endDate" label="Tutor end date" sx={{ py: 0.5 }}/>
              </div>
              <Button type='submit' variant='contained'>Create new</Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>

      <Helmet>
        <title> Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 5 }}>
            Hi {user.username}, Welcome back
          </Typography>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleNewUser}>
            Update Pairing
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tutees.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, tutee, tutor, subject, endDate, lastSession } = row
                    const selectedUser = selected.indexOf(tutee) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, tutee)} />
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={tutee} src='/assets/images/avatars/avatar_10.jpg' />
                            <Typography variant="subtitle2" noWrap>
                              {tutee}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{tutor}</TableCell>

                        <TableCell align="left">{subject}</TableCell>

                        <TableCell align="left">{endDate}</TableCell>

                        <TableCell align="left">{lastSession}</TableCell>

                        <TableCell align="right">
                          <Button variant="outlined" onClick={() => handleViewMore(id)}>More</Button>
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pairings.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
          Edit
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}
