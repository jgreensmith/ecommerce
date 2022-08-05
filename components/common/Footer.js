import { useContext } from "react";
import { IconButton, Button, Container, Grid, Paper, Toolbar, Typography, Divider } from "@mui/material";
import { borderTop, Box } from "@mui/system";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import SettingsContext from "../../utils/context/SettingsContext"; 
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
            position: 'static',
            background: 'inherit',
            bottom: '0',
            zIndex: 10,
            height: '60px'
        }}
    >
        <Divider  />
        <Box p={4} sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Box >
                <Typography variant="body2" align="left" sx={{pt: 1, color: "background.text"}}>
                    {'© '}
                    {companyName} 2022
                    {'.'}
                </Typography>
                <Typography variant="body2" align="left" sx={{pt: 1, color: "background.text"}}>
                    Powered by 
                    <Button 
                    variant="text" 
                    sx={{textTransform: 'capitalize', color: "background.text"}}
                    href="https://www.linkedin.com/in/james-greensmith-b808341a4/" 
                    target="_blank" 
                    rel="noreferrer"
                    >
                        DefaultCommerce
                    </Button>
                </Typography>
            </Box>
            <Box sx={{minWidth: '200px'}}>
                <Button variant="text" href={`mailto:${email}?subject=${subject}`} sx={{color: "background.text"}} >
                    Email
                </Button>
                { insta &&
                    <IconButton href={insta} target="_blank" rel="noreferrer" sx={{color: "background.text"}} >
                        <InstagramIcon  />
                    </IconButton> 
                }  
                { facebook &&
                    <IconButton href={facebook} target="_blank" rel="noreferrer" sx={{color: "background.text"}} >
                        <FacebookIcon  />
                    </IconButton> 
                }
                { twitter &&
                    <IconButton href={twitter} target="_blank" rel="noreferrer" sx={{color: "background.text"}} >
                        <TwitterIcon  />
                    </IconButton> 
                }
                { tiktok &&
                    <IconButton href={tiktok} target="_blank" rel="noreferrer" sx={{color: "background.dark"}} >
                        <FaTiktok  />
                    </IconButton> 
                }
                { customLinks && 
                    customLinks.map((link) => (
                        <Button key={link._key} variant="text" href={link.linkUrl} target="_blank" rel="noreferrer" sx={{color: "background.text"}} >
                            {link.linkTitle}
                        </Button>
                            
                    ))
                }
                
            </Box>

        </Box>
    </Container>
  )
}