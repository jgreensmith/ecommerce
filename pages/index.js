import Link from 'next/link';
import React, { useEffect } from 'react'
import clientPromise from "../lib/mongodb"; 
import { CenteredDiv } from '../utils/styles'

const Home = ({projects, plopped}) => {
  
    console.log(projects)
  return (
    <CenteredDiv>
<Link href='merchants/smq0a814'>test merchant</Link>

    </CenteredDiv>
  )
}

export default Home

export const getServerSideProps = async () => {
  try {
    const client = await clientPromise
     
    const projects = await client.db('test').collection('users').find({}).toArray()

    const filteredProjects = projects.filter(plop => plop.pid)

    if(!filteredProjects) return {notFound: true}

    //const plopped = await getConnectId('2uh6xbh5')
    
   
    return {
      props: {
        projects: JSON.parse(JSON.stringify(filteredProjects)),
        //plopped
      }
    }
  } catch (e) {
    console.log(e)

  }
} 