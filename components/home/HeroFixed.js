import React from 'react'
import Links from './Links';
import { HeroBox, HeroSlide } from '../../utils/styles';


const HeroFixed = ({heroFixed}) => {
  return (
    <HeroBox>          
        <HeroSlide
            role="img"
            sx={{
                backgroundImage: `url("${urlFor(heroFixed).quality(90).fit("min").url()}")`
            }} 
        >
            <Links />
        </HeroSlide>         
    </HeroBox>
  )
}

export default HeroFixed;