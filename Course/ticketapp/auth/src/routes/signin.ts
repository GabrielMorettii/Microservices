import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '@gabrielmds/common'
import { User } from '../models/user'
import { Password } from '../services/password'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const targetUser = await User.findOne({ email }).exec()

    if (!targetUser) throw new BadRequestError('Invalid Credentials')

    const passwordMatch = await Password.compare(targetUser.password, password)

    if (!passwordMatch) throw new BadRequestError('Invalid Credentials')

    const userJwt = jwt.sign(
      { id: targetUser.id, email: targetUser.email },
      process.env.JWT_KEY!
    )

    req.session = {
      jwt: userJwt
    }

    return res.status(200).json({
      user: targetUser
    })
  }
)

export { router as siginRouter }
