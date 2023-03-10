import axios from 'axios'
import { NextPageContext } from 'next'

export const buildClient = (context: NextPageContext) => {
  if (typeof window === 'undefined') {
    // Server
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: context?.req?.headers
    })
  } else {
    // Client
    return axios.create({
      baseURL: '/'
    })
  }
}
