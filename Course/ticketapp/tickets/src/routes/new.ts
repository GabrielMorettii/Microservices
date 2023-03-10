import { authenticated, validateRequest } from '@gabrielmds/common';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { IRequestUser } from '../interfaces/IRequestUser';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.post(
  '/api/tickets',
  authenticated,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
  ],
  validateRequest,
  async (req: IRequestUser, res: Response) => {
    const { title, price } = req.body;
    const ticket = Ticket.build({ title, price, userId: req.currentUser!.id });

    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
