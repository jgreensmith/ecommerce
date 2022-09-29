import Layout from "../components/common/Layout";
import Hero from "../components/home/Hero";
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import HeroFixed from "../components/home/HeroFixed";
import Links from "../components/home/Links";
import { CenteredDiv } from "../utils/styles";
import { usePreviewSubscription } from "../lib/sanity";
import filterDataToSingleItem from "../utils/functions";




const Home = ({ data, preview }) => {

  const {data: previewSettings } = usePreviewSubscription(data?.query, {
    initialData: data?.settings,
    enabled: preview
  })
  const settings = filterDataToSingleItem(previewSettings, preview)

  const seo = settings?.seoDescription
  const hero = settings?.heroImages
  const heroFixed = settings?.heroFixed

  //console.log(settings)
  return (
    <Layout title="Home" seo={seo}>
      {hero && <Hero settings={settings} heroData={hero} />}
      {heroFixed && <HeroFixed settings={settings} heroFixed={heroFixed} />}
      {!hero && !heroFixed ? 
      <CenteredDiv sx={{mt: 4}}>

        <Links settings={settings} /> 
      </CenteredDiv>
      : null}
      
    </Layout>
  )
}

export const getStaticProps = async ({ preview = false }) => {
  const query = groq`*[_type == "siteSettings"]`
  const data = await getClient(preview).fetch(query)

  if (!data) return {notFound: true}

  const settings = filterDataToSingleItem(data, preview)


  return { 
    props: { 
      preview,
      data: { settings, query } 
    }
  }
}
export default Home;