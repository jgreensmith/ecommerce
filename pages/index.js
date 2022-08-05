import Layout from "../components/common/Layout";
import Hero from "../components/home/Hero";
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";
import HeroFixed from "../components/home/HeroFixed";
import Links from "../components/home/Links";
import { CenteredDiv } from "../utils/styles";


const Home = ({settings}) => {

  const seo = settings[0].seoDescription
  const hero = settings[0].heroImages
  const heroFixed = settings[0].heroFixed

  //console.log(heroFixed)
  return (
    <Layout title="Home" seo={seo}>
      {hero && <Hero heroData={hero} />}
      {heroFixed && <HeroFixed heroFixed={heroFixed} />}
      {!hero && !heroFixed ? 
      <CenteredDiv>

        <Links /> 
      </CenteredDiv>
      : null}
      
    </Layout>
  )
}

export const getStaticProps = async ({ preview = false }) => {
  const query = groq`*[_type == "siteSettings"]`
  const settings = await getClient(preview).fetch(query)

  if (!settings) return {notFound: true}

  return { props: { settings } }
  
  
}

export default Home;