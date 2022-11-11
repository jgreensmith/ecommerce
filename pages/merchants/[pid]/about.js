import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Link, Paper, Slide, Toolbar, Typography } from "@mui/material";
import { PortableText } from "@portabletext/react";
import Layout from "../../../components/common/Layout";
import { urlFor, usePreviewSubscription } from "../../../lib/sanity";
import { ContentContainer, ProfileImg } from "../../../utils/styles";
import { getClient } from "../../../lib/sanity.server";
import { groq } from "next-sanity";
import filterDataToSingleItem from "../../../utils/functions";
import { useRouter } from "next/router";
import { getPidObj, getPids } from "../../../lib/mongoHelpers";


const About = ({preview, data, currentPid}) => {
    
    const { data: previewSettings } = usePreviewSubscription(data?.query, {
        initialData: data?.settings,
        enabled: preview
    })

    const settings = filterDataToSingleItem(previewSettings, preview)

    // const router = useRouter()
    // const settings = router.query.about
    console.log(currentPid)
    return(
    <Layout title="About" settings={settings} >

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
                        <ProfileImg src={urlFor(currentPid.pid, settings.profileImage).url()} 
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
                        About {settings.title} - small change to test new branch
                        </Typography>
                        {/* <UnstyledButtonCustom /> */}
                        
                            <PortableText
                                value={settings.about}
                            />
                        
                        


                    </Paper>
                </Grid>
                
            </Grid>
           
        </ContentContainer>
    </Layout>
    )
  }
  export default About;

export const getStaticPaths = async () => {
  try {
    
    const pids = await getPids()

    const paths = pids.map((proj) => {
      return {params: { pid: proj.pid }}
    })
      
    return {
      paths,
      fallback: 'blocking'
    }
    
  } catch (e) {
    console.log(e)

  }
  
  }
  
  export const getStaticProps = async ({ params: { pid }, preview = false }) => {
  
    
    try {
      const currentPid = await getPidObj(pid)
  
      const query = groq`*[_type == "siteSettings"]`
      const data = await getClient(currentPid, preview).fetch(query)
  
      if (!data) return {notFound: true}
  
      const settings = filterDataToSingleItem(data, preview)
  
  
      return { 
        props: { 
          currentPid,
          preview,
          data: { settings, query } 
        }
      }
    } catch (e) {
      console.log(e)
  
    }
  }
