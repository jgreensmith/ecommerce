import React from 'react'
import { CenteredDiv } from '../../utils/styles'
import Layout from '../common/Layout'

const Holiday = ({settings}) => {
  return (
    <Layout title='shop' settings={settings}>
        <CenteredDiv>
            <h1>{settings.title} is on Holiday</h1>
        </CenteredDiv>
    </Layout>
  )
}

export default Holiday