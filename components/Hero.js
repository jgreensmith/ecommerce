import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import NextLink from 'next/link';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { HeroBox, HeroSlide } from '../utils/styles';
import { urlFor } from '../lib/client';
import SvgButton from './svg/ButtonSvg';
import { Typography, Link, Slide } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import SettingsContext from '../utils/context/SettingsContext';
import { useContext } from 'react';

//import Footer from './Footer';


const params = {
    slidesPerView: 'auto',
    watchOverflow: false,
    autoplay: {
      delay: 5000
    },
    loop: true,
    allowTouchMove: false,
    speed: 1000,
    fadeEffect: {
      crossFade: true
    }
};

const Hero = ({ heroData }) => {

    const { settings } = useContext(SettingsContext);
    const contact = settings[0].contactObj;
    const email = contact.email;
    const subject = contact.subject;
    const insta = contact.instagram;
    const facebook = contact.facebook;
    const twitter = contact.twitter;
    const tiktok = contact.tiktok;
    const customLinks = contact.customLinks;


    //console.log(heroData);
    return (
        <HeroBox>

            <Swiper modules={[EffectFade, Autoplay]} {...params} effect='fade'>
            {heroData.map((hero) => (
                <SwiperSlide key={hero._id}>
                    <HeroSlide
                        role="img"
                        aria-label={hero.alt}
                        sx={{
                            backgroundImage: `url("${urlFor(hero.heroImage).quality(90).fit("min").url()}")`
                        }} 
                    >
                        
                            <NextLink href="/about">
                                <SvgButton sx={{mr: '9px', mb: 3}} >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        About Merchant X
                                    </Typography>
                                </SvgButton>
                            </NextLink>
                            <NextLink href="/products">
                                <SvgButton sx={{mr: '9px', mb: 3}} >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        Shop
                                    </Typography>
                                </SvgButton>
                            </NextLink>
                            { insta && 
                            <Link href={insta} target="_blank" rel="noreferrer" >
                                <SvgButton sx={{mr: '9px', mb: 3}}  >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        Instagram 
                                    </Typography>
                                </SvgButton>
                            </Link>
                            }
                            { facebook && 
                            <Link href={facebook} target="_blank" rel="noreferrer" >
                                <SvgButton sx={{mr: '9px', mb: 3}}  >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        Facebook 
                                    </Typography>
                                </SvgButton>
                            </Link>
                            }
                            { twitter && 
                            <Link href={twitter} target="_blank" rel="noreferrer" >
                                <SvgButton sx={{mr: '9px', mb: 3}}  >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        Twitter 
                                    </Typography>
                                </SvgButton>
                            </Link>
                            }
                            { tiktok && 
                            <Link href={tiktok} target="_blank" rel="noreferrer" >
                                <SvgButton sx={{mr: '9px', mb: 3}}  >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        TikTok 
                                    </Typography>
                                </SvgButton>
                            </Link>
                            }
                            <Link href={`mailto:${email}?subject=${subject}`}>
                                <SvgButton sx={{mr: '9px', mb: 3}}  >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        Contact Us
                                    </Typography>
                                </SvgButton>
                            </Link>
                            { customLinks && 
                                customLinks.map((link) => (
                                    <div key={link._key}>

                                    <Link  href={link.linkUrl} target="_blank" rel="noreferrer" >
                                        <SvgButton sx={{mr: '9px', mb: 3}}  >
                                            <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                                {link.linkTitle} 
                                            </Typography>
                                        </SvgButton>
                                    </Link>
                                    </div>
                                ))
                            }
                        
                    </HeroSlide>
                </SwiperSlide>
            ))}
            </Swiper>
            {/* <Footer/> */}
        </HeroBox>
    )
}

export default Hero;