import React, { useEffect } from 'react'
import clientPromise from "../lib/mongodb"; 
import { CenteredDiv } from '../utils/styles'

const Home = ({projects}) => {
  
    console.log(projects)
  return (
    <CenteredDiv>
projects
    </CenteredDiv>
  )
}

export default Home

export const getServerSideProps = async () => {
  try {
    const client = await clientPromise
     
    const projects = await client.db('test').collection('users').find({}).toArray()

    if(!projects) return {notFound: true}
    
   
    return {
      props: {
        projects: JSON.parse(JSON.stringify(projects)),
      }
    }
  } catch (e) {
    console.log(e)

  }
} 