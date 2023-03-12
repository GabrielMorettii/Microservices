import 'bootstrap/dist/css/bootstrap.css'
import 'react-toastify/dist/ReactToastify.css'
import type { AppProps, AppContext } from 'next/app'
import { Meta, Header } from '@/components'
import { CurrentUser } from '@/types'
import { ToastContainer } from 'react-toastify'
import { buildClient } from '@/utils/build-client'

interface CustomAppProps extends AppProps {
  currentUser: CurrentUser | null
}

function AppComponent({ Component, pageProps, currentUser }: CustomAppProps) {
  return (
    <>
      <Meta />
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
      <ToastContainer />
    </>
  )
}

AppComponent.getInitialProps = async (appContext: AppContext) => {
  const axiosInstance = buildClient(appContext.ctx)
  const { data } = await axiosInstance.get('/api/users/currentuser')

  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  return {
    pageProps,
    ...data
  }
}

export default AppComponent
