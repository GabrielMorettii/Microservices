export interface Error {
  message: string
  field?: string
}

export interface CurrentUser {
  id: string
  email: string
  iat?: string
}
