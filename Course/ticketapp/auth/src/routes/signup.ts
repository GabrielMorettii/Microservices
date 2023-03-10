import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '@gabrielmds/common'
import { User } from '../models/user'
import { body } from 'express-validator'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body

    const existingUser = await User.findOne({ email }).exec()
    if (existingUser) throw new BadRequestError('Email is already in used')

    // Create new user
    const newUser = User.build({ email, password })
    await newUser.save()

    //Generate JWT
    const userJwt = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_KEY!
    )

    // Send jwt/cookie or something
    req.session = {
      jwt: userJwt
    }

    res.status(201).json({
      user: newUser
    })
  }
)

export { router as signupRouter }
