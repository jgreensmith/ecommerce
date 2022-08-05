import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { groq } from "next-sanity";
import { getClient } from "../lib/sanity.server";


const Home = ({heroData, settings}) => {
  const seo = settings[0].seoDescription
  return (
    <Layout title="Home" seo={seo}>
      {/* <Hero heroData={heroData} /> */}
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