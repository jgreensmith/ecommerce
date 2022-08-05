import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";


const Home = ({settings}) => {

  const seo = settings[0].seoDescription
  const hero = settings[0].heroImages

  //console.log(settings)
  return (
    <Layout title="Home" seo={seo}>
      <Hero heroData={hero} />
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