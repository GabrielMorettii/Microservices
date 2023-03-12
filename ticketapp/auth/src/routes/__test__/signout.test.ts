import request from 'supertest'
import { app } from '../../app'

const signUpUrl = '/api/users/signup'
const signOutUrl = '/api/users/signout'

const email = 'email@email.com'
const password = 'password'

const payload = { email, password }

it('cookie is cleared on sign out', async () => {
  await request(app).post(signUpUrl).send(payload).expect(201)

  const response = await request(app).post(signOutUrl).send({}).expect(200)

  expect(response.get('Set-Cookie')[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  )
})
