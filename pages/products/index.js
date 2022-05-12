import { useState } from "react";
import {PortableText} from '@portabletext/react';
import { useRouter } from "next/router";

import { CardActionArea, CardMedia, Container, Slide, Stack, Typography, Link, ImageList, ImageListItem, ImageListItemBar, Paper, Grid, Tooltip, Button, IconButton, Dialog, useMediaQuery, useTheme } from "@mui/material";
import Layout from "../../components/Layout";
import Masonry from '@mui/lab/Masonry';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import InfoIcon from '@mui/icons-material/Info';
import GitHubIcon from '@mui/icons-material/GitHub';

import {client, urlFor} from '../../lib/client';
import { CardActionFooter, CardBanner, CardTitle, CenteredGrid, Overlay, productCard, productCardBody, productImg } from "../../utils/styles";


 
export default function Products({products}) {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState([]);
    const updateContent = (product) => {
        setModalContent([product]);
        setModalOpen(true);
    };
     //mui hooks
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
 
    return(
        <Layout title="product">
            <Container maxWidth="lg">
                <CenteredGrid container spacing={5} sx={{pt: 6}} >
                    <h1>butt</h1>
                    {/* {products.map((product, index) => (
                        <CenteredGrid item key={index} xs={12} sm={6} md={4} >
                            <Slide direction="up" in={true}>
                               
                                <productCard className={styles.card}>
                                    <CardBanner className={styles.cardBanner} sx={{top: '-30px', transform: 'translateY(-20px)'}} >
                                        <Typography 
                                            component="h5" 
                                            sx={{
                                                color: '#fff',
                                                opacity: 0.8
                                            }}
                                        >
                                            {product.title}
                                        </Typography>
                                    </CardBanner>
                                    <productCardBody>
                                        <productImg
                                            src={urlFor(product.mainImage).size(600, 600).quality(90).fit("min").url()}
                                            alt={product.title}
                                            loading="lazy"
                                            />
                                    </productCardBody>
                                    
                                    <CardBanner
                                        className={styles.cardBanner}
                                        sx={{
                                            justifyContent: 'space-evenly',
                                            bottom: '-20px',
                                            transform: 'translateY(20px)',
                                                
                                        }}
                                    >
                                        
                                        <Tooltip title="Project summary">  
                                            <IconButton onClick={() => updateContent(product)} color="info" >
                                                <InfoIcon />                                            
                                            </IconButton>   
                                        </Tooltip>
                                        
                                        <Tooltip title="See GitHub repository">
                                            <Link href={product.github} target="_blank" rel="noreferrer" color="primary.light" >
                                                <GitHubIcon />
                                            </Link>
                                        </Tooltip>
                                        <Tooltip title="Visit website">
                                            <Link href={product.href} target="_blank" rel="noreferrer"  color="primary.light" >
                                                <OpenInBrowserIcon />
                                            </Link>
                                        </Tooltip>
                                    </CardBanner>
                                </productCard>
                            </Slide>   
                                          
                        </CenteredGrid>    
                    ))}
                     */}
                </CenteredGrid>
            </Container>
            <Dialog 
                open={modalOpen}
                fullScreen={fullScreen}
                onClose={() => setModalOpen(false)}
                
            >
                {/* {modalContent.map((content) => {
                    return ( */}
                        <Container maxWidth='lg' 
                            sx={{ 
                                backgroundColor: 'secondary.light', 
                                p: 2
                            }}
                        >
                        <Typography variant="h1" color='primary.light'>butt</Typography>
                        <Typography variant='body1' color='primary.light' sx={{mr: 2}}>
                            Butt
                        </Typography>
                        
                      </Container>
                        
                    {/* )
            })}                           */}
            </Dialog>
        </Layout>
    )
    
}

export const getServerSideProps = async () => {
    const query = '*[_type == "product"]'
    const products = await client.fetch(query)

    if (!products.length) {
        return {
            props: {
                products: [],
            },
        }
    } else {
        return {
            props: {
                products,
            },
        }
    }
}

