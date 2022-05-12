import Layout from "../components/Layout";
import Hero from "../components/Hero";
import { client } from "../lib/client";


const Home = ({heroData}) => {
  return (
    <Layout title="Home">
      <Hero heroData={heroData} />
      

    </Layout>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "hero"]'
  const heroData = await client.fetch(query)

  if (!heroData.length) {
      return {
          props: {
              heroData: [],
          },
      }
  } else {
      return {
          props: {
              heroData,
          },
      }
  }
}

export default Home;