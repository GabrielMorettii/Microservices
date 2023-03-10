import { toast } from 'react-toastify'
import { Error } from '@/types'

export const renderErrors = (errors: Error[]) => {
  for (let i = 0; i < errors.length; i++) {
    toast.error(errors[i].message)
  }
}
