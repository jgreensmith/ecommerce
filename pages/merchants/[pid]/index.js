import { getPidObj, getPids } from "../../../lib/mongoHelpers"

import Layout from "../../../components/common/Layout";
import Hero from "../../../components/home/Hero";
import { groq } from "next-sanity";
import { getClient } from "../../../lib/sanity.server";
import HeroFixed from "../../../components/home/HeroFixed";
import Links from "../../../components/home/Links";
import { CenteredDiv } from "../../../utils/styles";
import { usePreviewSubscription } from "../../../lib/sanity";
import filterDataToSingleItem from "../../../utils/functions";


const Home = ({ data, preview, currentPid }) => {

  const {data: previewSettings } = usePreviewSubscription(currentPid)(data?.query, {
    initialData: data?.settings,
    enabled: preview
  })
  const settings = filterDataToSingleItem(previewSettings, preview)

  //might remove this
  const reviews = currentPid.reviews.sort((a,b) => {
    if (a.rating > b.rating) {
      return -1
    }
    if(a.rating < b.rating) {
      return 1
    }
    return 0
  })

  const seo = settings?.seoDescription
  const heroData = settings?.heroImages
  const heroFixed = settings?.heroFixed

  console.log(reviews)

  return (
      <Layout title="Home" seo={seo} settings={settings}>

      {heroData && <Hero props={{settings, heroData, currentPid}} />}
      {heroFixed && <HeroFixed props={{settings, heroFixed, currentPid}} />}
      {!heroData && !heroFixed ? 
      <CenteredDiv sx={{mt: 4}}>
        
        <Links settings={settings} /> 
      </CenteredDiv>
      : null}
      
     </Layout>
  )
}

export default Home;

export const getStaticPaths = async () => {
  try {

    const pids = await getPids()   

    const paths = pids.map((proj) => {
      return {params: { pid: proj.pid }}
    })
      
    return {
      paths,
      fallback: 'blocking'
    }
    
  } catch (e) {
    console.log(e)

  }
  

}

export const getStaticProps = async ({ params: { pid }, preview = false }) => {

  try {
   
    const currentPid = await getPidObj(pid)

    const query = groq`*[_type == "siteSettings"]`
    const data = await getClient(currentPid, preview).fetch(query)

    if (!data) return {notFound: true}

    const settings = filterDataToSingleItem(data, preview)


    return { 
      props: { 
        currentPid,
        preview,
        data: { settings, query } 
      }
    }
  } catch (e) {
    console.log(e)

  }
}