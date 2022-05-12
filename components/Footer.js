import { IconButton, Button, Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';


export default function Footer() {
  return (

    <Container maxWidth="100%" component="footer" 
        sx={{ background: 'transparent' }}
    >
        <Box p={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box >
                <Typography variant="body2" color="primary" align="left" sx={{pt: 1}}>
                    {'© '}
                    MCR-Digital 2022
                    {'.'}
                </Typography>
                <Typography variant="body2" color="primary" align="left" sx={{pt: 1}}>
                    Web design by 
                    <Button 
                    variant="text" 
                    sx={{textTransform: 'capitalize'}}
                    href="https://www.linkedin.com/in/james-greensmith-b808341a4/" 
                    target="_blank" 
                    rel="noreferrer"
                    >
                        James Greensmith
                    </Button>
                </Typography>
            </Box>
            <Box>
                <Button variant="text" href="mailto:digitalmcr@hotmail.com?subject=MCR Digital enquiry" >
                    Email
                </Button>
                <IconButton href="https://www.instagram.com/digital.mcr/" target="_blank" rel="noreferrer" color="primary" >
                    <InstagramIcon  />
                </IconButton>   
                <IconButton href="https://www.linkedin.com/in/d%E2%80%99arcy-o%E2%80%99connor-b730a9152/" target="_blank" rel="noreferrer" color="primary" >
                    <LinkedInIcon  />
                </IconButton> 
            </Box>

        </Box>
    </Container>
  )
}