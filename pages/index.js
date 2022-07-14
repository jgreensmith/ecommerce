import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { client } from "../lib/client";


const Home = ({heroData, settings}) => {
  const seo = settings[0].seoDescription
  return (
    <Layout title="Home" seo={seo}>
      <Hero heroData={heroData} />
    </Layout>
  )
}

export const getStaticProps = async () => {
  const query = '*[_type == "hero"]'
  const heroData = await client.fetch(query)

  const seoQuery = '*[_type == "siteSettings"]';
  const settings = await client.fetch(seoQuery);

  if (!heroData.length) {
      return {
          props: {
              heroData: [],
              settings
          },
      }
  } else {
      return {
          props: {
              heroData,
              settings
          },
      }
  }
  
}

export default Home;