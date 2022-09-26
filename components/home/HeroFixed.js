import React from 'react'
import Links from './Links';
import { HeroBox, HeroSlide } from '../../utils/styles';
import { urlFor } from '../../lib/sanity';


const HeroFixed = ({heroFixed, settings}) => {
  return (
    <HeroBox>          
        <HeroSlide
            role="img"
            sx={{
                backgroundImage: `url("${urlFor(heroFixed).quality(90).fit("min").url()}")`
            }} 
        >
            <Links settings={settings} />
        </HeroSlide>         
    </HeroBox>
  )
}

export default HeroFixed;