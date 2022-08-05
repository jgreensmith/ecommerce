import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Link, Paper, Slide, Toolbar, Typography } from "@mui/material";
import { PortableText } from "@portabletext/react";
import Layout from "../components/Layout";
import { urlFor } from "../lib/sanity";
import { ContentContainer, ProfileImg } from "../utils/styles";
import { getClient } from "../lib/sanity.server";
import { groq } from "next-sanity";


const About = ({settings}) => {
    //console.log(settings)
    const s = settings[0];
    return(
    <Layout title="About" >

        <ContentContainer maxWidth='lg'
        sx={{
            mt: 5,
        }}
        >
            

            
            <Grid container spacing={2} >
                <Grid item xs={12} md={6} >
                    <Paper 
                        elevation={3} 
                        sx={{ 
                        width: { sm: '300px', xs: '230px'},
                        height: { sm: '300px', xs: '230px'},
                        borderRadius: '50%',
                        mx: 'auto',
                        mt: 8 
                        }}
                        >
                        <ProfileImg src={urlFor(s.profileImage)} 
                        sx={{ 
                            width: { sm: '300px', xs: '230px'},
                            height: { sm: '300px', xs: '230px'},
                        }} 
                        />
                    </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                    <Paper 
                        elevation={0}  
                        sx={{ p: 4, m: 2 }}
                    >
                        <Typography variant='h1'>
                        About {s.title}
                        </Typography>
                        {/* <UnstyledButtonCustom /> */}
                        
                            <PortableText
                                value={s.about}
                            />
                        
                        


                    </Paper>
                </Grid>
                
            </Grid>
           
        </ContentContainer>
    </Layout>
    )
}

export const getStaticProps = async ({preview = false}) => {
    const query = groq`*[_type == "siteSettings"]`
    const settings = await getClient(preview).fetch(query)

    if (!settings) return {notFound: true}


    return {
        props: { settings }
    }
    
}

export default About;