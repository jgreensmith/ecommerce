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
    // <Layout title="Home" seo={seo}>
    <CenteredDiv>

      {heroData && <Hero props={{settings, heroData, currentPid}} />}
      {heroFixed && <HeroFixed props={{settings, heroFixed, currentPid}} />}
      {!heroData && !heroFixed ? 
      <CenteredDiv sx={{mt: 4}}>
        links
        {/* <Links settings={settings} />  */}
      </CenteredDiv>
      : null}
      
      </CenteredDiv>
    // </Layout>
  )
}
export const getStaticPaths = async () => {
  const paths = [
    {params: { pid: "smq0a814" }},
    {params: { pid: "2uh6xbh5" }}
  ]
    
  return {
    paths,
    fallback: 'blocking'
  }

}

export const getStaticProps = async ({ params: { pid }, preview = false }) => {

  const merchantArr = [
    {
      pid: "smq0a814",
      manage_inventory: "skfPeWq0M7kraPIOqR6zDBFOy4dxKcCFCFUygNo6mRRv8o07EANR4EHj8YzEPPGymEAYI3jPnOOTXHbE9nv4F4YpzTwpygzOHWf8PjT5zCZC1hlX7L32ERcjyKZMD2DT8MBEDHFq74wz6uJJAZqhS8GyB9j0XEl8j1gWm0Ku2E41gtVjnNri",
      preview_mode: "sk5nbekTGsBdlroyOVxCozaLgttmT8l4zhzf8XNaQfix96HYtyWg7bJ5vYqgcdC3eVQpRDgpHGNEsDM4Ar6lZnplmA227GVmMKIvuOFOeSydIeh7mrePnZDBj0hqFLJFsh7Fto3RxZlMAGd7jBFa22rZ5pNSiOPSVkobxcdAsQmP3KuaFWTD"
    },
    {
      pid: "2uh6xbh5",
      manage_inventory: "skjMhFSaHSzLAmLDSwOaGTCzy5WvVRWV3GkIJKCcX40gfmFCxBcnXB296X9NHqMegx0GtMGfbNPBw8ctGNYR8JMmEXFa1rFxoSi7b34H92EnnXwN6HQylqkjwH0VPDqTQu5L0XTatSoPHK589qZXKxwbl8HJpUsQCU0NdDxB94hxMGtlgziP",
      preview_mode: "skpQhwhL8a9CIEz8vLuPmnnwSgLlB2WQGeHbAzCBFR61z8UolZjGsSdtmMJUjqQ3aoIDki1oicmqoJg3M1yWPfW0ZvtVA6bykm3mQBNWUJHVSX2aAbkjbRu1cAIKiNK0EwDozDjcJtLHaQHwlZse8nkmN0uCoabXro9D4NK0RCLJSxgCEWke"
    }
  ]
  const currentPid = merchantArr.find(x => x.pid === pid)
  console.log(currentPid)

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
}
export default Home;