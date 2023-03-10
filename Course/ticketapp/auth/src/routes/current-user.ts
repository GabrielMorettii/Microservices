import express, { Request, Response } from 'express'
import { currentUserMiddleware } from '@gabrielmds/common'
import { IRequestUser } from '../interfaces/IRequestUser'

const router = express.Router()


router.get(
  '/api/users/currentuser',
  currentUserMiddleware,
  (req: IRequestUser, res: Response) => {
    return res.send({ currentUser: req.currentUser || null })
  }
)

export { router as currentuserRouter }
