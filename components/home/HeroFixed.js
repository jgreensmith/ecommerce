import React from 'react'
import Links from './Links';
import { HeroBox, HeroSlide } from '../../utils/styles';
import { urlFor } from '../../lib/sanity';


const HeroFixed = ({heroFixed, settings, currentPid}) => {
  return (
    <HeroBox>          
        <HeroSlide
            role="img"
            sx={{
                backgroundImage: `url("${urlFor(heroFixed).projectId(currentPid.pid).url()}")`
            }} 
        >
            <Links settings={settings} />
        </HeroSlide>         
    </HeroBox>
  )
}

export default HeroFixed;