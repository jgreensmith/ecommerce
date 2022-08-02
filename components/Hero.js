import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper';
import NextLink from 'next/link';

import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { HeroBox, HeroSlide, mainTypog } from '../utils/styles';
import { urlFor } from '../lib/client';
import SvgButton from './svg/ButtonSvg';
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

const Hero = ({ heroData }) => {

    // const obj = JSON.parse(heroData[1].customString)

    // console.log({obj});
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
                        <Links />
                    </HeroSlide>
                </SwiperSlide>
            ))}
            </Swiper>
        </HeroBox>
    )
}

export default Hero;