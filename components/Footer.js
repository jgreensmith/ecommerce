import { useContext } from "react";
import { IconButton, Button, Container, Grid, Paper, Toolbar, Typography } from "@mui/material";
import { borderTop, Box } from "@mui/system";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import SettingsContext from "../utils/context/SettingsContext"; 
import { FaTiktok } from "react-icons/fa";


export default function Footer() {
    const { settings } = useContext(SettingsContext);
    const companyName = settings[0].title;
    const contact = settings[0].contactObj;
    const email = contact.email;
    const subject = contact.subject;
    const insta = contact.instagram;
    const facebook = contact.facebook;
    const twitter = contact.twitter;
    const tiktok = contact.tiktok;
    const customLinks = contact.customLinks;

  return (

    <Container maxWidth="100%" component="footer" 
        sx={{ 
            //position: 'absolute',
            background: 'inherit',
            //bottom: '-20px',
            transform: 'translateY(-20px)', 
            borderTop: '1px solid black',
            

        }}
    >
        <Box p={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box >
                <Typography variant="body2" color="primary" align="left" sx={{pt: 1}}>
                    {'© '}
                    {companyName} 2022
                    {'.'}
                </Typography>
                <Typography variant="body2" color="primary" align="left" sx={{pt: 1}}>
                    Powered by 
                    <Button 
                    variant="text" 
                    sx={{textTransform: 'capitalize'}}
                    href="https://www.linkedin.com/in/james-greensmith-b808341a4/" 
                    target="_blank" 
                    rel="noreferrer"
                    >
                        DefaultCommerce
                    </Button>
                </Typography>
            </Box>
            <Box>
                <Button variant="text" href={`mailto:${email}?subject=${subject}`} >
                    Email
                </Button>
                { insta &&
                    <IconButton href={insta} target="_blank" rel="noreferrer" color="primary" >
                        <InstagramIcon  />
                    </IconButton> 
                }  
                { facebook &&
                    <IconButton href={facebook} target="_blank" rel="noreferrer" color="primary" >
                        <FacebookIcon  />
                    </IconButton> 
                }
                { twitter &&
                    <IconButton href={twitter} target="_blank" rel="noreferrer" color="primary" >
                        <TwitterIcon  />
                    </IconButton> 
                }
                { tiktok &&
                    <IconButton href={tiktok} target="_blank" rel="noreferrer" color="primary" >
                        <FaTiktok  />
                    </IconButton> 
                }
                { customLinks && 
                    customLinks.map((link) => (
                        <div key={link._key}>
                            <Button variant="text" href={link.linkUrl} target="_blank" rel="noreferrer" >
                                {link.linkTitle}
                            </Button>
                        </div>
                            
                    ))
                }
                
            </Box>

        </Box>
    </Container>
  )
}