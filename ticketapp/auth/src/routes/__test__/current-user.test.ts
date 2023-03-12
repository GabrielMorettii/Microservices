import request from 'supertest'
import { app } from '../../app'

const currentUserUrl = '/api/users/currentuser'

const emailPasswordPayload = {
  email: 'global@global.com',
  password: 'password'
}

it('responds with details about current user', async () => {
  const cookie = await global.signUp()

  const response = await request(app)
    .get(currentUserUrl)
    .set('Cookie', cookie)
    .send()
    .expect(200)

  expect(response.body.currentUser.email).toEqual(emailPasswordPayload.email)
})

it('responds with currentuser null if not signed in', async () => {
  const response = await request(app).get(currentUserUrl).send().expect(200)

  expect(response.body.currentUser).toEqual(null)
})
