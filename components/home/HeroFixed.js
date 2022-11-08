import React from 'react'
import Links from './Links';
import { HeroBox, HeroSlide } from '../../utils/styles';
import { urlFor } from '../../lib/sanity';


const HeroFixed = ({props}) => {
  const {heroFixed, settings, currentPid} = props
  console.log(currentPid)
  return (
    <HeroBox>          
        <HeroSlide
            role="img"
            sx={{
                backgroundImage: `url("${urlFor(currentPid.pid, heroFixed).url()}")`
            }} 
        >
            <Links settings={settings} />
        </HeroSlide>         
    </HeroBox>
  )
}

export default HeroFixed;