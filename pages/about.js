import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Link, Paper, Slide, Toolbar, Typography } from "@mui/material";
import Layout from "../components/Layout";
import { client } from "../lib/client";
import { ProfileImg } from "../utils/styles";

const About = ({settings}) => {
    console.log(settings)
    return(
    <Layout title="About" >

        <Container maxWidth='lg'
        sx={{
            my: 4
        }}
        >
            {settings.map((s) => (

            
            <Grid container spacing={2} key={s}>
                <Grid item xs={12} md={6} >
                    <Paper 
                        elevation={3} 
                        sx={{ 
                        width: { sm: '300px', xs: '200px'},
                        height: { sm: '300px', xs: '200px'},
                        borderRadius: '50%',
                        mx: 'auto',
                        mt: 8 
                        }}
                        >
                        <ProfileImg src='/images/profileImage.jpeg' 
                        sx={{ 
                            width: { sm: '300px', xs: '200px'},
                            height: { sm: '300px', xs: '200px'},
                        }} 
                        />
                    </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={0}  
                        sx={{ p: 4, mr: 2, mt: 2 }}
                    >
                        <Typography variant='h1'>
                        {s.title}
                        </Typography>
                        {/* <UnstyledButtonCustom /> */}
                        <Typography variant='body1' >
                            {s.description}
                        </Typography>


                    </Paper>
                </Grid>
                
            </Grid>
            ))}
        </Container>
    </Layout>
    )
}

export const getStaticProps = async () => {
    const query = '*[_type == "siteSettings"]';
    const settings = await client.fetch(query);

    return {
        props: { settings }
    }
    
}

export default About;