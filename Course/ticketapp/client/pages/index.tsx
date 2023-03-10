import React from 'react'
import { NextPageContext } from 'next'
import { buildClient } from '@/utils/build-client'

const Home = ({ currentUser }: any) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  )
}

Home.getInitialProps = async (context: NextPageContext) => {
  const axiosInstance = buildClient(context)
  const { data } = await axiosInstance.get('/api/users/currentuser')
  return data
}

export default Home
