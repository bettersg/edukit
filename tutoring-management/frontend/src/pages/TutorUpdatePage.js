import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Alert, Link, Container, FormControlLabel, Typography, TextField, Stack, Button, Item, Switch, FormGroup, MenuItem, Select, InputLabel, FormControl, stepperClasses } from '@mui/material';
import { AdapterDayjs, DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
// hooks
import useResponsive from '../hooks/useResponsive';
// services
import { createPairing, getPairingId, setPairingToken } from '../services/pairingService';
import { createTutee } from '../services/tuteeService';
import { createTutor } from '../services/tutorService';
import { getUserId, setUserToken } from '../services/userService';
import { createSession } from '../services/sessionService';
import { createSubjectPairing } from '../services/subjectpairingService';

// components
import Logo from '../components/logo';
import Iconify from '../components/iconify';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
  }));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 600,
    margin: 'auto',
    minHeight: '30vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

const StyledField = styled(TextField)(({ theme }) => ({
    padding: theme.spacing(1)
}))

// ----------------------------------------------------------------------

export default function TutorUpdatePage() {
    const [first, setFirst] = useState(true)

    const [manager, setManager] = useState('')

    const [strengths, setStrengths] = useState('')

    const [weaknesses, setWeaknesses] = useState('')

    const [goals, setGoals] = useState('')

    const [tutor, setTutor] = useState('')

    const [tutee, setTutee] = useState('')

    const [date, setDate] = useState('')

    const [hours, setHours] = useState(0.5)

    const [overview, setOverview] = useState('')

    const [problems, setProblems] = useState('')

    const [nextSession, setNextSession] = useState('')

    const [success, setSuccess] = useState(null)

    const [error, setError] = useState(null)

    const mdUp = useResponsive('up', 'md');

    const handleFirstSubmit = async (e) => {
        e.preventDefault()
        // post to /api/tutees, /api/tutors, /api/pairings. NOTE: should post to /api/subjectpairings too, but that is on the admin side
        try {
            setUserToken(process.env.REACT_APP_SEARCH_TOKEN)
            setPairingToken(process.env.REACT_APP_SEARCH_TOKEN)
            const userId = await getUserId(manager)
            const newTutee = await createTutee({ name: tutee, number: '8000 8000' }) // number is hardcoded because it will eventually be added on the admin's end
            const newTutor = await createTutor({ name: tutor, endDate: '2023-11-31' }) // endDate is hardcoded
            const pairing = {
                userId,
                tuteeId: newTutee.id,
                tutorId: newTutor.id,
                strengths,
                weaknesses,
                goals
            }
            await createPairing(pairing)
            // post to /api/sessions
            const pairingId = await getPairingId(tutee, tutor)
            const session = {
                pairingId, // error handling: what if no pairing is found?
                date,
                hours,
                overview,
                problems: problems || 'NIL',
                nextSession: nextSession || 'TBC'
            }
            await createSession(session)
            await createSubjectPairing(pairingId)

            setManager('')
            setStrengths('')
            setWeaknesses('')
            setGoals('')
            setTutor('')
            setTutee('')
            setDate('')
            setHours(0.5)
            setOverview('')
            setProblems('')
            setNextSession('')
            setSuccess('Pairings and sessions updated!')
        } catch (error) {
            setError(error.message)
            setTimeout(() => setError(null), 2000)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // NOTE: i have yet to solve the problem of tutors/tutees with similar names. it will be a problem as getPairingId returns an array with more than one element!
            // post to /api/sessions
            setPairingToken(process.env.REACT_APP_SEARCH_TOKEN)
            const pairingId = await getPairingId(tutee, tutor)
            const session = {
                pairingId,
                date,
                hours,
                overview,
                problems: problems || 'NIL',
                nextSession: nextSession || 'TBC'
            }
            await createSession(session)
            setTutor('')
            setTutee('')
            setDate('')
            setHours(0.5)
            setOverview('')
            setProblems('')
            setNextSession('')
            setSuccess('Session update added! Thank you for taking your time to volunteer with us :)')
            setTimeout(() => setSuccess(null), 5000)
        } catch (error) {
            setError(error.message)
            setTimeout(() => setError(null), 2000)
        }
    }
    return (
        <>
            <Helmet>
                <title> Update tutor </title>
            </Helmet>
            
            <StyledRoot>
                {mdUp && (
                    <StyledContent>
                        <Typography variant="h2" sx={{ px: 4, mt: 2, mr: 5}}>
                        Tutor Update Form
                        </Typography>
                    </StyledContent>
                )}
                { success ? <Alert variant='filled' severity='success' sx={{ mb: 2 }}>{success}</Alert> : null}
                { error ? <Alert variant='filled' severity='error' sx={{ mb: 2 }}>{error}</Alert> : null}
                <FormGroup>
                    <FormControlLabel control={<Switch defaultChecked/>} label="First session" onChange={() => setFirst(!first)} />
                </FormGroup>

                <form onSubmit={first ? handleFirstSubmit : handleSubmit}>
                    { first ? 
                    <div>
                        <Stack spacing={0.5}>
                            <StyledField required value={manager} onChange={({ target }) => setManager(target.value)} name="manager" label="Name of volunteer manager" />    
                        </Stack>
                        <Stack spacing={0.5}>
                            <StyledField required value={strengths} onChange={({ target }) => setStrengths(target.value)} name="strengths" label="Strengths of tutee" style={first ? {display: 'flex'} : {display: 'none'}} multiline />    
                        </Stack>                
                        <Stack spacing={0.5}>
                            <StyledField required value={weaknesses} onChange={({ target }) => setWeaknesses(target.value)} name="weaknesses" label="Weaknesses of tutee" style={first ? {display: 'flex'} : {display: 'none'}} multiline />    
                        </Stack> 
                        <Stack spacing={0.5}>
                            <StyledField required value={goals} onChange={({ target }) => setGoals(target.value)} name="goals" label="Goals for tutee" style={first ? {display: 'flex'} : {display: 'none'}} multiline />    
                        </Stack> 
                    </div>
                    : null }
                    <StyledField required value={tutor} onChange={({ target }) => setTutor(target.value)} name="tutor" label="Full Tutor name" />
                    <StyledField required value={tutee} onChange={({ target }) => setTutee(target.value)} name="tutee" label="Full Tutee name" />
                    <StyledField required type='date' value={date} onChange={({ target }) => setDate(target.value)} name="date" label="Date of session" />
                    <FormControl sx={{ minWidth: 150, justifyContent: 'center' }} required>
                        <InputLabel id="hours">No. of hours</InputLabel>
                        <Select 
                            label="Hours"
                            value={hours}
                            onChange={(e) => setHours(e.target.value)}
                        >
                            <MenuItem value={0.5}>0.5</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={1.5}>1.5</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                        </Select>
                    </FormControl>
                    <Stack spacing={0.5}>
                        <StyledField required value={overview} onChange={({ target }) => setOverview(target.value)} name="overview" label="How did the session go?" multiline />    
                    </Stack>  
                    <Stack spacing={0.5}>
                        <StyledField value={problems} onChange={({ target }) => setProblems(target.value)} name="problems" label="Any problems faced?" multiline />    
                    </Stack>                
                    <Stack spacing={0.5}>
                        <StyledField value={nextSession} onChange={({ target }) => setNextSession(target.value)} name="next_session" label="What will you cover for the next session?" multiline />    
                    </Stack> 
                    <Button type='submit' variant='contained' sx={{ ml: 1 }}>Submit</Button>
                </form>
            </StyledRoot>
        </>
    )
}