import request from 'supertest'
import { app } from '../../app'

const signInUrl = '/api/users/signin'
const signUpUrl = '/api/users/signup'

it('returns 400 on bad email', async () => {
  return request(app)
    .post(signInUrl)
    .send({
      email: 'test',
      password: 'password'
    })
    .expect(400)
})

it('returns 400 on missing email and/or password', async () => {
  await request(app)
    .post(signInUrl)
    .send({ email: 'email@email.com' })
    .expect(400)
  await request(app).post(signInUrl).send({ password: 'password' }).expect(400)
  await request(app).post(signInUrl).send({}).expect(400)
})

it('returns 400 if email does not exist', async () => {
  return request(app)
    .post(signInUrl)
    .send({
      email: 'any@any.com',
      password: 'password'
    })
    .expect(400)
})

it('returns 400 on invalid password', async () => {
  await request(app)
    .post(signUpUrl)
    .send({
      email: 'email@email.com',
      password: 'password'
    })
    .expect(201)

  await request(app)
    .post(signInUrl)
    .send({
      email: 'email@email.com',
      password: 'passcode'
    })
    .expect(400)
})

it('sets cookie after successful signin', async () => {
  await request(app)
    .post(signUpUrl)
    .send({
      email: 'email@email.com',
      password: 'password'
    })
    .expect(201)

  const response = await request(app)
    .post(signInUrl)
    .send({
      email: 'email@email.com',
      password: 'password'
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
