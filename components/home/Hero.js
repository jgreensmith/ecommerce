import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import NextLink from 'next/link';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { HeroBox, HeroSlide, mainTypog } from '../../utils/styles';
import { urlFor } from '../../lib/sanity';
import SvgButton from '../svg/ButtonSvg';
import { Typography, Link, Slide } from '@mui/material';
import Links from './Links';

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

const Hero = ({props}) => {
    const { heroData, settings, currentPid } = props

    console.log(heroData)
    
    return (
        <HeroBox>

            <Swiper modules={[EffectFade, Autoplay]} {...params} effect='fade'>
            {heroData.map((hero) => (
                <SwiperSlide key={hero._key}>
                    <HeroSlide
                        role="img"
                        sx={{
                            backgroundImage: `url("${urlFor(currentPid.pid, hero).url()}")`
                        }} 
                    >
                        <Links settings={settings} />
                    </HeroSlide>
                </SwiperSlide>
            ))}
            </Swiper>
        </HeroBox>
    )
}

export default Hero;