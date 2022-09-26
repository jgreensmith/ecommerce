import Layout from "../components/common/Layout";
import Hero from "../components/home/Hero";
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import HeroFixed from "../components/home/HeroFixed";
import Links from "../components/home/Links";
import { CenteredDiv } from "../utils/styles";
import { usePreviewSubscription } from "../lib/sanity";

// function filterDataToSingleItem(data, preview) {
//   if (!Array.isArray(data)) {
//     return data
//   }

//   if (data.length === 1) {
//     return data[0]
//   }

//   if (preview) {
//     return data.find((item) => item._id.startsWith(`drafts.`)) || data[0]
//   }

//   return data[0]
// }


const Home = ({ settings }) => {

  // const {data: previewSettings } = usePreviewSubscription(data?.query, {
  //   initialData: data?.settings,
  //   enabled: preview
  // })
  // const settings = filterDataToSingleItem(previewSettings, preview)

  const seo = settings[0].seoDescription
  const hero = settings[0].heroImages
  const heroFixed = settings[0].heroFixed

  //console.log(settings)
  return (
    <Layout title="Home" seo={seo}>
      {hero && <Hero settings={settings} heroData={hero} />}
      {heroFixed && <HeroFixed settings={settings} heroFixed={heroFixed} />}
      {!hero && !heroFixed ? 
      <CenteredDiv>

        <Links settings={settings} /> 
      </CenteredDiv>
      : null}
      
    </Layout>
  )
}

export const getStaticProps = async ({ preview = false }) => {
  const query = groq`*[_type == "siteSettings"]`
  const settings = await getClient(preview).fetch(query)

  if (!settings) return {notFound: true}

  //const settings = filterDataToSingleItem(data, preview)


  return { 
    props: { 
      settings
    } 
}
  
  
}

export default Home;