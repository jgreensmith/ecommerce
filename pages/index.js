import React, { useEffect } from 'react'
import clientPromise from "../lib/mongodb"; 
import { CenteredDiv } from '../utils/styles'

const Home = ({projects}) => {
  
    console.log(projects)
  return (
    <CenteredDiv>
projects in Console
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
    
   
    return {
      props: {
        projects: JSON.parse(JSON.stringify(filteredProjects)),
      }
    }
  } catch (e) {
    console.log(e)

  }
} 