import React from 'react'
import Head from 'next/head'

interface Props {
  title: string
  description: string
  keywords: string
}

const Meta = ({ title, description, keywords }: Props) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
}

Meta.defaultProps = {
  title: 'Ticketing App',
  description: 'This is a ticketing app running on kubernetes',
  keywords: 'ticketing, ticket, web dev, full stack, NextJS, kubernetes'
}

export default Meta
