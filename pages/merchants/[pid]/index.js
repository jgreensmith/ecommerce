import clientPromise from "../../../lib/mongodb"; 

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

  const {data: previewSettings } = usePreviewSubscription(data?.query, {
    initialData: data?.settings,
    enabled: preview
  })
  const settings = filterDataToSingleItem(previewSettings, preview)

  const seo = settings?.seoDescription
  const heroData = settings?.heroImages
  const heroFixed = settings?.heroFixed

  console.log(currentPid)

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
export const getStaticPaths = async () => {
  try {
    const client = await clientPromise
     
    const projects = await client.db('test').collection('users').find({}, {projection: {pid: 1, _id: 0}}).toArray()

    const filteredProjects = projects.filter(plop => plop.pid)

    const parsedProjects = JSON.parse(JSON.stringify(filteredProjects)) 
    console.log(parsedProjects)   

      const paths = parsedProjects.map((proj) => {
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
    const client = await clientPromise
     
    const pidObj = await client.db('test').collection('users').findOne(
        {pid : { $eq: pid }},
        {projection: {pid: 1, manage_inventory: 1, preview_mode: 1, _id: 0}}
      )       

    const currentPid = JSON.parse(JSON.stringify(pidObj))

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
export default Home;