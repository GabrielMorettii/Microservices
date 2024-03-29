import {
  NotAuthorizedError,
  NotFoundError,
  authenticated,
  validateRequest,
} from '@gabrielmds/common';
import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { IRequestUser } from '../interfaces/IRequestUser';
import { Ticket } from '../models/ticket';

const router = Router();

router.put(
  '/api/tickets/:id',
  authenticated,
  [
    body('title').not().isEmpty().withMessage('Title is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be provided and be greater than  0'),
  ],
  validateRequest,
  async (req: IRequestUser, res: Response) => {
    const id = req.params.id;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      throw new NotFoundError();
    }

    if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    await ticket.save();

    res.send(ticket);
  }
);

export { router as updateTicketRouter };
