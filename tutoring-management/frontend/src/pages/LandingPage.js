import { Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailListForm from '../sections/@landingpage/EmailListForm'

export default function LandingPage() {
    const StyledContent = styled('div')(({ theme }) => ({
        maxWidth: 480,
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: theme.spacing(12, 0),
        gap: 10
      }));
    
    return (
    <>
        <Container maxWidth="sm">
            <StyledContent>
                <EmailListForm />
            </StyledContent>
        </Container>
    </>
)}

