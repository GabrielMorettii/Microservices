import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUserMiddleware } from '@gabrielmds/common';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes';
import { updateTicketRouter } from './routes/update';
import { IRequestUser } from './interfaces/IRequestUser';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUserMiddleware);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', async (req: IRequestUser, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
