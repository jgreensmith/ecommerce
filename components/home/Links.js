import React, { useContext } from 'react';
import NextLink from 'next/link';

import { Link } from '@mui/material';
//import SettingsContext from '../../utils/context/SettingsContext';
import SvgButton from '../svg/ButtonSvg';


const Links = ({settings}) => {
    //const { settings } = useContext(SettingsContext);
    const contact = settings?.contactObj;
    const email = contact?.email;
    const subject = contact?.subject;
    const insta = contact?.instagram;
    const facebook = contact?.facebook;
    const twitter = contact?.twitter;
    const tiktok = contact?.tiktok;
    const customLinks = contact?.customLinks;

  return (
    <React.Fragment>

        <NextLink href="/about">
            <SvgButton sx={{mr: '9px', mb: 3}} >
                    About Merchant X
            </SvgButton>
        </NextLink>
        <NextLink href="/products">
            <SvgButton sx={{mr: '9px', mb: 3}} >
                    Shop
            </SvgButton>
        </NextLink>
        { insta && 
        <Link href={insta} target="_blank" rel="noreferrer" >
            <SvgButton sx={{mr: '9px', mb: 3}}  >
                    Instagram 
            </SvgButton>
        </Link>
        }
        { facebook && 
        <Link href={facebook} target="_blank" rel="noreferrer" >
            <SvgButton sx={{mr: '9px', mb: 3}}  >
                    Facebook 
            </SvgButton>
        </Link>
        }
        { twitter && 
        <Link href={twitter} target="_blank" rel="noreferrer" >
            <SvgButton sx={{mr: '9px', mb: 3}}  >
                    Twitter 
            </SvgButton>
        </Link>
        }
        { tiktok && 
        <Link href={tiktok} target="_blank" rel="noreferrer" >
            <SvgButton sx={{mr: '9px', mb: 3}}  >
                    TikTok 
            </SvgButton>
        </Link>
        }
        <Link href={`mailto:${email}?subject=${subject}`}>
            <SvgButton sx={{mr: '9px', mb: 3}}  >
                    Contact Us
            </SvgButton>
        </Link>
        { customLinks && 
            customLinks.map((link) => (
                <div key={link._key}>

                <Link  href={link.linkUrl} target="_blank" rel="noreferrer" >
                    <SvgButton sx={{mr: '9px', mb: 3}}  >
                            {link.linkTitle} 
                    </SvgButton>
                </Link>
                </div>
            ))
        }
                        
    </React.Fragment>
  )
}

export default Links;