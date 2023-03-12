import axios from 'axios'
import { useState } from 'react'
import { Error } from '@/types'
import { renderErrors } from '@/utils/render-errors'

interface Options {
  url: string
  method: 'post' | 'get' | 'patch' | 'delete' | 'put'
  payload: any
  onSuccess?: () => void
}

export const useRequest = (options: Options) => {
  const [errors, setErrors] = useState<Error[] | null>(null)

  const doRequest = async () => {
    try {
      const response = await axios[options.method](options.url, options.payload)
      setErrors(null)
      if (options.onSuccess) options.onSuccess()
      return response.data
    } catch (error: any) {
      setErrors(error.response.data.errors)
      renderErrors(error.response.data.errors)
    }
  }

  return { doRequest, errors }
}
