import React, { useEffect } from 'react'
import { useRequest } from '@/hooks/useRequest'
import Router from 'next/router'

const signout = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    payload: {},
    onSuccess: () => setTimeout(() => Router.push('/'), 5000)
  })

  useEffect(() => {
    doRequest()
  }, [])

  return <div>Signing you out...</div>
}

export default signout
