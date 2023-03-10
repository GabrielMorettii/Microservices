import { NotFoundError } from '@gabrielmds/common';
import express, { Request, Response } from 'express';
import { IRequestUser } from '../interfaces/IRequestUser';
import { Ticket } from '../models/ticket';

const router = express.Router();

router.get('/api/tickets/:id', async (req: IRequestUser, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket);
});

export { router as showTicketRouter };
