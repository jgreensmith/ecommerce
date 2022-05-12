import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import NextLink from 'next/link';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { HeroBox, HeroSlide } from '../utils/styles';
import { urlFor } from '../sanity';
import SvgButton from './svg/ButtonSvg';
import { Typography, Link, Slide } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

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
    console.log(heroData);
    return (
        <HeroBox>

            <Swiper modules={[EffectFade, Autoplay]} {...params} effect='fade'>
            {heroData.map((hero, index) => (
                <SwiperSlide key={index}>
                    <HeroSlide
                        role="img"
                        aria-label={hero.alt}
                        sx={{
                            backgroundImage: `url("${urlFor(hero.heroImage).quality(90).fit("min").url()}")`
                        }} 
                    >
                        
                            <NextLink href="/services">
                                <SvgButton sx={{mr: '9px', mb: 3}} >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        About MCR Digital
                                    </Typography>
                                </SvgButton>
                            </NextLink>
                            <NextLink href="/portfolio">
                                <SvgButton sx={{mr: '9px', mb: 3}} >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        Partnered Companies
                                    </Typography>
                                </SvgButton>
                            </NextLink>
                            <Link href="https://www.instagram.com/digital.mcr/" target="_blank" rel="noreferrer" >
                                <SvgButton sx={{mr: '9px', mb: 3}}  >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        Instagram 
                                    </Typography>
                                </SvgButton>
                            </Link>
                            <Link href="mailto:digitalmcr@hotmail.com?subject=MCR Digital enquiry">
                                <SvgButton sx={{mr: '9px', mb: 3}}  >
                                    <Typography color='#fff' variant='h6' sx={{textTransform: 'capitalize'}} >
                                        Contact Us
                                    </Typography>
                                </SvgButton>
                            </Link>
                        
                        
                    </HeroSlide>
                </SwiperSlide>
            ))}
            </Swiper>
            {/* <Footer/> */}
        </HeroBox>
    )
}

export default Hero;