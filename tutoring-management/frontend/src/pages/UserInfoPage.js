import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography, TextField, Divider, Stack, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { ExpandMore } from '@mui/icons-material'

// components
import { useEffect, useState } from 'react';
import users from '../_mock/user';

// hooks
import useResponsive from '../hooks/useResponsive';

// services
import { getPairing } from '../services/pairingService';
    
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
        justifyContent: 'space-between',
        maxWidth: 700
    },
}));

const SessionRecords = ({ sessions }) => (
        <Typography>
        {sessions.map(session => (
            <Accordion sx={{ maxWidth: 700 }}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                    <Typography variant='h6'>
                        {new Date(session.date).toDateString()}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <Box sx={{ fontWeight: 'bold' }}>Overview: </Box>{session.overview}
                        <Box sx={{ fontWeight: 'bold' }}>Problems: </Box>{session.problems}
                        <Box sx={{ fontWeight: 'bold' }}>Plan for next session: </Box>{session.nextSession}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        ))}
        </Typography>
    )

export default function UserInfoPage() { 
    const { pathname } = useLocation()
    const pathArr = pathname.split('/')
    const id = pathArr[pathArr.length - 1]

    useEffect(() => {
        getPairing(id).then(data => {
            setPairing(data)
            const tutee = {
                tuteeName: data.tutee.name,
                subject: data.level == null ? data.subjects[0].level.concat(' ', data.subjects[0].name) : data.level,
                noOfSessions: data.sessions.length,
                organisation: data.user.organisation, 
                tutorName: data.tutor.name,
                tutorNum: data.tutor.number,
                endDate: new Date(data.tutor.endDate).toDateString(),
                ...data
            }
            setTutee(tutee)
        })
    }, [])

    const [pairing, setPairing] = useState([])

    const [tutee, setTutee] = useState([])

    const mdUp = useResponsive('up', 'md');

    const { tuteeName, subject, location, noOfSessions, organisation, tutorName, tutorNum, endDate, strengths, weaknesses, sessions } = tutee

    return (
        <>
            <StyledRoot>
                <h1>{tuteeName}</h1>
            </StyledRoot>
            <StyledRoot>
                <Typography variant='h5'>Level/Subject(s)</Typography>
                <Typography variant='subtitle3'>{subject}</Typography>
            </StyledRoot>
            <StyledRoot>
                <Typography variant='h5'>Number of sessions</Typography>
                <Typography variant='subtitle3'>{noOfSessions}</Typography>
            </StyledRoot>
            <StyledRoot>
                <Typography variant='h5'>Strengths</Typography>
                <Typography variant='subtitle3' sx={{ maxWidth: 500 }}>{strengths}</Typography>
            </StyledRoot>
            <StyledRoot>
                <Typography variant='h5'>Weaknesses</Typography>
                <Typography variant='subtitle3'>{weaknesses}</Typography>
            </StyledRoot>
            <StyledRoot>
                <Typography variant='h5'>Tutor name</Typography>
                <Typography variant='subtitle3'>{tutorName}</Typography>
            </StyledRoot>
            <Typography variant='h5'>Tutee Records</Typography>
            {sessions ? <SessionRecords sessions={sessions} /> : null}
            <Helmet>
                <title> {tuteeName || 'Tutor Info'} </title>
            </Helmet>
        </>
    )
}