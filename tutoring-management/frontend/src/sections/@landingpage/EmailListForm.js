import { Alert, Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { useState } from 'react';
import { createWaitingList } from '../../services/waitinglistService';

export default function LandingPage() {
    const [email, setEmail] = useState('')
    const [notif, setNotif] = useState(null)

    const handleClick = async () => {
        await createWaitingList({ email })
        setEmail('')
        setNotif('Email added to waiting list!')
        setTimeout(() => setNotif(null), 3000)
    }

    return (
    <>
        <Typography variant="h4" gutterBottom>
            EduHopeSG Tutoring Management System is currently in closed beta.
        </Typography>
        <Typography variant="body2">
            Join our waiting list to be updated when we release it to more organisations.
        </Typography>
        <Stack spacing={3}>
            <TextField name="email" label="Email address" value={email} onChange={({ target }) => setEmail(target.value)} />
        </Stack>
        { notif ? <Alert variant='filled' severity='success'>{notif}</Alert> : null}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
            Submit
        </LoadingButton>
    </>
)}
