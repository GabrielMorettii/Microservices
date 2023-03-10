import { Request, Response, Router } from 'express';
import { IRequestUser } from '../interfaces/IRequestUser';
import { Ticket } from '../models/ticket';

const router = Router();

router.get('/api/tickets', async (req: IRequestUser, res: Response) => {
  const tickets = await Ticket.find({});
  res.send(tickets);
});

export { router as indexTicketRouter };
